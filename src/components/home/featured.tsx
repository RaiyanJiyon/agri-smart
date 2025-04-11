import Image from "next/image";
import React from "react";

const partnerImages = [
  "https://i.ibb.co.com/8g4Vbrn2/client1.webp",
  "https://i.ibb.co.com/KcgvFjbB/client2.webp",
  "https://i.ibb.co.com/CpvkdX3p/client3.webp",
  "https://i.ibb.co.com/wVM1Pvj/client-7.png",
  "https://i.ibb.co.com/8LGbz6pF/partner-8.png",
];

const Featured = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-[hsl(var(--green-700))] dark:text-[hsl(var(--green-500))]">
            Featured In
          </h2>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {partnerImages.map((partner) => (
            <div key={partner} className="transition-all duration-300">
              <div className="h-12 w-32 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                <Image
                  src={partner}
                  alt="partner image"
                  width={50}
                  height={50}
                  className="w-fit"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
