import React from "react";

const Loader = () => {
  return (
    <div className="h-[90vh] flex items-center justify-center ">
      <div className="relative">
        <div className="absolute inset-0 w-20 h-20 animate-ping rounded-full bg-indigo-500 opacity-75"></div>
        <div className="w-16 h-16 border-4 border-t-transparent border-indigo-400 border-solid rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loader;
