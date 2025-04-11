import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CommunityGuidelines = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-green-700 dark:text-green-500">
          Community Guidelines
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li>Be respectful and supportive of fellow farmers</li>
          <li>Share knowledge based on experience and research</li>
          <li>Cite sources when providing scientific information</li>
          <li>Keep discussions focused on agricultural topics</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default CommunityGuidelines;
