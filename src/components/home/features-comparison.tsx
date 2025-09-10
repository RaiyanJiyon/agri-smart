"use client";

import { CheckCircle2, XCircle } from "lucide-react";

type ComparisonRow = {
  feature: string;
  agrismart: boolean | string;
  traditional: boolean | string;
  others: string;
};

const comparisonData: ComparisonRow[] = [
  {
    feature: "AI-Powered Recommendations",
    agrismart: true,
    traditional: false,
    others: "Limited",
  },
  {
    feature: "Real-time Disease Detection",
    agrismart: true,
    traditional: false,
    others: "Some",
  },
  {
    feature: "Hyperlocal Weather Forecasting",
    agrismart: true,
    traditional: false,
    others: "Basic",
  },
  {
    feature: "Market Price Predictions",
    agrismart: true,
    traditional: false,
    others: "Limited",
  },
  {
    feature: "Community Knowledge Sharing",
    agrismart: true,
    traditional: "Limited",
    others: "Some",
  },
  {
    feature: "Direct Marketplace Access",
    agrismart: true,
    traditional: false,
    others: "Limited",
  },
  {
    feature: "Offline Functionality",
    agrismart: true,
    traditional: true,
    others: "Rare",
  },
];

const renderCellContent = (value: boolean | string) => {
  if (value === true) {
    return <CheckCircle2 className="h-6 w-6 text-green-500 mx-auto" />;
  }
  if (value === false) {
    return <XCircle className="h-6 w-6 text-red-500 mx-auto" />;
  }
  return value;
};

const FeaturesComparison = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-800 dark:text-green-400">
          Feature Comparison
        </h2>
        <p className="text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
          Compare AgriSmart with traditional methods and other platforms across
          key capabilities to see where it stands out.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-green-100 dark:bg-green-900/30">
              <th className="p-4 text-left text-green-800 dark:text-green-400 font-bold">
                Features
              </th>
              <th className="p-4 text-center text-green-800 dark:text-green-400 font-bold">
                AgriSmart
              </th>
              <th className="p-4 text-center text-gray-600 dark:text-gray-300 font-bold">
                Traditional Methods
              </th>
              <th className="p-4 text-center text-gray-600 dark:text-gray-300 font-bold">
                Other Platforms
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row, index) => (
              <tr
                key={index}
                className="border-b border-green-100 dark:border-green-900/30"
              >
                <td className="p-4 text-left font-medium">{row.feature}</td>
                <td className="p-4 text-center">
                  {renderCellContent(row.agrismart)}
                </td>
                <td className="p-4 text-center text-gray-600 dark:text-gray-300">
                  {renderCellContent(row.traditional)}
                </td>
                <td className="p-4 text-center text-gray-600 dark:text-gray-300">
                  {row.others}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeaturesComparison;
