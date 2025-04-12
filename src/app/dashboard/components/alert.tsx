import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import React from "react";

interface AlertProps {
  title: string;
  description: string;
}

const Alert = ({ title, description }: AlertProps) => {
  return (
    <Card className="mb-8 border-orange-200 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-900/30">
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
          <CardTitle className="text-lg text-orange-700 dark:text-orange-400">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-orange-700 dark:text-orange-400">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default Alert;