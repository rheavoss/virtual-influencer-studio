import { NextResponse } from 'next/server';

export function middleware(request) {
  // Vercel Edge automatically provides geo data via request.geo
  // If undefined when testing locally, we default to 'US'
  const country = request.geo?.country || 'US';
  
  const url = request.nextUrl;

  // Geo-route Indian users to the Cashfree checkout (cheapest domestic + UPI AutoPay)
  if (country === 'IN') {
    url.pathname = '/checkout/cashfree';
    url.searchParams.set('currency', 'INR');
  } 
  // Geo-route International traffic to WHOP (creator-native subs)
  else {
    url.pathname = '/checkout/whop';
    url.searchParams.set('currency', 'USD');
  }

  // Rewrite the URL under the hood, so the user stays on the requested path visually
  return NextResponse.rewrite(url);
}

// Only run the middleware when the user visits the root /subscribe route
export const config = {
  matcher: '/subscribe/:path*',
};
