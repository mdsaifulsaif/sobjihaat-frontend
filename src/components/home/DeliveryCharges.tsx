'use client';

import React from 'react';
import Image from 'next/image';

interface DeliveryTier {
  id: number;
  area: string;
  charge: string;
  freeAbove: string;
}

const barisalDeliveryData: DeliveryTier[] = [
  { id: 1, area: "Rupatoli", charge: "৳30", freeAbove: "৳500" },
  { id: 2, area: "Nahullabad", charge: "৳30", freeAbove: "৳500" },
  { id: 3, area: "Amtala", charge: "৳40", freeAbove: "৳800" },
  { id: 4, area: "Sadar Road", charge: "৳40", freeAbove: "৳800" },
  { id: 5, area: "Bishwa Road", charge: "৳50", freeAbove: "৳1000" },
];

const DeliveryCharges: React.FC = () => {
  return (
    <section className="py-16 bg-[#fefefe]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            
            {/* Left Content - Table */}
            <div className="lg:w-[60%] w-full">
              <div className="mb-8">
                <h2 className="text-4xl font-semibold text-[var(--color-text-primary)] mb-3">
                  Delivery Charges
                </h2>
                <p className="text-[var(--color-text-secondary)] text-lg">
                  Affordable delivery across Barishal & beyond
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <th className="px-8 py-5 text-left text-gray-700 font-semibold">Service Area</th>
                      <th className="px-8 py-5 text-left text-gray-700 font-semibold">Delivery Charge</th>
                      <th className="px-8 py-5 text-left text-gray-700 font-semibold">Free Delivery Above</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {barisalDeliveryData.map((tier) => (
                      <tr key={tier.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-8 py-5 font-medium text-gray-700">{tier.area}</td>
                        <td className="px-8 py-5 text-gray-600">{tier.charge}</td>
                        <td className="px-8 py-5 text-gray-600">{tier.freeAbove}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="lg:w-[40%] w-full flex justify-center lg:justify-end">
              <div className="relative">
                <Image
                  src="/biked.png"
                  alt="Fast Delivery"
                  width={420}
                  height={420}
                  className="drop-shadow-2xl"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryCharges;