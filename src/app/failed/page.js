"use client";
import React from "react";

const Failed = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-50">
      <h1 className="text-6xl font-bold text-red-700">Payment Failed</h1>
      <p className="text-2xl text-red-700">
        Sorry, your payment has failed. Please try again later.
      </p>
      <button
        className="px-4 py-2 mt-8 text-white bg-red-700 rounded-lg shadow-lg"
        onClick={() => (window.location.href = "/")}
      >
        Go back to home page
      </button>
    </div>
  );
};

export default Failed;
