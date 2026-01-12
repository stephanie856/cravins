
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="text-center mb-8 px-4">
      <h2 className="font-bebas text-4xl md:text-5xl text-[#DD3333] leading-tight mb-2 tracking-wide">
        GET $5 OFF YOUR NEXT<br />TWO ORDERS! 🎁
      </h2>
      <p className="font-montserrat text-sm text-[#2C2C2C] font-semibold opacity-80">
        Minimum $15 purchase • One code per visit
      </p>
    </section>
  );
};

export default Hero;
