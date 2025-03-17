import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    environment: {
      apiUrlSet: !!process.env.EXCHANGE_RATE_API_URL,
      apiKeySet: !!process.env.EXCHANGE_RATE_API_KEY,
      apiKeyPrefix: process.env.EXCHANGE_RATE_API_KEY ? 
        process.env.EXCHANGE_RATE_API_KEY.substring(0, 4) + '***' : 'NOT SET'
    }
  });
}