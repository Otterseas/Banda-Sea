const title = 'Salt & Stories – The Otterseas Dive Blog';
const description =
  'Dive tales, travel tips and underwater adventures from the Otterseas community. Dive site guides, marine life spotlights and stories from the deep.';

export const metadata = {
  title,
  description,
  alternates: { canonical: '/blogs' },
  openGraph: { title: `${title} | Otterseas`, description, url: '/blogs' },
};

export default function BlogsLayout({ children }) {
  return children;
}
