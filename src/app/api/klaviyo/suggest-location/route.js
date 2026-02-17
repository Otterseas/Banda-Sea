// ===========================================
// LOCATION SUGGESTION API ROUTE
// Tracks location suggestions in Klaviyo
// ===========================================

import { NextResponse } from 'next/server';

const KLAVIYO_PUBLIC_KEY = 'Y9qkuD';

export async function POST(request) {
  try {
    const { location, email } = await request.json();

    if (!location) {
      return NextResponse.json(
        { error: 'Location is required' },
        { status: 400 }
      );
    }

    // Track the suggestion event in Klaviyo
    const trackPayload = {
      token: KLAVIYO_PUBLIC_KEY,
      event: 'Location Suggested',
      customer_properties: {
        // If email provided, use it; otherwise anonymous
        ...(email ? { $email: email } : { $anonymous: `suggestion_${Date.now()}` }),
      },
      properties: {
        location: location,
        suggested_at: new Date().toISOString(),
        source: 'stickers_page',
      },
    };

    // Send to Klaviyo Track API
    const response = await fetch('https://a.klaviyo.com/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trackPayload),
    });

    if (!response.ok) {
      // Try the GET-based track endpoint as fallback
      const params = new URLSearchParams({
        data: Buffer.from(JSON.stringify(trackPayload)).toString('base64'),
      });

      await fetch(`https://a.klaviyo.com/api/track?${params}`, {
        method: 'GET',
      });
    }

    console.log('Location suggestion tracked:', location);

    return NextResponse.json({
      success: true,
      message: 'Location suggestion received!',
    });

  } catch (error) {
    console.error('Location suggestion API error:', error);
    return NextResponse.json(
      { error: 'Failed to submit suggestion', details: error.message },
      { status: 500 }
    );
  }
}
