import React, { useState } from 'react';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import { X, Copy, CreditCard } from 'lucide-react';
import SuccessPopup from './SuccessPopup';

interface PaymentPopupProps {
  onClose: () => void;
  email: string;
  selectedPlan: {
    name: string;
    storage: string;
    price: string;
  };
}

const PaymentPopup: React.FC<PaymentPopupProps> = ({ onClose, email, selectedPlan }) => {
  const [transactionId, setTransactionId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const upiId = 'vstuniverse@paytm';

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    // alert('UPI ID copied!');
  };

  const handleConfirmPayment = async () => {
    if (!transactionId.trim()) return;
    setIsSubmitting(true);

    try {
      // Check for duplicate transaction ID
      const { data: existing } = await axios.get(`http://localhost:3500/payments?transactionId=${transactionId.trim()}`);
      if (existing.length > 0) {
        alert('❌ Transaction ID already used.');
        setIsSubmitting(false);
        return;
      }

      const orderId = `ORD-${Date.now()}`;
      const cleanedPrice = selectedPlan.price.replace(/[₹,]/g, '').trim();

      const paymentData = {
        email,
        plan: selectedPlan.name,
        storage: selectedPlan.storage,
        price: selectedPlan.price,
        transactionId: transactionId.trim(),
        timestamp: new Date().toISOString()
      };

      await axios.post('http://localhost:3500/payments', paymentData);

      // ✅ Send email using EmailJS
      await emailjs.send(
        'service_6m2vzqc',      // Replace with your actual EmailJS service ID
        'template_1n93yzk',     // Replace with your actual EmailJS template ID
        {
          email: email,
          order_id: orderId,
          orders: [
            {
              name: selectedPlan.name,
              units: 1,
              price: cleanedPrice,
              timestamp: new Date().toLocaleString('en-IN', {
                timeZone: 'Asia/Kolkata',
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })
            }
          ],
          cost: {
            shipping: 0,
            tax: 0,
            total: cleanedPrice
          }
        },
        'eWJJPMNBSDMXW2WPK'        // Replace with your actual EmailJS public key
      );

      setTransactionId('');
      setShowSuccessPopup(true); // Show success popup
    } catch (err) {
      console.error('Payment or email failed:', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccessPopup(false);
    onClose(); // close payment popup after success
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center px-4 sm:px-6 py-6 sm:py-8">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto relative border border-gray-700 text-white p-6 sm:p-8">

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex flex-col items-center mb-6 mt-2">
            <div className="bg-yellow-400 p-2 rounded-full mb-2">
              <CreditCard className="w-6 h-6 text-black" />
            </div>
            <h2 className="text-xl font-bold text-white">Complete Payment</h2>
            <p className="text-sm text-gray-400 text-center">Scan QR or use UPI ID to pay</p>
          </div>

          {/* Order Summary */}
          <div className="bg-[#131A22] rounded-xl p-4 mb-6 border border-gray-700">
            <h3 className="text-yellow-400 font-bold text-sm mb-4">Order Summary</h3>
            <div className="flex justify-between text-sm text-gray-400 mb-1">
              <span>Package:</span>
              <span className="text-white">{selectedPlan.name}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-400 mb-1">
              <span>Storage:</span>
              <span className="text-white">{selectedPlan.storage}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-400 mb-3">
              <span>Email:</span>
              <span className="text-white break-all">{email}</span>
            </div>
            <hr className="border-gray-700 my-2" />
            <div className="flex justify-between font-semibold text-sm mt-3">
              <span className="text-gray-400">Total Amount:</span>
              <span className="text-yellow-400">{selectedPlan.price}</span>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex justify-center mb-4">
            <img src="src/Images/scanner.png" alt="QR Code" className="w-40 h-40 rounded-lg" />
          </div>
          <p className="text-center text-sm text-gray-400 mb-4">Scan with any UPI app to pay</p>

          {/* UPI ID */}
          <div className="bg-gray-800 rounded-md px-3 py-2 flex items-center justify-between mb-4 border border-gray-700">
            <span className="text-sm text-blue-400 font-mono">{upiId}</span>
            <button onClick={handleCopy} className="text-sm text-white hover:text-yellow-400">
              <Copy className="w-4 h-4" />
            </button>
          </div>

          {/* Transaction ID Input */}
          <input
            type="text"
            placeholder="Enter transaction ID"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30"
          />

          {/* Confirm Button */}
          <button
            onClick={handleConfirmPayment}
            disabled={!transactionId.trim() || isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Processing...' : 'Confirm Payment'}
          </button>
        </div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && <SuccessPopup     onClose={handleCloseSuccess}
    plan={selectedPlan.name}
    amount={selectedPlan.price}
    transactionId={transactionId}
 />}
    </>
  );
};

export default PaymentPopup;
