import React from "react";

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
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="grayscale hover:grayscale-0 transition-all duration-300"
            >
              <div className="h-12 w-32 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  Media Logo
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
