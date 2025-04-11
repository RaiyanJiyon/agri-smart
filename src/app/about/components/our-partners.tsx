import React from 'react';

const OurPartners = () => {
    return (
        <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-green-700 dark:text-green-500">Our Partners</h2>
        <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
          We collaborate with leading agricultural institutions, technology providers, and sustainability organizations
          to bring the best solutions to farmers worldwide.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {[1, 2, 3, 4].map((partner) => (
            <div
              key={partner}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-16 w-32 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                <span className="text-gray-400">Partner Logo</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
};

export default OurPartners;