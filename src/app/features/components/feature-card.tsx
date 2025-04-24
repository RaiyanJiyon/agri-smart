import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const FeatureCard = ({icon, title, description}: {icon: React.ReactNode, title: string, description: string}) => {
  return (
    <Card className="border-2 border-green-100 dark:border-green-900/30 shadow-md hover:shadow-lg transition-all duration-300 hover:border-green-300 dark:hover:border-green-700 h-full">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="flex-shrink-0">{icon}</div>
        <CardTitle className="text-xl text-green-700 dark:text-green-500">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Link
          href="#"
          className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm font-medium flex items-center"
        >
          Learn more
          <ArrowRight className="ml-1 h-3 w-3" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default FeatureCard;
