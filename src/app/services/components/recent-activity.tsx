import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const RecentActivity = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-green-700 dark:text-green-500">
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            {
              date: "Today, 10:23 AM",
              action: "Disease scan completed for Tomato field",
            },
            {
              date: "Yesterday, 4:12 PM",
              action: "Irrigation schedule updated",
            },
            {
              date: "Apr 7, 9:45 AM",
              action: "New crop recommendation generated",
            },
            {
              date: "Apr 5, 2:30 PM",
              action: "Weather alert: Frost warning",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex justify-between pb-2 border-b border-gray-100 dark:border-gray-800"
            >
              <span className="text-gray-600 dark:text-gray-400 text-sm">
                {item.date}
              </span>
              <span>{item.action}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
