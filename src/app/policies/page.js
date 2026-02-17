'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// ===========================================
// LUNA COLOR PALETTE
// ===========================================
const LUNA = {
  highlight: '#A7EBF2',
  surfaceTeal: '#54ACBF',
  midDepth: '#26658C',
  deepWater: '#023859',
  abyss: '#011C40',
};

// ===========================================
// POLICY TABS
// ===========================================
const POLICY_TABS = [
  { id: 'terms', label: 'Terms & Conditions' },
  { id: 'privacy', label: 'Privacy Policy' },
  { id: 'returns', label: 'Returns & Refunds' },
  { id: 'shipping', label: 'Shipping' },
  { id: 'faq', label: 'FAQs' },
];

// ===========================================
// POLICY CONTENT
// ===========================================
const POLICY_CONTENT = {
  terms: {
    title: 'Terms & Conditions',
    lastUpdated: 'February 2026',
    sections: [
      {
        heading: '1. Welcome',
        content: `Hi there! Thanks for stopping by Otterseas. By shopping with us or using our website, you agree to these Terms & Conditions. We are a UK-registered company, and we've written these terms to be friendly but legally solid to protect both you and us.\n\n"We/Us/Our" refers to Otterseas (Registered in the UK).\n"You" refers to the customer visiting or buying from us.`,
      },
      {
        heading: '2. Our Products',
        content: `We do our absolute best to ensure that the photos and descriptions of our goods are accurate. However, screens vary, and colours may look slightly different in real life.\n\nConformity of Goods: Under the UK Consumer Rights Act 2015, all goods sold must be of satisfactory quality, fit for purpose, and as described.\n\nAvailability: If you order something that has sadly gone out of stock, we will refund you immediately and let you know.\n\nPricing: We reserve the right to change prices at any time, but we will never change the price of an order you have already placed.`,
      },
      {
        heading: '3. Shipping, Customs & Delivery',
        content: `We ship internationally! Whether you are in the UK, the EU, or the USA, we want our goods to reach you safely.\n\nDispatch Times: We aim to ship orders within 1-2 business days.\n\nUK Customers: No extra duties or taxes will apply for domestic shipping.\n\nInternational Customers (EU & USA): If you are ordering from outside the UK, please note that you (the buyer) are responsible for any customs fees, import VAT, or taxes charged by your country. We have no control over these charges and cannot falsify customs forms (it's illegal!).\n\nDelays: We are not liable for delays caused by customs processing or the postal service once the package has left our hands.`,
      },
      {
        heading: '4. Returns & Refunds (Your Right to Cancel)',
        content: `We comply with the UK Consumer Contracts Regulations and the EU Consumer Rights Directive, which gives you a "cooling-off" period.\n\n14-Day Cancellation Right: You have 14 days from the day you receive your goods to notify us that you want to return them for a refund—no questions asked.\n\nReturn Window: Once you've notified us, you have another 14 days to post the goods back to us.\n\nReturn Costs: You are responsible for the cost of return shipping unless the item arrived damaged or faulty.\n\nRefund Processing: We will process your refund within 14 days of receiving the returned goods.\n\nDamaged/Faulty Goods: If an item arrives broken or defective, please email us within 30 days. Under the Consumer Rights Act, you are entitled to a full refund or replacement for faulty goods.`,
      },
      {
        heading: '5. Liability',
        content: `UK/EU: We do not exclude liability for death or personal injury caused by our negligence or for fraud. For other losses, our liability is limited to the purchase price of the goods.\n\nUSA: To the fullest extent permitted by law, we provide our goods "as is." We disclaim implied warranties of merchantability and fitness for a particular purpose.`,
      },
      {
        heading: '6. Governing Law',
        content: `These terms are governed by the laws of England and Wales. Any disputes arising from your use of this site shall be settled in the courts of England and Wales.`,
      },
      {
        heading: 'Contact Us',
        content: `If you have any questions about these Terms & Conditions, please contact us at info@otterseas.com.`,
      },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    lastUpdated: 'February 2026',
    sections: [
      {
        heading: '1. Who We Are',
        content: `This Privacy Policy explains how we handle your data in compliance with the UK Data Protection Act 2018 (UK GDPR), EU GDPR, and standard US privacy practices.\n\nThe data controller for your information is Otterseas (Registered in the UK). You can contact us at: info@otterseas.com.`,
      },
      {
        heading: '2. What Information We Collect',
        content: `We only collect information that is necessary to fulfil your order or improve your experience:\n\nIdentity Data: Name, username.\n\nContact Data: Billing address, delivery address, email address, telephone number.\n\nTransaction Data: Details of products you have purchased.\n\nNote: We do not see or store your credit card numbers; these are handled securely by our payment processor.`,
      },
      {
        heading: '3. How We Use Your Data',
        content: `We use your data strictly for the following legal bases:\n\nContractual Necessity: To process and deliver your order.\n\nLegal Obligation: To keep tax and accounting records (e.g., HMRC requires us to keep sales records for 6 years).\n\nConsent: To send you marketing emails only if you have actively opted in.`,
      },
      {
        heading: '4. Sharing Your Data',
        content: `We respect your privacy and will never sell your data. We only share data with third parties required to make the shop run:\n\nShipping Providers: (e.g., Royal Mail, USPS) to deliver your package.\n\nPayment Processors: (e.g., Stripe, PayPal) to handle payments.\n\nWebsite Hosts: Shopify, to keep the site online.`,
      },
      {
        heading: '5. International Transfers',
        content: `If we transfer your data outside the UK/EU (for example, if our website server is in the US), we ensure it is protected by appropriate safeguards (such as Standard Contractual Clauses).`,
      },
      {
        heading: '6. Your Rights',
        content: `Under GDPR, you have the right to:\n\nAccess: Ask for a copy of the data we hold about you.\n\nCorrection: Ask us to fix wrong information.\n\nErasure: Ask us to delete your data ("Right to be Forgotten"), provided we don't need it for legal tax reasons.\n\nObjection: Opt-out of marketing at any time.\n\nTo exercise any of these rights, please email us at info@otterseas.com.`,
      },
      {
        heading: '7. Cookies',
        content: `We use cookies to keep track of what is in your shopping basket and to understand how visitors use our site. You can choose to accept only essential cookies or all cookies including analytics. You can change your preferences at any time. Please note that our shop may not work perfectly without essential cookies.`,
      },
      {
        heading: 'Contact Us',
        content: `If you have any questions about this Privacy Policy, please contact us at info@otterseas.com.`,
      },
    ],
  },
  returns: {
    title: 'Returns & Refunds',
    lastUpdated: 'February 2026',
    sections: [
      {
        heading: 'Our Promise',
        content: `We want you to be completely happy with your purchase. If for any reason you are not satisfied, we're here to help. We stand behind the quality of our products and aim to resolve any issues quickly and fairly.`,
      },
      {
        heading: 'Return Eligibility',
        content: `Items may be returned within 30 days of delivery. To be eligible for a return, items must be unused, in their original condition, and in original packaging where applicable. Stickers must be unused and in their original packaging. Personalised or custom items cannot be returned unless faulty.`,
      },
      {
        heading: 'How to Request a Return',
        content: `To initiate a return, please contact us at info@otterseas.com with your order number and reason for return. We will provide you with return instructions and a return address. Please do not send items back without contacting us first.`,
      },
      {
        heading: 'Return Shipping',
        content: `Customers are responsible for return shipping costs unless the item is faulty or we made an error with your order. We recommend using a tracked shipping service as we cannot be responsible for items lost in return transit.`,
      },
      {
        heading: 'Refund Process',
        content: `Once we receive your returned item, we will inspect it and notify you of the approval or rejection of your refund. If approved, your refund will be processed within 5-7 business days. Refunds will be issued to the original payment method. Please note that it may take additional time for the refund to appear on your statement depending on your bank.`,
      },
      {
        heading: 'Exchanges',
        content: `If you'd like to exchange an item for a different product or variant, please contact us at info@otterseas.com. We'll do our best to accommodate exchanges subject to stock availability. For exchanges, please follow our standard return process and place a new order.`,
      },
      {
        heading: 'Damaged or Faulty Items',
        content: `If your item arrives damaged or faulty, please contact us within 7 days of delivery with photos of the damage. We will arrange a replacement or full refund including any original shipping costs. We may ask you to return the faulty item at our expense.`,
      },
      {
        heading: 'Order Cancellations',
        content: `If you need to cancel an order, please contact us as soon as possible. If your order has not yet been dispatched, we can cancel it and issue a full refund. Once an order has been dispatched, it cannot be cancelled and our standard returns policy applies.`,
      },
      {
        heading: 'Contact Us',
        content: `For any returns or refund queries, please email us at info@otterseas.com. We aim to respond to all enquiries within 24-48 hours.`,
      },
    ],
  },
  shipping: {
    title: 'Shipping Information',
    lastUpdated: 'February 2026',
    sections: [
      {
        heading: 'Processing Time',
        content: `Orders are typically processed within 1-3 business days. During busy periods or sales, processing may take up to 5 business days. You will receive an email confirmation when your order has been dispatched.`,
      },
      {
        heading: 'UK Delivery',
        content: `Standard Delivery (Royal Mail): 3-5 business days. Tracked Delivery (Royal Mail Tracked 48): 2-3 business days. Express Delivery (Royal Mail Tracked 24): 1-2 business days. Shipping costs are calculated at checkout.`,
      },
      {
        heading: 'European Delivery',
        content: `Standard International: 7-14 business days. Tracked International: 5-10 business days. Delivery times vary by country. Shipping costs are calculated at checkout. Please note that customs duties and taxes may apply and are the responsibility of the recipient.`,
      },
      {
        heading: 'USA & Canada Delivery',
        content: `Standard International: 10-21 business days. Tracked International: 7-14 business days. Shipping costs are calculated at checkout. Customs duties and import taxes may apply and are the responsibility of the recipient.`,
      },
      {
        heading: 'Rest of World',
        content: `Standard International: 14-28 business days. Tracked International: 10-21 business days. Delivery times vary by destination. Shipping costs are calculated at checkout. Customs duties and taxes may apply.`,
      },
      {
        heading: 'Order Tracking',
        content: `For tracked shipments, you will receive a tracking number via email once your order has been dispatched. You can use this number to track your parcel on the carrier's website. Please allow 24-48 hours for tracking information to update.`,
      },
      {
        heading: 'Shipping Restrictions',
        content: `We currently ship to most countries worldwide. However, there may be some restrictions based on local regulations. If we are unable to ship to your location, you will be notified at checkout.`,
      },
      {
        heading: 'Lost or Delayed Parcels',
        content: `If your parcel appears to be lost or significantly delayed, please contact us at info@otterseas.com. For UK orders, please allow 10 business days before reporting a lost parcel. For international orders, please allow 28 business days. We will work with the carrier to locate your parcel or arrange a replacement/refund.`,
      },
      {
        heading: 'Incorrect Address',
        content: `Please ensure your shipping address is correct before placing your order. We are not responsible for orders shipped to incorrect addresses provided by the customer. If a parcel is returned to us due to an incorrect address, we will contact you to arrange reshipment at your expense.`,
      },
    ],
  },
  faq: {
    title: 'Frequently Asked Questions',
    lastUpdated: 'February 2026',
    sections: [
      {
        heading: 'How do I track my order?',
        content: `Once your order has been dispatched, you will receive an email with tracking information (for tracked shipments). You can click the tracking link in the email or visit the carrier's website to check the status of your delivery.`,
      },
      {
        heading: 'What payment methods do you accept?',
        content: `We accept all major credit and debit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and Shop Pay. All payments are processed securely through Shopify Payments.`,
      },
      {
        heading: 'Are your stickers waterproof?',
        content: `Yes! Our location stickers are printed on high-quality, waterproof vinyl that's perfect for water bottles, dive gear, laptops, and more. They're designed to withstand exposure to water and the elements while maintaining their vibrant colours.`,
      },
      {
        heading: 'Can I customise my order?',
        content: `Currently, we don't offer custom sticker designs. However, we're always adding new designs based on customer suggestions! If you have a dive location you'd love to see as a sticker, please let us know at info@otterseas.com.`,
      },
      {
        heading: 'How does the Dive Journal work?',
        content: `Our Dive Journal is a beautifully designed logbook for recording your underwater adventures. It includes log pages for dive details, marine life identification guides, and sections for tracking your dive sites around the world. The journal uses a ring-bound system, so you can add extra pages as needed with our Logbook Booster Packs.`,
      },
      {
        heading: 'Do you offer wholesale or bulk orders?',
        content: `Yes, we offer wholesale pricing for dive shops, resorts, and retailers. Please contact us at info@otterseas.com with details about your business and the products you're interested in.`,
      },
      {
        heading: 'How can I contact customer support?',
        content: `You can reach us by email at info@otterseas.com. We aim to respond to all enquiries within 24-48 hours. For order-related questions, please include your order number in your message.`,
      },
      {
        heading: 'Do you ship internationally?',
        content: `Yes! We ship worldwide. Shipping costs and delivery times vary by destination. Please see our Shipping Information page for details. Note that international orders may be subject to customs duties and taxes.`,
      },
      {
        heading: 'What if my item arrives damaged?',
        content: `We take great care in packaging your order, but if your item arrives damaged, please contact us within 7 days of delivery with photos of the damage. We will arrange a replacement or full refund. See our Returns Policy for more details.`,
      },
      {
        heading: 'Can I change or cancel my order?',
        content: `If you need to change or cancel your order, please contact us as soon as possible at info@otterseas.com. If your order hasn't been dispatched yet, we can usually make changes. Once dispatched, changes cannot be made and you may need to return the item.`,
      },
      {
        heading: 'Do you have a rewards or loyalty programme?',
        content: `We're currently working on a loyalty programme for our amazing community of divers! Sign up for our newsletter to be the first to know when it launches, plus get exclusive offers and early access to new products.`,
      },
      {
        heading: 'Are your products eco-friendly?',
        content: `We're committed to sustainability. Our stickers are printed on recyclable vinyl, and we use minimal, recyclable packaging wherever possible. We're continuously looking for ways to reduce our environmental impact. As ocean lovers, protecting our underwater world is incredibly important to us.`,
      },
    ],
  },
};

// ===========================================
// MAIN COMPONENT
// ===========================================
export default function PoliciesPage() {
  const [activeTab, setActiveTab] = useState('terms');
  const content = POLICY_CONTENT[activeTab];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8FAFB' }}>
      {/* Header */}
      <Header variant="light" currentPath="/policies" />

      {/* Main Content */}
      <main className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 
              className="text-3xl md:text-4xl font-bold mb-2"
              style={{ color: LUNA.deepWater }}
            >
              Help & Policies
            </h1>
            <p className="text-gray-500">
              Everything you need to know about shopping with Otterseas
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-2 mb-8"
          >
            {POLICY_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                style={{
                  backgroundColor: activeTab === tab.id ? LUNA.deepWater : 'white',
                  color: activeTab === tab.id ? 'white' : LUNA.deepWater,
                  border: `1px solid ${activeTab === tab.id ? LUNA.deepWater : '#E5E7EB'}`,
                }}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>

          {/* Policy Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-sm p-6 md:p-10"
            >
              {/* Content Header */}
              <div className="border-b pb-4 mb-6" style={{ borderColor: '#E5E7EB' }}>
                <h2 
                  className="text-2xl font-bold mb-1"
                  style={{ color: LUNA.deepWater }}
                >
                  {content.title}
                </h2>
                <p className="text-sm text-gray-400">
                  Last updated: {content.lastUpdated}
                </p>
              </div>

              {/* Content Sections */}
              <div className="space-y-6">
                {content.sections.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <h3 
                      className="text-lg font-semibold mb-2"
                      style={{ color: LUNA.midDepth }}
                    >
                      {section.heading}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {section.content}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Contact CTA */}
              <div 
                className="mt-10 p-6 rounded-xl text-center"
                style={{ backgroundColor: `${LUNA.highlight}20` }}
              >
                <h4 
                  className="font-semibold mb-2"
                  style={{ color: LUNA.deepWater }}
                >
                  Still have questions?
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  We're here to help! Get in touch with our friendly team.
                </p>
                <a
                  href="mailto:info@otterseas.com"
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: LUNA.surfaceTeal }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  info@otterseas.com
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
