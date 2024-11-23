import { NextResponse } from "next/server";
import crypto from "crypto";
import axios from "axios";

const salt_key = process.env.NEXT_SALT_KEY;
const merchant_id = process.env.NEXT_MERCHANT_ID;

// console.log(salt_key, merchant_id);

export async function POST(req) {
  try {
    const reqBody = await req.json();

    const data = {
      merchantId: merchant_id,
      merchantTransactionId: reqBody.transactionId,
      name: reqBody.name,
      mobileNumber: reqBody.mobile,
      amount: reqBody.amount * 100,
      redirectUrl: `http://localhost:3000/api/v1/status?id=${reqBody.transactionId}`,
      callbackUrl: `http://localhost:3000/api/v1/status?id=${reqBody.transactionId}`,
      redirectMode: "POST",
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };
    // const hash = console.log("reqBody", reqBody);

    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString("base64");
    const keyIndex = 1;
    const string = payloadMain + "/pg/v1/pay" + salt_key;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    console.log("sha256", sha256);
    const checkSum = sha256 + "###" + keyIndex;

    const prod_URL =
      "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

    const option = {
      method: "POST",
      url: prod_URL,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checkSum,
      },
      data: {
        request: payloadMain,
      },
    };

    const response = await axios(option);
    console.log("phonepe response", response);

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Payment initiation Failed", details: error.message },
      { status: 500 }
    );
  }
}
