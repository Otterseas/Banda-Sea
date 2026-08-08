const title = 'About Us – The Story Behind Otterseas';
const description =
  'Otterseas was born from a passion for diving and a desire to capture underwater memories. Meet the team behind the dive site sticker collection, the Surface Tank and the Dive Journal.';

export const metadata = {
  title,
  description,
  alternates: { canonical: '/about' },
  openGraph: { title: `${title} | Otterseas`, description, url: '/about' },
};

export default function AboutLayout({ children }) {
  return children;
}
