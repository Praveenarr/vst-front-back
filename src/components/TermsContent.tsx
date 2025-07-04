import React from 'react';
import {
  Shield,
  FileText,
  Truck,
  Settings,
  CheckCircle,
  AlertTriangle,
  Mail,
  Monitor
} from 'lucide-react';

const sections = [
  {
    id: 'software-content',
    title: 'Software and Content',
    icon: FileText,
    items: [
      'All software, plugins, and libraries provided are modified versions of original products.',
      'We do not guarantee the authenticity or legitimacy of these modified versions.'
    ]
  },
  {
    id: 'warranty-liability',
    title: 'Warranty and Liability',
    icon: Shield,
    items: [
      'Warranty claims are only valid for errors caused by automatic issues.',
      'We are not responsible for any errors caused by:',
      {
        subItems: [
          'User misuse or negligence',
          'Third-party actions or interference',
          'Compatibility issues with other software or hardware'
        ]
      },
      'By using our services, you acknowledge that you have read, understood, and agree to these terms and conditions.'
    ]
  },
  {
    id: 'order-delivery',
    title: 'Order Confirmation and Delivery',
    icon: Truck,
    items: [
      'Once your order is processed, you will receive a confirmation email as a reference.',
      'Delivery and packaging charges will apply for both domestic and international shipments, based on your location.'
    ]
  },
  {
    id: 'installation-support',
    title: 'Installation Support',
    icon: Settings,
    items: [
      'After receiving your package, our team will assist with installation via remote desktop software, ensuring a seamless setup experience.'
    ]
  }
];

interface Props {
  onAgree?: () => void; // optional callback from parent
}

const TermsContent: React.FC<Props> = ({ onAgree }) => {
  return (
    <div className="space-y-8">
      {/* Important Notice */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-amber-100 rounded-xl flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Important Notice</h2>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              These terms and conditions govern your use of our software services and products.
              By accessing or using our services, you agree to be bound by these terms.
            </p>
          </div>
        </div>
      </div>

      {/* Section Blocks */}
      {sections.map((section, index) => {
        const Icon = section.icon;
        return (
          <div
            key={section.id}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-center space-x-4 mb-4 sm:mb-6">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
                  {index + 1}. {section.title}
                </h2>
              </div>

              <div className="space-y-4">
                {section.items.map((item, i) => {
                  if (typeof item === 'string') {
                    return (
                      <div key={i} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{item}</p>
                      </div>
                    );
                  } else if ('subItems' in item) {
                    return (
                      <div key={i} className="ml-6">
                        <div className="bg-gray-50 rounded-xl p-4 sm:p-6 border-l-4 border-blue-200">
                          <h4 className="font-semibold text-gray-900 mb-3">Exclusions:</h4>
                          <ul className="space-y-2">
                            {item.subItems.map((subItem: string, subIndex: number) => (
                              <li key={subIndex} className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2.5 flex-shrink-0"></div>
                                <span className="text-gray-700 text-sm sm:text-base">{subItem}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        );
      })}

      {/* Bottom Agree Button */}
      <div className="text-right pt-4">
        <button
          onClick={onAgree}
          className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-lg shadow-md hover:scale-105 transition-all duration-300"
        >
          I Agree Terms and Conditions
        </button>
      </div>
    </div>
  );
};

export default TermsContent;
