import crypto from "crypto";
import axios from "axios";
import { NextResponse } from "next/server";
let salt_key = process.env.NEXT_SALT_KEY;
let merchant_id = process.env.NEXT_MERCHANT_ID;

export async function POST(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const merchantTransactionId = searchParams.get("id");
    const keyIndex = 1;

    const string =
      `/pg/v1/status/${merchant_id}/${merchantTransactionId}` + salt_key;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checkSum = sha256 + "###" + keyIndex;

    const options = {
      method: "GET",
      url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchant_id}/${merchantTransactionId}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checkSum,
        X_MERCHANT_ID: merchant_id,
      },
    };
    const response = await axios(options);

    if (response.data.success === true) {
      return NextResponse.redirect(`http://localhost:3000/success`, {
        status: 301,
      });
    } else {
      return NextResponse.redirect(`http://localhost:3000/failed`, {
        status: 301,
      });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Payment initiation Failed", details: error.message },
      { status: 500 }
    );
  }
}
