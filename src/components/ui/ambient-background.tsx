import React from "react";

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Soft & Luxurious Warm Ambient Glow Blobs */}
      <div className="absolute -top-32 -left-32 w-[550px] sm:w-[850px] h-[550px] sm:h-[850px] rounded-full bg-gradient-to-br from-[#ffc436]/15 via-[#fef3c7]/30 to-transparent blur-[120px]" />
      <div className="absolute top-[20%] -right-32 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] rounded-full bg-gradient-to-bl from-[#ffc436]/18 via-[#f1f5f8]/70 to-transparent blur-[130px]" />
      <div className="absolute top-[50%] -left-28 w-[480px] sm:w-[750px] h-[480px] sm:h-[750px] rounded-full bg-gradient-to-tr from-[#0c356a]/8 via-[#ffc436]/12 to-transparent blur-[120px]" />
      <div className="absolute top-[75%] -right-28 w-[520px] sm:w-[820px] h-[520px] sm:h-[820px] rounded-full bg-gradient-to-tl from-[#ffc436]/18 via-[#f1f5f8]/80 to-transparent blur-[130px]" />
    </div>
  );
}
