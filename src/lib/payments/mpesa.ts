// M-Pesa Daraja API Utility

const MPESA_AUTH_URL = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
const MPESA_STK_PUSH_URL = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

export async function getMpesaAccessToken() {
  const consumerKey = process.env.MPESA_CONSUMER_KEY;
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET;

  if (!consumerKey || !consumerSecret) {
    console.warn("M-Pesa credentials missing. Using mock token.");
    return "MockToken_12345";
  }

  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

  const response = await fetch(MPESA_AUTH_URL, {
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });

  const data = await response.json();
  return data.access_token;
}

export async function triggerStkPush(phoneNumber: string, amount: number, reference: string) {
  const token = await getMpesaAccessToken();
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 14);
  const password = Buffer.from(`${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`).toString("base64");

  const body = {
    BusinessShortCode: process.env.MPESA_SHORTCODE || "174379",
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: phoneNumber,
    PartyB: process.env.MPESA_SHORTCODE || "174379",
    PhoneNumber: phoneNumber,
    CallBackURL: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/mpesa`,
    AccountReference: reference,
    TransactionDesc: `Reservation for ${reference}`,
  };

  const response = await fetch(MPESA_STK_PUSH_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return await response.json();
}
