import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Check, Sparkles } from 'lucide-react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUsage?: number;
  freeQueriesRemaining?: number;
}

export function SubscriptionModal({ isOpen, onClose, currentUsage = 0, freeQueriesRemaining = 10000 }: SubscriptionModalProps) {
  if (!isOpen) return null;

  const handleSubscribe = async (priceId: string) => {
    const stripe = await stripePromise;
    if (!stripe) return;

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      const session = await response.json();
      await stripe.redirectToCheckout({ sessionId: session.id });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#0f1623] rounded-xl p-8 max-w-3xl w-full mx-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Choose Your Plan</h2>
          <p className="text-gray-400">Unlock the full potential of Aesthetic Intelligence</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Superficial Plan */}
          <div className="bg-[#1e293b] p-6 rounded-xl border border-gray-800">
            <h3 className="text-xl font-semibold mb-2">Superficial</h3>
            <p className="text-3xl font-bold mb-1">£0</p>
            <p className="text-sm text-gray-400 mb-4">Entry level access</p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-300">10K Units</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-300">Basic response depth</span>
              </div>
              <div className="flex items-start gap-2 text-gray-500">
                <span className="w-4 h-4 mt-1 flex-shrink-0">×</span>
                <span className="text-sm">No Storage Space</span>
              </div>
            </div>

            <p className="text-sm text-gray-400 mb-4">
              {freeQueriesRemaining} units remaining
            </p>
          </div>

          {/* Deep Plan */}
          <div className="bg-[#1e293b] p-6 rounded-xl border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            <div className="flex items-center gap-2 text-blue-400 mb-2">
              <span className="text-xl font-semibold">Deep</span>
              <span className="px-2 py-0.5 text-xs bg-blue-500/20 rounded-full">Popular</span>
            </div>
            <p className="text-3xl font-bold mb-1">£10</p>
            <p className="text-sm text-gray-400 mb-4">per month</p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-300">1M Units per month</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-300">Storage Space</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-300">Priority support</span>
              </div>
            </div>

            <button
              onClick={() => handleSubscribe('price_deep_monthly')}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
            >
              Subscribe Now
            </button>
          </div>

          {/* Volume Plan */}
          <div className="bg-[#1e293b] p-6 rounded-xl border border-gray-800 relative overflow-hidden">
            <div className="absolute top-3 right-3">
              <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Volume</h3>
            <p className="text-3xl font-bold mb-1">Coming Soon</p>
            <p className="text-sm text-gray-400 mb-4">Multi-clinic solution</p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-300">Everything in Deep</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-300">Multi-clinic access</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-300">Custom protocols</span>
              </div>
            </div>

            <button
              disabled
              className="w-full py-2 bg-gray-700 cursor-not-allowed rounded-lg text-gray-400"
            >
              Coming Soon
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-8 text-gray-400 hover:text-gray-300 transition-colors duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
}