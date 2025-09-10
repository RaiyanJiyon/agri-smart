import React from 'react';
import Image from 'next/image';

export default function MarketPlace() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center space-y-4">
        <Image src="/svg/shopping-marketplace.svg" alt="Marketplace" width={100} height={100} />
        <h1 className="text-3xl md:text-4xl font-bold text-green-800 dark:text-green-400">
          Marketplace
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
          We are building a smarter marketplace for farm inputs and produce. Stay tuned for launches and updates.
        </p>
        <span className="inline-flex items-center rounded-full bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300 px-4 py-1 text-sm font-medium">
          Coming soon...
        </span>
      </div>
    </div>
  );
}