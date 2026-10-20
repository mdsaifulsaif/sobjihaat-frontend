import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { FiChevronRight, FiFileText, FiCheckCircle, FiAlertCircle, FiMail, FiPhone } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Terms & Conditions | SobjiHaat - Online Grocery Delivery",
  description:
    "Read the terms, rules, and conditions for ordering fresh vegetables, fruits, fish, and groceries from SobjiHaat in Barisal, Bangladesh.",
};

export default function TermsPage() {
  const lastUpdated = "October 2026";

  return (
    <div className="bg-white min-h-screen font-['Poppins']">
      {/* Header */}
      <div className="bg-gray-50/70 border-b border-gray-100 py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            <Link href="/" className="hover:text-[var(--color-primary)] transition-colors">
              Home
            </Link>
            <FiChevronRight size={14} />
            <span className="text-gray-900">Terms & Conditions</span>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center shrink-0">
              <FiFileText size={22} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Terms & <span className="text-[var(--color-primary)]">Conditions</span>
            </h1>
          </div>
          <p className="text-gray-500 text-xs sm:text-sm mt-2">
            Last Updated: {lastUpdated} • Please review carefully before placing orders with SobjiHaat
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-10 sm:py-14">
        <div className="prose prose-gray max-w-none space-y-8 text-gray-600 text-sm sm:text-base leading-relaxed">
          {/* Section 1 */}
          <section className="bg-gray-50/70 p-6 sm:p-8 rounded-2xl border border-gray-100">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-[var(--color-primary)] font-mono text-lg">01.</span> Agreement to Terms
            </h2>
            <p>
              These Terms & Conditions constitute a legally binding agreement between you (&ldquo;Customer&rdquo;, &ldquo;User&rdquo;) and <strong>SobjiHaat</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;), governing your access to and use of our website, applications, and doorstep grocery delivery services in Barisal, Bangladesh.
            </p>
            <p className="mt-3">
              By placing an order or registering an account on SobjiHaat, you acknowledge that you have read, understood, and agreed to be bound by these Terms and our Privacy Policy.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-[var(--color-primary)] font-mono text-lg">02.</span> Eligibility & Account Registration
            </h2>
            <p>To use our services, you agree to the following:</p>
            <ul className="list-disc list-inside space-y-1.5 text-sm sm:text-base text-gray-600 pl-2">
              <li>You must be at least 18 years old or place orders under parental/guardian supervision.</li>
              <li>You agree to provide accurate, up-to-date, and complete contact details (active phone number, valid delivery address in Barisal).</li>
              <li>You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-[var(--color-primary)] font-mono text-lg">03.</span> Product Quality, Weights & Daily Pricing
            </h2>
            <p>
              SobjiHaat specializes in fresh agricultural produce, seafood, meat, and packaged consumer goods:
            </p>
            <div className="space-y-3 mt-3">
              <div className="p-4 bg-white rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-900 text-sm mb-1">Perishable Weight Tolerances</h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  Because fresh vegetables, fish, and fruits naturally vary in shape and moisture content, exact fractional weights may differ slightly (within ±5%). We always strive to provide equal or slightly higher weight to ensure fair customer value.
                </p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-900 text-sm mb-1">Market-Reflected Pricing</h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  Vegetable and fruit prices in Bangladesh fluctuate with daily wholesale agricultural markets. The price displayed in your cart at the time of checkout is the final applicable price.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-[var(--color-primary)] font-mono text-lg">04.</span> Delivery Policy & Service Area
            </h2>
            <p>
              We currently serve designated zones within <strong>Barisal City</strong> and surrounding areas:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-sm sm:text-base text-gray-600 pl-2">
              <li><strong>Delivery Slots:</strong> Orders are scheduled according to our designated delivery slots (Morning & Afternoon/Evening). Same-day delivery is available for orders placed before cutoff times.</li>
              <li><strong>Customer Availability:</strong> Customers must be available at the designated delivery address and answer their phone when our rider arrives.</li>
              <li><strong>Unreachable Delivery:</strong> If a customer cannot be reached after multiple phone attempts, the order may be rescheduled or canceled, and delivery re-attempt fees may apply.</li>
            </ul>
          </section>

          {/* Section 5 - 100% Quality & Returns */}
          <section className="p-6 sm:p-8 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-lg">
              <FiCheckCircle size={20} />
              <span>05. 100% Freshness Guarantee & Doorstep Returns</span>
            </div>
            <p className="text-gray-700 text-sm sm:text-base">
              We take immense pride in our farm-fresh quality. To ensure total satisfaction:
            </p>
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-gray-700">
              <li><strong>Doorstep Inspection:</strong> We strongly encourage you to inspect fresh vegetables, fruits, and meat upon delivery in front of the rider.</li>
              <li><strong>Immediate Replacement:</strong> If any item is damaged, wilted, or incorrect, hand it back to the rider on the spot. We will deduct it from your Cash on Delivery total or dispatch an immediate replacement.</li>
              <li><strong>Post-Delivery Reporting:</strong> Any quality concern must be reported within <strong>4 hours</strong> of delivery with a photo sent to our WhatsApp helpline (+880 1522-114096) due to the perishable nature of produce.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-[var(--color-primary)] font-mono text-lg">06.</span> Payment Terms & Refunds
            </h2>
            <ul className="list-disc list-inside space-y-1.5 text-sm sm:text-base text-gray-600 pl-2">
              <li><strong>Payment Options:</strong> We accept Cash on Delivery (COD), bKash, Nagad, Rocket, and major debit/credit cards.</li>
              <li><strong>Cash on Delivery (COD):</strong> Exact change is appreciated. The rider is authorized to collect the full invoice amount upon handover.</li>
              <li><strong>Refunds:</strong> In cases of prepaid online orders where an item is unavailable or returned, refunds will be initiated via the original payment method within 3 to 7 working days.</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-[var(--color-primary)] font-mono text-lg">07.</span> Order Cancellations
            </h2>
            <p>
              You may cancel an order before it has been packed and handed over to our delivery fleet. Once an order is out for delivery with a rider, cancellation is not permitted unless under special circumstances authorized by customer support.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-[var(--color-primary)] font-mono text-lg">08.</span> Rider Respect & Safety
            </h2>
            <p>
              Our delivery riders work tirelessly in all weather conditions to bring you fresh food. We enforce a zero-tolerance policy against abusive language, mistreatment, or harassment of our riders. We reserve the right to ban accounts violating this code of conduct.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-[var(--color-primary)] font-mono text-lg">09.</span> Limitation of Liability & Force Majeure
            </h2>
            <p>
              SobjiHaat is not liable for delayed deliveries caused by unforeseen circumstances beyond reasonable control, including extreme natural weather events, road blockades, traffic jams, strikes, or government restrictions.
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-[var(--color-primary)] font-mono text-lg">10.</span> Governing Law
            </h2>
            <p>
              These Terms & Conditions are governed by and construed in accordance with the laws of the People&apos;s Republic of Bangladesh. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the courts of Barisal, Bangladesh.
            </p>
          </section>

          {/* Section 11 */}
          <section className="bg-gray-50/70 p-6 sm:p-8 rounded-2xl border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-2">11. Contact & Grievance Redressal</h2>
            <p className="text-sm text-gray-600 mb-4">
              For any questions regarding these Terms & Conditions or to report a grievance, please contact us:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <FiMail className="text-[var(--color-primary)]" />
                <a href="mailto:support@sobjihaat.com" className="font-semibold hover:underline">
                  support@sobjihaat.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <FiPhone className="text-[var(--color-primary)]" />
                <a href="tel:01783176838" className="font-semibold hover:underline">
                  +880 1783-176838
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
