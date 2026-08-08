const title = 'Policies – Shipping, Returns & Privacy';
const description =
  'Otterseas store policies: shipping times and costs, 30-day returns, refunds, privacy and terms of service.';

export const metadata = {
  title,
  description,
  alternates: { canonical: '/policies' },
  robots: { index: true, follow: true },
};

export default function PoliciesLayout({ children }) {
  return children;
}
