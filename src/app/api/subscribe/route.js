// ===========================================
// NEWSLETTER SUBSCRIBE API ROUTE
// Adds email to Klaviyo list
// ===========================================

import { NextResponse } from 'next/server';

const KLAVIYO_PUBLIC_KEY = 'Y9qkuD';
// To find your List ID:
// 1. Go to Klaviyo > Audience > Lists & Segments
// 2. Click on your newsletter list
// 3. The List ID is in the URL: https://www.klaviyo.com/list/LIST_ID
const KLAVIYO_LIST_ID = 'TwQAc3';

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Subscribe to Klaviyo list using client API
    const response = await fetch('https://a.klaviyo.com/api/v2/list/' + KLAVIYO_LIST_ID + '/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: KLAVIYO_PUBLIC_KEY,
        profiles: [
          {
            email: email,
          },
        ],
      }),
    });

    // If that fails, try the onsite subscribe endpoint
    if (!response.ok) {
      const altResponse = await fetch('https://a.klaviyo.com/onsite/components/email-subscribe/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          a: KLAVIYO_PUBLIC_KEY,
          email: email,
          g: KLAVIYO_LIST_ID, // List ID
        }),
      });

      console.log('Klaviyo alt response:', altResponse.status);
    }

    console.log('Newsletter subscription for:', email);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Successfully subscribed!'
    });

  } catch (error) {
    console.error('Subscribe API error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe', details: error.message },
      { status: 500 }
    );
  }
}
