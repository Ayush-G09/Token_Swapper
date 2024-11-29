import React from "react";

function DisconnectedBanner() {
  return (
    <div className="w-full px-4 flex items-center justify-center">
      <div className="w-[90%] md:w-3/5 h-60 bg-slate-200 flex items-center justify-center flex-col rounded-md gap-2 mt-10 shadow-lg">
        <span className="text-xl md:text-4xl text-slate-700 font-bold">
          Wallet is Disconnected
        </span>
        <span className="text-xs md:text-lg text-slate-600">
          please connect to wallet first
        </span>
      </div>
    </div>
  );
}

export default DisconnectedBanner;
