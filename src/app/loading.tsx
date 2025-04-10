import React from "react";

const Loading = () => {
  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto"></div>
        <p className="mt-4 text-lg">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
