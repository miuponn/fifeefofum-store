import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const base = url.searchParams.get('base') || 'CAD';
  
  // Log environment variables (first few chars of key only)
  console.log('Environment check:', {
    apiUrlSet: !!process.env.EXCHANGE_RATE_API_URL,
    apiKeySet: !!process.env.EXCHANGE_RATE_API_KEY,
    apiKeyPrefix: process.env.EXCHANGE_RATE_API_KEY ? 
      process.env.EXCHANGE_RATE_API_KEY.substring(0, 4) + '***' : 'NOT SET'
  });
  
  if (!process.env.EXCHANGE_RATE_API_URL || !process.env.EXCHANGE_RATE_API_KEY) {
    return NextResponse.json(
      { error: 'API configuration missing', envVars: { 
          urlSet: !!process.env.EXCHANGE_RATE_API_URL,
          keySet: !!process.env.EXCHANGE_RATE_API_KEY 
        } 
      },
      { status: 500 }
    );
  }
  
  try {
    const apiUrl = `${process.env.EXCHANGE_RATE_API_URL}/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/${base}`;
    console.log('Calling API URL:', apiUrl.replace(process.env.EXCHANGE_RATE_API_KEY, '[REDACTED]'));
    
    const response = await axios.get(apiUrl);
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Error details:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      code: error.code
    });
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch exchange rates', 
        details: error.message,
        status: error.response?.status,
        code: error.code,
        responseData: error.response?.data
      },
      { status: 500 }
    );
  }
}