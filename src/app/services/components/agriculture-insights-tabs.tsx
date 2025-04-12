import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CropRecommendationForm from "./crop-recommendation-form";
import DiseaseDetectionUpload from "./disease-detection-upload";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart } from "lucide-react";

const AgricultureInsightsTabs = () => {
  return (
    <Tabs defaultValue="crops" className="w-full mb-8">
      <TabsList className="grid grid-cols-3 mb-8">
        <TabsTrigger value="crops">Crop Planning</TabsTrigger>
        <TabsTrigger value="disease">Disease Detection</TabsTrigger>
        <TabsTrigger value="market">Market Insights</TabsTrigger>
      </TabsList>

      <TabsContent value="crops">
        <CropRecommendationForm />
      </TabsContent>

      <TabsContent value="disease">
        <DiseaseDetectionUpload />
      </TabsContent>

      <TabsContent value="market">
        <Card>
          <CardHeader>
            <CardTitle className="text-green-700 dark:text-green-500">
              Market Price Forecast
            </CardTitle>
            <CardDescription>
              Predicted prices for the next 3 months based on historical data
              and market trends
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <div className="h-full flex items-center justify-center text-gray-500">
              <BarChart className="h-16 w-16 opacity-50" />
              <p className="ml-4">Market price chart will appear here</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AgricultureInsightsTabs;
