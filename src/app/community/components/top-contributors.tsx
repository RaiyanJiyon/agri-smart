import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const TopContributors = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-green-700 dark:text-green-500">
          Top Contributors
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {[
          {
            name: "Dr. Sarah Johnson",
            role: "Agricultural Scientist",
            image: "https://i.ibb.co.com/chqDn1CZ/person1.png",
            posts: 142,
          },
          {
            name: "Miguel Fernandez",
            role: "Organic Farmer",
            image: "https://i.ibb.co.com/0pd6sLXS/person3.png",
            posts: 98,
          },
          { 
            name: "Aisha Patel", 
            role: "Soil Expert", 
            image: "https://i.ibb.co.com/WvFwDtmN/person2.png", 
            posts: 76 
          },
        ].map((contributor, i) => (
          <div key={i} className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-green-100 text-green-700">
                <Image 
                src={contributor.image}
                alt={`${contributor.name} image`}
                width={96}
                height={96}
                />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{contributor.name}</p>
              <p className="text-xs text-gray-500">{contributor.role}</p>
            </div>
            <Badge variant="outline" className="ml-auto">
              {contributor.posts}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TopContributors;
