// ===========================================
// BLOG API ROUTE
// Fetches blog posts from Shopify Storefront API
// ===========================================

import { NextResponse } from 'next/server';

// Shopify Storefront API config
const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '38a44d-4c.myshopify.com';
const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || '6954beed3229fdfe57aa5e08779bc83c';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const blogHandle = searchParams.get('blog') || 'news'; // Default blog handle
  const limit = parseInt(searchParams.get('limit') || '20', 10);

  if (!SHOPIFY_STOREFRONT_TOKEN) {
    console.warn('No Shopify Storefront token - returning empty blog data');
    return NextResponse.json({ articles: [], blog: null });
  }

  try {
    // GraphQL query to fetch blog articles
    const query = `
      query getBlogArticles($blogHandle: String!, $first: Int!) {
        blog(handle: $blogHandle) {
          id
          title
          handle
          articles(first: $first, sortKey: PUBLISHED_AT, reverse: true) {
            edges {
              node {
                id
                title
                handle
                excerpt
                excerptHtml
                content
                contentHtml
                publishedAt
                image {
                  url
                  altText
                  width
                  height
                }
                author {
                  name
                }
                tags
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
          variables: { blogHandle, first: limit },
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

    if (!data.data.blog) {
      return NextResponse.json({
        articles: [],
        blog: null,
        message: `Blog "${blogHandle}" not found`
      });
    }

    // Transform response to simpler format
    const articles = data.data.blog.articles.edges.map(({ node }) => ({
      id: node.id,
      title: node.title,
      handle: node.handle,
      excerpt: node.excerpt || node.excerptHtml?.replace(/<[^>]*>/g, '').slice(0, 200) + '...',
      content: node.content,
      contentHtml: node.contentHtml,
      publishedAt: node.publishedAt,
      image: node.image ? {
        url: node.image.url,
        alt: node.image.altText || node.title,
        width: node.image.width,
        height: node.image.height,
      } : null,
      author: node.author?.name || 'Otterseas',
      tags: node.tags || [],
    }));

    return NextResponse.json({
      articles,
      blog: {
        id: data.data.blog.id,
        title: data.data.blog.title,
        handle: data.data.blog.handle,
      },
    });

  } catch (error) {
    console.error('Blog API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog data', articles: [] },
      { status: 500 }
    );
  }
}
