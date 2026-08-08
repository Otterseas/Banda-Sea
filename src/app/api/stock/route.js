// ===========================================
// STOCK API ROUTE
// Fetches inventory levels from Shopify Storefront API
// ===========================================

import { NextResponse } from 'next/server';

// Disable caching for this route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Shopify Storefront API config
const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '38a44d-4c.myshopify.com';
const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || '6954beed3229fdfe57aa5e08779bc83c';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const variantIds = searchParams.get('ids'); // Comma-separated variant IDs

  if (!variantIds) {
    return NextResponse.json({ error: 'Missing variant IDs' }, { status: 400 });
  }

  if (!SHOPIFY_STOREFRONT_TOKEN) {
    // Return mock data if no token (for development)
    console.warn('No Shopify Storefront token - returning mock stock data');
    const ids = variantIds.split(',');
    const mockData = {};
    ids.forEach(id => {
      mockData[id] = {
        id,
        available: true,
        quantity: 10, // Mock quantity
      };
    });
    return NextResponse.json(mockData);
  }

  try {
    // Convert variant IDs to Shopify global IDs
    const globalIds = variantIds.split(',').map(id => 
      `gid://shopify/ProductVariant/${id}`
    );

    // GraphQL query to get variant availability
    const query = `
      query getVariantAvailability($ids: [ID!]!) {
        nodes(ids: $ids) {
          ... on ProductVariant {
            id
            availableForSale
            quantityAvailable
            currentlyNotInStock
          }
        }
      }
    `;

    const response = await fetch(
      `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
        },
        body: JSON.stringify({
          query,
          variables: { ids: globalIds },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      console.error('Shopify GraphQL errors:', data.errors);
      throw new Error(data.errors[0].message);
    }

    // Transform response to simple format
    const stockData = {};
    data.data.nodes.forEach((node) => {
      if (node) {
        // Extract numeric ID from global ID
        const numericId = node.id.split('/').pop();
        // Made-to-order variants ("continue selling when out of stock", e.g.
        // the embroidered hats) report 0 on hand yet stay purchasable:
        // availableForSale true + currentlyNotInStock true. Treat those as
        // in stock with unknown quantity so product pages don't flip to
        // "Notify Me" or show a low-stock badge for items that never hold
        // inventory. A variant is only out of stock when Shopify says it
        // can't be sold at all.
        const backorder = node.availableForSale && (node.quantityAvailable ?? 0) <= 0;
        stockData[numericId] = {
          id: numericId,
          available: node.availableForSale,
          quantity: backorder ? null : (node.quantityAvailable ?? null),
          outOfStock: !node.availableForSale,
        };
      }
    });

    return NextResponse.json(stockData);

  } catch (error) {
    console.error('Stock API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stock data' },
      { status: 500 }
    );
  }
}
