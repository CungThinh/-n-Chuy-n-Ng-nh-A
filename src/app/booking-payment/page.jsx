'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Load your publishable key from environment variables
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function BookingPaymentComponent() {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [country, setCountry] = useState('United States');
  const [zip, setZip] = useState('');

  // Fetch booking details from localStorage or other storage mechanisms
  const bookingDetails = JSON.parse(localStorage.getItem('bookingDetails')) || {};
  const totalPrice = 1000000; // Example total price (You can dynamically calculate it based on your data)

  const handlePayment = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    if (!stripe || !elements) {
      setErrorMessage('Stripe has not loaded yet.');
      return;
    }

    try {
      // Call the backend API to create a Stripe session (or create a PaymentIntent if using Payment Intents API)
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingDetails,
          totalPrice,
          email,
          cardholderName,
          country,
          zip,
        }),
      });

      const { clientSecret } = await response.json();

      // Use the clientSecret to confirm the payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: cardholderName,
            email: email,
            address: {
              country: country,
              postal_code: zip,
            },
          },
        },
      });

      if (result.error) {
        setErrorMessage(result.error.message);
        setLoading(false);
      } else if (result.paymentIntent.status === 'succeeded') {
        // Redirect to success page
        router.push('/success');
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage('Error processing payment. Please try again.');
    }
  };

  return (
    <div className="payment-page" style={{padding:'80px'}}>
      <h1>Pay with Card</h1>

      <form onSubmit={handlePayment} className="payment-form">
        {/* Email Field */}
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your-email@example.com"
          required
          className="form-input"
        />

        {/* CardElement for Card Information */}
        <label>Card Information</label>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />

        {/* Cardholder Name Field */}
        <label>Cardholder Name</label>
        <input
          type="text"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          placeholder="Full name on card"
          required
          className="form-input"
        />

        {/* Country/Region Field */}
        <label>Country or Region</label>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="form-select"
          required
        >
          <option value="United States">United States</option>
          <option value="Vietnam">Vietnam</option>
          <option value="United Kingdom">United Kingdom</option>
          {/* Add more countries as needed */}
        </select>

        {/* ZIP Code Field */}
        <label>ZIP Code</label>
        <input
          type="text"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          placeholder="ZIP"
          required
          className="form-input"
        />

        {/* Error Message */}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!stripe || loading}
          className="bg-blue-500 text-white px-6 py-3 rounded-md mt-4"
        >
          {loading ? 'Processing...' : 'Pay'}
        </button>
      </form>
    </div>
  );
}

export default function BookingPayment() {
  return (
    <Elements stripe={stripePromise}>
      <BookingPaymentComponent />
    </Elements>
  );
}
