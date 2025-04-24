import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const FAQ = () => {
  return (
    <div className="bg-white dark:bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-800 dark:text-green-400">
            Frequently Asked Questions
          </h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
            Find answers to common questions about AgriSmart
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {[
              {
                question: "How accurate is the crop recommendation system?",
                answer:
                  "Our crop recommendation system has been tested across various regions and soil types with an accuracy rate of 92%. The system continuously improves as it learns from more data and farmer feedback. For best results, we recommend providing accurate soil test results and location data.",
              },
              {
                question: "Do I need special equipment to use AgriSmart?",
                answer:
                  "No special equipment is required to use the basic features of AgriSmart. You can access the platform from any smartphone, tablet, or computer. For advanced features like soil moisture monitoring, compatible sensors can be purchased separately or integrated if you already own them.",
              },
              {
                question: "Is my data secure and private?",
                answer:
                  "Yes, we take data security and privacy very seriously. All your farm data is encrypted and stored securely. We never share your personal information with third parties without your explicit consent. You maintain full ownership of your data and can export or delete it at any time.",
              },
              {
                question: "Can AgriSmart work without internet connection?",
                answer:
                  "Yes, many features of AgriSmart are available offline through our Progressive Web App. You can access critical information, record data, and take photos in the field without internet connectivity. The data will automatically sync when you're back online.",
              },
              {
                question: "How much does AgriSmart cost?",
                answer:
                  "AgriSmart offers flexible pricing plans starting with a free tier that includes basic features. Premium plans start at $9.99/month for small farms and scale based on acreage and feature requirements. Enterprise solutions with custom integrations are also available. All plans come with a 30-day free trial.",
              },
            ].map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-green-100 dark:border-green-900/30"
              >
                <AccordionTrigger className="text-left text-lg font-medium py-4 hover:text-green-600 dark:hover:text-green-400">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
