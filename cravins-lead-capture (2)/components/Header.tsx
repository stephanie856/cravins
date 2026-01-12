
import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="w-full bg-[#DD3333] relative overflow-hidden rounded-xl shadow-2xl mb-10 flex flex-col md:flex-row items-center p-6 md:p-8 border-b-4 border-black/20">
      {/* Background Palm Decoration */}
      <div className="absolute right-0 top-0 h-full opacity-20 pointer-events-none">
        <svg className="h-full w-auto" viewBox="0 0 100 100" fill="white">
          <path d="M90,100 Q70,50 50,10 Q30,50 10,100" stroke="currentColor" fill="none" />
        </svg>
      </div>

      <div className="flex-1 flex justify-center md:justify-start items-center">
        <h1 className="font-montserrat text-6xl md:text-7xl font-black text-white tracking-tighter italic select-none">
          Cravins
        </h1>
      </div>

      <div className="flex-1 flex flex-col items-center md:items-end mt-4 md:mt-0 z-10">
        <div className="bg-white rounded-l-full rounded-r-none md:rounded-r-none py-1 px-6 w-full md:w-auto text-center md:text-right">
          <span className="font-bebas text-xl md:text-2xl text-[#DD3333] tracking-widest">
            CARIBBEAN GRILL • LOUNGE
          </span>
        </div>
        <div className="mt-2 text-white font-montserrat font-bold text-sm md:text-base tracking-wide">
          905.415.0078 • CRAVINS.CA
        </div>
      </div>
    </div>
  );
};

export default Header;
