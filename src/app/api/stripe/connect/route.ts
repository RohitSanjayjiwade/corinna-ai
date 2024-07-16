import { currentUser } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  typescript: true,
  apiVersion: '2024-04-10',
})

export async function GET() {
  try {
    const user = await currentUser()
    if (!user) return new NextResponse('User not authenticated')

    
  } catch (error) {
    console.error(
      'An error occurred when calling the Stripe API to create an account:',
      error
    )
  }
}
