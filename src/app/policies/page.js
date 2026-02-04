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
        heading: 'Introduction',
        content: `Welcome to Otterseas ("we", "our", "us"). By accessing and using our website www.otterseas.com, you accept and agree to be bound by the terms and conditions outlined below. Please read these terms carefully before using our website or making a purchase.`,
      },
      {
        heading: 'Use of Website',
        content: `You may use our website for lawful purposes only. You must not use our website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website. You must not use our website in any way which is unlawful, illegal, fraudulent, or harmful.`,
      },
      {
        heading: 'Products & Pricing',
        content: `All products are subject to availability. We reserve the right to discontinue any product at any time. Prices are shown in multiple currencies for your convenience. The final price charged will be in the currency selected at checkout. We reserve the right to change prices at any time without prior notice. Prices do not include shipping costs, which will be calculated at checkout.`,
      },
      {
        heading: 'Orders & Payment',
        content: `When you place an order, you are making an offer to purchase. We reserve the right to accept or decline your order. Payment must be made in full at the time of ordering. We accept major credit cards and other payment methods as displayed at checkout. All payments are processed securely through Shopify Payments.`,
      },
      {
        heading: 'Intellectual Property',
        content: `All content on this website, including but not limited to text, graphics, logos, images, artwork, and designs, is the property of Otterseas and is protected by copyright and other intellectual property laws. Our original artwork and sticker designs may not be reproduced, distributed, or used without our express written permission.`,
      },
      {
        heading: 'Limitation of Liability',
        content: `To the fullest extent permitted by law, Otterseas shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or other intangible losses, resulting from your use of our website or products.`,
      },
      {
        heading: 'Governing Law',
        content: `These terms and conditions are governed by and construed in accordance with the laws of the United Kingdom. Any disputes relating to these terms shall be subject to the exclusive jurisdiction of the courts of the United Kingdom.`,
      },
      {
        heading: 'Changes to Terms',
        content: `We reserve the right to update these terms and conditions at any time. Changes will be posted on this page with an updated revision date. Your continued use of the website after any changes constitutes acceptance of the new terms.`,
      },
      {
        heading: 'Contact Us',
        content: `If you have any questions about these Terms & Conditions, please contact us at hello@otterseas.com.`,
      },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    lastUpdated: 'February 2026',
    sections: [
      {
        heading: 'Introduction',
        content: `Otterseas ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website www.otterseas.com or make a purchase from us.`,
      },
      {
        heading: 'Information We Collect',
        content: `We collect information you provide directly to us, including: name, email address, shipping address, billing address, phone number (optional), and payment information. We also automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, and information about how you interact with our website.`,
      },
      {
        heading: 'How We Use Your Information',
        content: `We use the information we collect to: process and fulfill your orders, communicate with you about your order and provide customer support, send you marketing communications (with your consent), improve our website and products, comply with legal obligations, and detect and prevent fraud.`,
      },
      {
        heading: 'Sharing Your Information',
        content: `We may share your information with: service providers who assist us in operating our website and fulfilling orders (such as Shopify, payment processors, and shipping carriers), and legal authorities when required by law. We do not sell your personal information to third parties.`,
      },
      {
        heading: 'Cookies',
        content: `We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some parts of our website.`,
      },
      {
        heading: 'Data Security',
        content: `We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. All payment transactions are encrypted using SSL technology and processed through secure payment providers.`,
      },
      {
        heading: 'Your Rights',
        content: `Under UK GDPR, you have the right to: access the personal data we hold about you, request correction of inaccurate data, request deletion of your data, object to processing of your data, request restriction of processing, and data portability. To exercise any of these rights, please contact us at hello@otterseas.com.`,
      },
      {
        heading: 'Data Retention',
        content: `We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Order information is retained for accounting and legal purposes.`,
      },
      {
        heading: 'Marketing Communications',
        content: `With your consent, we may send you emails about new products, special offers, and other updates. You can opt out of marketing communications at any time by clicking the "unsubscribe" link in any marketing email or by contacting us directly.`,
      },
      {
        heading: 'Changes to This Policy',
        content: `We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.`,
      },
      {
        heading: 'Contact Us',
        content: `If you have any questions about this Privacy Policy, please contact us at hello@otterseas.com.`,
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
        content: `To initiate a return, please contact us at hello@otterseas.com with your order number and reason for return. We will provide you with return instructions and a return address. Please do not send items back without contacting us first.`,
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
        content: `If you'd like to exchange an item for a different product or variant, please contact us at hello@otterseas.com. We'll do our best to accommodate exchanges subject to stock availability. For exchanges, please follow our standard return process and place a new order.`,
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
        content: `For any returns or refund queries, please email us at hello@otterseas.com. We aim to respond to all enquiries within 24-48 hours.`,
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
        content: `Standard Delivery (Royal Mail): 3-5 business days, from £2.99. Tracked Delivery (Royal Mail Tracked 48): 2-3 business days, from £3.99. Express Delivery (Royal Mail Tracked 24): 1-2 business days, from £5.99. Free standard shipping on orders over £30.`,
      },
      {
        heading: 'European Delivery',
        content: `Standard International: 7-14 business days, from £5.99. Tracked International: 5-10 business days, from £8.99. Delivery times vary by country. Please note that customs duties and taxes may apply and are the responsibility of the recipient.`,
      },
      {
        heading: 'USA & Canada Delivery',
        content: `Standard International: 10-21 business days, from £6.99. Tracked International: 7-14 business days, from £12.99. Customs duties and import taxes may apply and are the responsibility of the recipient.`,
      },
      {
        heading: 'Rest of World',
        content: `Standard International: 14-28 business days, from £7.99. Tracked International: 10-21 business days, from £14.99. Delivery times vary by destination. Customs duties and taxes may apply.`,
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
        content: `If your parcel appears to be lost or significantly delayed, please contact us at hello@otterseas.com. For UK orders, please allow 10 business days before reporting a lost parcel. For international orders, please allow 28 business days. We will work with the carrier to locate your parcel or arrange a replacement/refund.`,
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
        content: `Currently, we don't offer custom sticker designs. However, we're always adding new designs based on customer suggestions! If you have a dive location you'd love to see as a sticker, please let us know at hello@otterseas.com.`,
      },
      {
        heading: 'How does the Dive Journal work?',
        content: `Our Dive Journal is a beautifully designed logbook for recording your underwater adventures. It includes log pages for dive details, marine life identification guides, and sections for tracking your dive sites around the world. The journal uses a ring-bound system, so you can add extra pages as needed with our Logbook Booster Packs.`,
      },
      {
        heading: 'Do you offer wholesale or bulk orders?',
        content: `Yes, we offer wholesale pricing for dive shops, resorts, and retailers. Please contact us at hello@otterseas.com with details about your business and the products you're interested in.`,
      },
      {
        heading: 'How can I contact customer support?',
        content: `You can reach us by email at hello@otterseas.com. We aim to respond to all enquiries within 24-48 hours. For order-related questions, please include your order number in your message.`,
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
        content: `If you need to change or cancel your order, please contact us as soon as possible at hello@otterseas.com. If your order hasn't been dispatched yet, we can usually make changes. Once dispatched, changes cannot be made and you may need to return the item.`,
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
      <Header variant="light" currentPath="/policies" hideOnScroll={false} />

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
                  href="mailto:hello@otterseas.com"
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: LUNA.surfaceTeal }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  hello@otterseas.com
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
