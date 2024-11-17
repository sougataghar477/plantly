import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    // Parse the cartItems from the incoming request
    const { cart } = await req.json();

    // Prepare the line items for the Stripe Checkout session
    const lineItems = cart.map(item => ({
      price_data: {
        currency: 'usd',  // or your preferred currency
        product_data: {
          name: item.name,
          description: item.description,
        },
        unit_amount: item.price * 100, // Convert price to cents
      },
      quantity: 1,
    }));

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `https://plantly-rho.vercel.app/success`,
      cancel_url: `$https://plantly-rho.vercel.app/cancel`,
    });

    // Respond with the session ID
    return new Response(JSON.stringify({ id: session.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
