import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Avatar, AvatarFallback } from "../../../components/ui/avatar";
import Image from "next/image";

const OurTeam = () => {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-center mb-12 text-green-700 dark:text-green-500">
        Our Team
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {[
          {
            name: "Dr. Emily Chen",
            role: "Founder & CEO",
            image: "https://i.ibb.co.com/3YBHKxy9/profile-picture.jpg",
            bio: "Agricultural scientist with 15 years of experience in sustainable farming systems.",
          },
          {
            name: "Michael Rodriguez",
            role: "CTO",
            image: "https://i.ibb.co.com/0pd6sLXS/person3.png",
            bio: "AI specialist focused on applying machine learning to agricultural challenges.",
          },
          {
            name: "Priya Sharma",
            role: "Head of Agronomy",
            image: "https://i.ibb.co.com/chqDn1CZ/person1.png",
            bio: "Expert in crop science and soil health with a passion for regenerative agriculture.",
          },
          {
            name: "James Wilson",
            role: "Lead Engineer",
            image: "https://i.ibb.co.com/WvFwDtmN/person2.png",
            bio: "Software architect specializing in IoT systems and data visualization.",
          },
        ].map((member, i) => (
          <Card key={i} className="overflow-hidden p-0">
            <div className="bg-green-100 dark:bg-green-900/30 h-32 flex items-center justify-center m-0 p-0">
              <Avatar className="h-24 w-24 border-4 border-white dark:border-gray-800">
                <AvatarFallback className="text-2xl bg-green-600 text-white">
                  <Image
                    src={member.image}
                    alt={`${member.name} image`}
                    width={96}
                    height={96}
                  />
                </AvatarFallback>
              </Avatar>
            </div>
            <CardHeader className="pt-0 pb-0">
              <CardTitle className="text-center text-green-700 dark:text-green-500">
                {member.name}
              </CardTitle>
              <CardDescription className="text-center">
                {member.role}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-center text-gray-600 dark:text-gray-300 pb-6">
                {member.bio}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default OurTeam;
