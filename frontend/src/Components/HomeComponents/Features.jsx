import React from 'react'
import { Fingerprint, ClipboardList, CheckCircle } from 'lucide-react';


export const Features = () => {
    const items = [
        {
          icon: <Fingerprint className="text-blue-600 w-10 h-10 mb-4" />,
          title: "Secure storage",
          description: "We store the vast majority of the digital assets in secure blockchain storage.",
          linkText: "Learn how to keep your funds safe",
        },
        {
          icon: <ClipboardList className="text-blue-600 w-10 h-10 mb-4" />,
          title: "Insurance",
          description: "Open Rides maintains crypto insurance and all USD cash balances are covered.",
          linkText: "Learn how your crypto is covered",
        },
        {
          icon: <CheckCircle className="text-blue-600 w-10 h-10 mb-4" />,
          title: "Best practices",
          description: "Open Rides marketplace supports a variety of the most popular digital currencies.",
          linkText: "How to implement best practices",
        },
      ];
    
      return (
        <div className="bg-white py-20 px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">The most trusted Ride sharing platform</h2>
          <p className="text-lg text-gray-500 mb-12">Here are a few reasons why you should choose Open Rides</p>
    
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3">
            {items.map((item, index) => (
              <div key={index} className="p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                <div>
                  {item.icon}
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-500 mb-4">{item.description}</p>
                  <a href="#" className="text-blue-600 hover:underline">{item.linkText} &rarr;</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    };
