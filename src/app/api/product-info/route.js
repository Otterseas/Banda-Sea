// ===========================================
// PRODUCT INFO API ROUTE
// Fetches product details from Shopify Storefront API
// Use: /api/product-info?handle=the-uk-bundle-pack
// ===========================================

import { NextResponse } from 'next/server';

// Shopify Storefront API config
const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '38a44d-4c.myshopify.com';
const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || '6954beed3229fdfe57aa5e08779bc83c';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const handle = searchParams.get('handle');

  if (!handle) {
    return NextResponse.json({ error: 'Missing product handle. Use ?handle=product-handle' }, { status: 400 });
  }

  if (!SHOPIFY_STOREFRONT_TOKEN) {
    return NextResponse.json({ error: 'Shopify token not configured' }, { status: 500 });
  }

  try {
    // GraphQL query to get product by handle
    const query = `
      query getProductByHandle($handle: String!) {
        productByHandle(handle: $handle) {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                quantityAvailable
                sku
              }
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
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
          variables: { handle },
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

    const product = data.data.productByHandle;

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Transform to simpler format with variant IDs extracted
    const result = {
      id: product.id,
      numericId: product.id.split('/').pop(),
      title: product.title,
      handle: product.handle,
      description: product.description,
      price: product.priceRange.minVariantPrice.amount,
      currency: product.priceRange.minVariantPrice.currencyCode,
      variants: product.variants.edges.map(({ node }) => ({
        id: node.id,
        numericId: node.id.split('/').pop(), // This is the variant ID you need
        title: node.title,
        price: node.price.amount,
        available: node.availableForSale,
        quantity: node.quantityAvailable,
        sku: node.sku,
      })),
      images: product.images.edges.map(({ node }) => ({
        url: node.url,
        alt: node.altText,
      })),
    };

    return NextResponse.json(result);

  } catch (error) {
    console.error('Product Info API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product data' },
      { status: 500 }
    );
  }
}
