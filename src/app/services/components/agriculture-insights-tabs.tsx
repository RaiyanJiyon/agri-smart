import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CropPlanning from "./crop-planning";
import DiseaseDetection from "./disease-detection";
import MarketInsights from "./market-insights";

const AgricultureInsightsTabs = () => {
  return (
    <Tabs defaultValue="crops" className="w-full mb-8">
      <TabsList className="grid grid-cols-3 mb-8">
        <TabsTrigger value="crops">Crop Planning</TabsTrigger>
        <TabsTrigger value="disease">Disease Detection</TabsTrigger>
        <TabsTrigger value="market">Market Insights</TabsTrigger>
      </TabsList>

      <TabsContent value="crops">
        <CropPlanning />
      </TabsContent>

      <TabsContent value="disease">
        <DiseaseDetection />
      </TabsContent>

      <TabsContent value="market">
       <MarketInsights />
      </TabsContent>
    </Tabs>
  );
};

export default AgricultureInsightsTabs;
