import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const PopularTopics = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-green-700 dark:text-green-500">
          Popular Topics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {[
            "Organic Farming",
            "Irrigation",
            "Pest Control",
            "Soil Health",
            "Climate Change",
            "Crop Rotation",
            "Sustainable Practices",
            "Market Prices",
          ].map((topic, i) => (
            <Badge
              key={i}
              variant="outline"
              className="bg-green-50 dark:bg-green-900/20 hover:bg-green-100 cursor-pointer"
            >
              {topic}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PopularTopics;
