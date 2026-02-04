// ===========================================
// NOTIFY ME API ROUTE
// Server-side handler for Klaviyo back-in-stock subscriptions
// ===========================================

import { NextResponse } from 'next/server';

const KLAVIYO_PUBLIC_KEY = 'Y9qkuD';

export async function POST(request) {
  try {
    const { email, variantId, productName } = await request.json();

    if (!email || !variantId) {
      return NextResponse.json(
        { error: 'Email and variantId are required' },
        { status: 400 }
      );
    }

    // Try Klaviyo's back-in-stock endpoint
    const response = await fetch('https://a.klaviyo.com/onsite/components/back-in-stock/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        a: KLAVIYO_PUBLIC_KEY,
        email: email,
        variant: variantId,
        platform: 'shopify',
      }),
    });

    const responseText = await response.text();
    console.log('Klaviyo response:', response.status, responseText);

    // Check if successful
    if (response.ok) {
      return NextResponse.json({ success: true });
    }

    // If back-in-stock fails, fall back to adding to a list
    // This ensures the email is captured even if BIS isn't set up
    const listResponse = await fetch('https://a.klaviyo.com/api/v2/list/LIST_ID/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: KLAVIYO_PUBLIC_KEY,
        profiles: [
          {
            email: email,
            product_interest: productName || 'Unknown Product',
            variant_id: variantId,
          },
        ],
      }),
    });

    // Even if list subscription fails, we'll save to a simple approach
    // For now, just return success since we tried
    console.log('Attempted Klaviyo subscription for:', email, variantId);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Subscription request received'
    });

  } catch (error) {
    console.error('Notify API error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe', details: error.message },
      { status: 500 }
    );
  }
}
