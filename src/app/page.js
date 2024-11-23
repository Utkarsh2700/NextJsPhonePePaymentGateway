"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const startPaymentFlow = () => {
    console.log("Payment Button Clicked");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      amount,
      mobile,
      MUID: "MUID7" + Date.now(),
      transactionId: "T7" + Date.now(),
    };
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/order`,
        data
      );
      console.log("response", response);
      if (
        response.data &&
        response.data.data.instrumentResponse.redirectInfo.url
      ) {
        window.location.href =
          response.data.data.instrumentResponse.redirectInfo.url;
      }
    } catch (error) {
      console.error(error);
    }
    // console.log(data);
    setAmount("");
    setMobile("");
    setName("");
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
        <h1 className="text-6xl font-bold text-white">
          Test PhonePe Payment Gateway Integration
        </h1>
        <p className="text-2xl text-white">
          This is a test website to integrate PhonePe payment gateway.
        </p>
        <form
          className="w-full max-w-sm bg-yellow-300 p-8 rounded-lg shadow-md space-y-8"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="mobile"
            >
              Mobile
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="mobile"
              type="text"
              placeholder="Enter your mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="amount"
            >
              Amount
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="amount"
              type="text"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <button
            disabled={loading}
            type="submit"
            className="mt-10 px-6 py-3 text-lg font-bold text-white bg-blue-600 rounded-md"
            // onClick={() => {
            //   // call the function to start the payment flow
            //   startPaymentFlow();
            // }}
          >
            {loading ? "Processing...." : "Start Payment Flow "}
          </button>
        </form>
      </div>
    </>
  );
}
