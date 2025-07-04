// src/components/SuccessPopup.tsx
import React from 'react';
import { CheckCircle, Mail, X, Download } from 'lucide-react';

interface Props {
  plan: string;
  amount: string;
  transactionId: string;
  onClose: () => void;
}

const SuccessPopup: React.FC<Props> = ({ plan, amount, transactionId, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0f1115] text-white rounded-2xl p-6 sm:p-8 w-full max-w-md relative border border-gray-700">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-500 rounded-full p-4">
            <CheckCircle className="text-white w-8 h-8" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-2">Payment Successful!</h2>
        <p className="text-gray-400 text-center mb-6">
          Your order has been confirmed successfully.
        </p>

        {/* Email Sent Notice */}
        <div className="bg-green-950 border border-green-800 p-4 rounded-xl flex items-start space-x-3 mb-6">
          <Mail className="text-green-500 w-5 h-5 mt-1" />
          <div>
            <p className="text-green-400 font-semibold">Email Sent Successfully</p>
            <p className="text-sm text-green-200">
              A confirmation email has been sent to your email address with order details and next steps.
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-[#131A22] rounded-xl p-4 mt-4 border border-gray-700">
  <div className="text-sm text-gray-400 mb-1">Package:</div>
  <div className="text-white text-sm font-medium mb-2">{plan}</div>

  <div className="text-sm text-gray-400 mb-1">Amount Paid:</div>
  <div className="text-green-400 text-sm font-semibold mb-2">{amount}</div>

  <div className="text-sm text-gray-400 mb-1">Transaction ID:</div>
  <div className="text-white text-sm break-all max-w-full">{transactionId}</div>
</div>


        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-green-500 hover:bg-green-600 text-black font-bold rounded-lg flex items-center justify-center space-x-2 transition"
        >
          <Download className="w-5 h-5" />
          <span>Close</span>
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;
