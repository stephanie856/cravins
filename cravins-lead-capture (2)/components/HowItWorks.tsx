
import React from 'react';

const HowItWorks: React.FC = () => {
  return (
    <section className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/50">
      <h3 className="font-montserrat font-bold text-lg mb-4 text-[#2C2C2C]">How it works:</h3>
      <ul className="space-y-3">
        <li className="flex items-center gap-3">
          <span className="text-xl">✅</span>
          <span className="font-montserrat text-[#2C2C2C]">First code: <strong>Instant</strong></span>
        </li>
        <li className="flex items-center gap-3">
          <span className="text-xl">✅</span>
          <span className="font-montserrat text-[#2C2C2C]">Second code: <strong>7 days later</strong></span>
        </li>
        <li className="flex items-center gap-3">
          <span className="text-xl">✅</span>
          <span className="font-montserrat text-[#2C2C2C]">Each valid 14 days</span>
        </li>
      </ul>
    </section>
  );
};

export default HowItWorks;
