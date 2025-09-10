"use client";

import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";

const partnerImages = [
  "/partners/partner-1.webp",
  "/partners/partner-2.webp",
  "/partners/partner-3.webp",
  "/partners/partner-4.webp",
  "/partners/partner-5.webp",
  "/partners/partner-6.webp",
  "/partners/partner-7.webp",
  "/partners/partner-8.webp",
];

const Featured = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[hsl(var(--green-700))] dark:text-[hsl(var(--green-500))]">
            Our Partners & Collaborations
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
            We’re proud to collaborate with leading organizations that champion innovation
            and sustainability in agriculture.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          <Marquee pauseOnHover={true}>
          {partnerImages.map((partner) => (
            <div key={partner} className="transition-all duration-300 mx-6">
              <Image
                src={partner}
                alt="partner image"
                width={70}
                height={70}
                className="w-fit"
              />
            </div>
          ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default Featured;
