import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const TaskScheduler = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-green-700 dark:text-green-500">
          Task Scheduler
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            {
              date: "Today",
              task: "Apply fertilizer to corn field",
              status: "Pending",
            },
            {
              date: "Tomorrow",
              task: "Check irrigation system",
              status: "Scheduled",
            },
            {
              date: "Apr 10",
              task: "Harvest tomatoes",
              status: "Scheduled",
            },
            {
              date: "Apr 12",
              task: "Soil testing for wheat field",
              status: "Scheduled",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-800"
            >
              <div>
                <div className="font-medium">{item.task}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {item.date}
                </div>
              </div>
              <Button variant="outline" size="sm">
                {item.status}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskScheduler;
