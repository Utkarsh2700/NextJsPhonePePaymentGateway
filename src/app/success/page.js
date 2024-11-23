import React from "react";

const Success = () => {
  return (
    <>
      <div className="bg-green-500 h-screen flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-5xl font-bold text-green-700">Success</h1>
          <p className="text-2xl text-green-700">
            Your payment has been completed successfully
          </p>
        </div>
      </div>
    </>
  );
};

export default Success;
