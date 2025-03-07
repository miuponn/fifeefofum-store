
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
    const url = new URL(request.url);
    const base = url.searchParams.get('base') || 'CAD';
    
    try {
        const response = await axios.get(
            `${process.env.EXCHANGE_RATE_API_URL}/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/${base}`
        );
        
        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        return NextResponse.json(
            { error: 'Failed to fetch exchange rates' },
            { status: 500 }
        );
    }
}