import Image from "next/image";

const About = () => {
  return (
    <section className="mb-16">
      <h1 className="text-4xl font-bold text-center mb-8 text-green-700 dark:text-green-500">
        About AgriSmart
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-500">
            Our Mission
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            AgriSmart is dedicated to empowering farmers with AI-driven insights
            and tools that make sustainable and profitable farming accessible to
            everyone, regardless of farm size or technical expertise.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We believe that by combining cutting-edge artificial intelligence
            with agricultural science, we can help address global food security
            challenges while promoting environmentally responsible farming
            practices.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Our team of agricultural experts, data scientists, and software
            engineers work together to create intuitive tools that translate
            complex data into actionable farming recommendations.
          </p>
        </div>
        <div className="relative h-[300px] rounded-2xl overflow-hidden">
          <Image
            src={"/about.jpg"}
            alt="Farmers using technology in field"
            fill
            className="object-fill"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
