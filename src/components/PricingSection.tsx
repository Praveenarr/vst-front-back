import React, { useState } from 'react';
import { Check, Star, X } from 'lucide-react';
import TermsContent from './TermsContent';
import PaymentPopup from './PaymentPopup';

const PricingSection: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState('pro'); // Default to Pro Pack (4TB)
  const [email, setEmail] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  const plans = [
    { id: 'standard', name: 'Standard Pack', storage: '1TB', originalPrice: null, price: '₹ 9,999', popular: false },
    { id: 'studio', name: 'Studio Pack', storage: '2TB', originalPrice: '₹ 19,999', price: '₹ 18,999', popular: false },
    { id: 'pro', name: 'Pro Pack', storage: '4TB', originalPrice: '₹ 39,999', price: '₹ 35,999', popular: true },
    { id: 'ultimate', name: 'Ultimate Pack', storage: '8TB', originalPrice: '₹ 79,999', price: '₹ 63,999', popular: false }
  ];

  const currentPlan = plans.find(p => p.id === selectedPlan);

  return (
    <>
      <section className="py-12 sm:py-16 lg:py-20 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Choose Your <span className="text-yellow-400">Perfect Package</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg">
              Select the plan that fits your music production needs
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl">
            <div className="space-y-4 sm:space-y-6">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedPlan === plan.id ? 'border-yellow-400 bg-yellow-400/10' : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                  } ${plan.popular ? 'ring-2 ring-yellow-400/50' : ''}`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold flex items-center">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        selectedPlan === plan.id ? 'border-yellow-400 bg-yellow-400' : 'border-gray-400'
                      }`}>
                        {selectedPlan === plan.id && <Check className="w-3 h-3 sm:w-4 sm:h-4 text-black" />}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">
                        {plan.name}: {plan.storage}
                      </h3>
                    </div>
                    <div className="text-left sm:text-right ml-8 sm:ml-0">
                      {plan.originalPrice && (
                        <div className="text-gray-400 line-through text-sm">{plan.originalPrice}</div>
                      )}
                      <div className="text-xl sm:text-2xl font-bold text-yellow-400">{plan.price}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
              <div>
                <label className="block text-white text-base sm:text-lg font-semibold mb-2 sm:mb-3">
                  Enter your email:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  className="w-full px-3 sm:px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 text-sm sm:text-base"
                />
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 bg-gray-700 border-gray-600 rounded focus:ring-yellow-400 mt-0.5 flex-shrink-0"
                />
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  I agree to{' '}
                  <button
                    type="button"
                    onClick={() => setShowTermsModal(true)}
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    terms & conditions
                  </button>
                </p>
              </div>

              <button
                disabled={!email || !agreedToTerms}
                onClick={() => setShowPaymentPopup(true)}
                className="w-full py-3 sm:py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg sm:text-xl rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-2xl hover:shadow-yellow-400/25"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Terms & Conditions Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl relative p-6">
            <button
              onClick={() => setShowTermsModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <X className="w-6 h-6" />
            </button>
            <TermsContent
              onAgree={() => {
                setAgreedToTerms(true);
                setShowTermsModal(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Payment Popup */}
      {showPaymentPopup && currentPlan && (
        <PaymentPopup
          onClose={() => setShowPaymentPopup(false)}
          email={email}
          selectedPlan={currentPlan}
        />
      )}
    </>
  );
};

export default PricingSection;
