import React, { useState } from 'react';
import { CheckCircle2, Package, Mail, User, Building2 } from 'lucide-react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

type Plan = 'basic' | 'pro' | 'enterprise';

interface FormData {
  fullName: string;
  email: string;
  company: string;
  plan: Plan;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    company: '',
    plan: 'basic'
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const plans = [
    {
      type: 'basic',
      name: 'Basic',
      price: '$9.99',
      features: ['Core Features', 'Email Support', '5 Projects']
    },
    {
      type: 'pro',
      name: 'Professional',
      price: '$29.99',
      features: ['All Basic Features', 'Priority Support', 'Unlimited Projects', 'API Access']
    },
    {
      type: 'enterprise',
      name: 'Enterprise',
      price: '$99.99',
      features: ['All Pro Features', '24/7 Support', 'Custom Integration', 'Dedicated Account Manager']
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      // Add timestamp to the data
      const subscriptionData = {
        ...formData,
        createdAt: new Date(),
      };

      // Add document to Firestore
      await addDoc(collection(db, 'subscriptions'), subscriptionData);
      setSubmitted(true);
    } catch (err) {
      setError('Failed to submit form. Please try again.');
      console.error('Error submitting form:', err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-6">
            Your subscription request has been received. We'll contact you shortly with next steps.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Package className="mx-auto h-12 w-12 text-blue-600" />
          <h1 className="mt-4 text-4xl font-bold text-gray-900">Subscribe to Our Software</h1>
          <p className="mt-2 text-lg text-gray-600">Choose the perfect plan for your needs</p>
        </div>

        {error && (
          <div className="max-w-xl mx-auto mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.type}
              className={`bg-white rounded-lg shadow-lg p-6 ${
                formData.plan === plan.type ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{plan.name}</h3>
              <p className="text-3xl font-bold text-gray-900 mb-6">{plan.price}<span className="text-sm font-normal text-gray-500">/month</span></p>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setFormData(prev => ({ ...prev, plan: plan.type as Plan }))}
                className={`w-full py-2 px-4 rounded-lg transition-colors ${
                  formData.plan === plan.type
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Select Plan
              </button>
            </div>
          ))}
        </div>

        <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <User className="w-4 h-4 mr-1" />
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <Mail className="w-4 h-4 mr-1" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="john@company.com"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <Building2 className="w-4 h-4 mr-1" />
                Company Name
              </label>
              <input
                type="text"
                name="company"
                required
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Company Inc."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Subscription Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;