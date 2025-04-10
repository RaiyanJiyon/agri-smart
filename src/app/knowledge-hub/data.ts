export type ResourceType = "article" | "video" | "guide" | "infographic" | "tool" | "webinar" | "case-study"

export type ResourceCategory =
  | "crop-management"
  | "livestock"
  | "soil-health"
  | "pest-control"
  | "irrigation"
  | "organic-farming"
  | "technology"
  | "market-insights"
  | "climate-smart"
  | "equipment"

export type Resource = {
  id: string
  title: string
  description: string
  type: ResourceType
  category: ResourceCategory
  thumbnail: string
  author?: string
  authorRole?: string
  datePublished: string
  readTime?: string
  videoLength?: string
  featured?: boolean
  popular?: boolean
  tags: string[]
  url: string
  previewContent?: string
}

export type CategoryInfo = {
  id: ResourceCategory
  name: string
  description: string
  icon: string
  color: string
}

export const categories: CategoryInfo[] = [
  {
    id: "crop-management",
    name: "Crop Management",
    description: "Techniques for improving crop yield and quality",
    icon: "Sprout",
    color: "green",
  },
  {
    id: "livestock",
    name: "Livestock Care",
    description: "Best practices for animal health and productivity",
    icon: "Beef",
    color: "amber",
  },
  {
    id: "soil-health",
    name: "Soil Health",
    description: "Maintaining and improving soil fertility",
    icon: "Mountain",
    color: "brown",
  },
  {
    id: "pest-control",
    name: "Pest & Disease Control",
    description: "Identifying and managing agricultural pests and diseases",
    icon: "Bug",
    color: "red",
  },
  {
    id: "irrigation",
    name: "Water & Irrigation",
    description: "Water conservation and efficient irrigation systems",
    icon: "Droplets",
    color: "blue",
  },
  {
    id: "organic-farming",
    name: "Organic Farming",
    description: "Chemical-free farming methods and certification",
    icon: "Leaf",
    color: "emerald",
  },
  {
    id: "technology",
    name: "Farm Technology",
    description: "Modern technologies for efficient farming",
    icon: "Cpu",
    color: "indigo",
  },
  {
    id: "market-insights",
    name: "Market Insights",
    description: "Market trends, pricing, and selling strategies",
    icon: "BarChart",
    color: "purple",
  },
  {
    id: "climate-smart",
    name: "Climate-Smart Farming",
    description: "Adapting to climate change and reducing environmental impact",
    icon: "Cloud",
    color: "sky",
  },
  {
    id: "equipment",
    name: "Equipment & Tools",
    description: "Guides for farm equipment selection and maintenance",
    icon: "Tractor",
    color: "orange",
  },
]

export const resources: Resource[] = [
  {
    id: "res-001",
    title: "Maximizing Wheat Yields: A Comprehensive Guide",
    description:
      "Learn proven techniques to increase your wheat yields while maintaining soil health and reducing input costs.",
    type: "article",
    category: "crop-management",
    thumbnail: "https://i.ibb.co.com/C5pzVhTP/image.jpg",
    author: "Dr. Rajesh Kumar",
    authorRole: "Agricultural Scientist",
    datePublished: "2023-11-15",
    readTime: "12 min",
    featured: true,
    tags: ["wheat", "yield optimization", "sustainable farming"],
    url: "/knowledge-hub/articles/maximizing-wheat-yields",
    previewContent:
      "Wheat is one of India's most important food crops, providing essential nutrition to millions. However, many farmers struggle to achieve optimal yields due to various challenges including soil degradation, water scarcity, and pest pressures. This comprehensive guide explores proven techniques that can help you maximize your wheat yields while maintaining long-term soil health and reducing input costs...",
  },
  {
    id: "res-002",
    title: "Drip Irrigation Systems: Installation and Maintenance",
    description:
      "A step-by-step video guide on setting up and maintaining efficient drip irrigation systems for small to medium farms.",
    type: "video",
    category: "irrigation",
    thumbnail: "https://i.ibb.co.com/4gsV7JK4/Drip-Irrigation-Systems-Installation-and-Maintenance.jpg",
    author: "Priya Sharma",
    authorRole: "Irrigation Specialist",
    datePublished: "2023-10-22",
    videoLength: "18:45",
    popular: true,
    tags: ["water conservation", "drip irrigation", "installation guide"],
    url: "/knowledge-hub/videos/drip-irrigation-systems",
  },
  {
    id: "res-003",
    title: "Seasonal Crop Calendar for Northern India",
    description:
      "Interactive calendar showing optimal planting and harvesting times for major crops in Northern India.",
    type: "tool",
    category: "crop-management",
    thumbnail: "https://i.ibb.co.com/wryw8jT4/Seasonal-Crop-Calendar-for-Northern-India.jpg",
    datePublished: "2023-09-05",
    featured: true,
    tags: ["seasonal planning", "crop calendar", "northern india"],
    url: "/knowledge-hub/tools/seasonal-crop-calendar",
  },
  {
    id: "res-004",
    title: "Identifying and Managing Tomato Diseases",
    description: "Visual guide to common tomato diseases with organic and conventional treatment options.",
    type: "infographic",
    category: "pest-control",
    thumbnail: "https://i.ibb.co.com/mrQNbgTz/Identifying-and-Managing-Tomato-Diseases.jpg",
    author: "Plant Pathology Dept, Agricultural University",
    datePublished: "2023-08-18",
    popular: true,
    tags: ["tomato", "disease management", "plant health"],
    url: "/knowledge-hub/infographics/tomato-diseases",
  },
  {
    id: "res-005",
    title: "Soil Testing: Why, When, and How",
    description:
      "Learn the importance of regular soil testing and how to interpret results for better crop management decisions.",
    type: "guide",
    category: "soil-health",
    thumbnail: "https://i.ibb.co.com/rKqbN1Mt/Soil-Testing-Why-When-and-How.jpg",
    author: "Dr. Amita Patel",
    authorRole: "Soil Scientist",
    datePublished: "2023-07-30",
    readTime: "15 min",
    tags: ["soil testing", "nutrient management", "soil health"],
    url: "/knowledge-hub/guides/soil-testing",
    previewContent:
      "Regular soil testing is one of the most valuable practices a farmer can adopt, yet it remains underutilized. Understanding your soil's composition, nutrient levels, and pH is fundamental to making informed decisions about fertilization, crop selection, and overall farm management...",
  },
  {
    id: "res-006",
    title: "Organic Certification Process Explained",
    description:
      "Step-by-step guide to obtaining organic certification for your farm, including documentation requirements and timeline.",
    type: "guide",
    category: "organic-farming",
    thumbnail: "https://i.ibb.co.com/9kKfD0HF/Organic-Certification-Process-Explained.jpg",
    author: "Organic Farming Association",
    datePublished: "2023-09-12",
    readTime: "20 min",
    tags: ["organic certification", "documentation", "compliance"],
    url: "/knowledge-hub/guides/organic-certification",
  },
  {
    id: "res-007",
    title: "Using Drones for Crop Monitoring: Beginner's Guide",
    description:
      "Introduction to agricultural drone technology and how it can help with crop monitoring and management.",
    type: "video",
    category: "technology",
    thumbnail: "https://i.ibb.co.com/TD6snggW/Using-Drones-for-Crop-Monitoring-Beginners-Guide.jpg",
    author: "Tech Farming Initiative",
    datePublished: "2023-10-05",
    videoLength: "22:30",
    tags: ["drones", "precision agriculture", "crop monitoring"],
    url: "/knowledge-hub/videos/drone-crop-monitoring",
  },
  {
    id: "res-008",
    title: "Success Story: Transitioning to Sustainable Rice Farming",
    description:
      "Case study of a farmer who successfully transitioned from conventional to sustainable rice farming methods.",
    type: "case-study",
    category: "climate-smart",
    thumbnail: "https://i.ibb.co.com/sd53Mxs2/Success-Story-Transitioning-to-Sustainable-Rice-Farming.jpg",
    author: "Sustainable Farming Network",
    datePublished: "2023-08-28",
    readTime: "10 min",
    featured: true,
    tags: ["rice farming", "sustainability", "success story"],
    url: "/knowledge-hub/case-studies/sustainable-rice-farming",
    previewContent:
      "Five years ago, Raman Singh's rice farm was struggling with declining yields and rising input costs. Today, his farm is thriving with higher profits and improved soil health. This case study explores how Raman successfully transitioned from conventional to sustainable rice farming methods, the challenges he faced, and the lessons learned along the way...",
  },
  {
    id: "res-009",
    title: "Understanding Agricultural Futures Markets",
    description:
      "Learn how futures markets work and strategies for using them to manage price risk for your farm products.",
    type: "webinar",
    category: "market-insights",
    thumbnail: "https://i.ibb.co.com/XrX5KD7f/Understanding-Agricultural-Futures-Markets.jpg",
    author: "Agricultural Economics Institute",
    datePublished: "2023-11-02",
    videoLength: "45:20",
    tags: ["futures markets", "price risk", "farm economics"],
    url: "/knowledge-hub/webinars/agricultural-futures-markets",
  },
  {
    id: "res-010",
    title: "Tractor Maintenance: Essential Checks and Services",
    description: "Practical guide to routine tractor maintenance to prevent breakdowns and extend equipment life.",
    type: "guide",
    category: "equipment",
    thumbnail: "https://i.ibb.co.com/p6YMNpYC/Tractor-Maintenance-Essential-Checks-and-Services.jpg",
    author: "Farm Mechanics Association",
    datePublished: "2023-07-15",
    readTime: "18 min",
    popular: true,
    tags: ["tractor maintenance", "farm equipment", "preventive care"],
    url: "/knowledge-hub/guides/tractor-maintenance",
  },
  {
    id: "res-011",
    title: "Integrated Pest Management for Vegetable Crops",
    description: "Comprehensive approach to managing pests in vegetable crops while minimizing chemical use.",
    type: "article",
    category: "pest-control",
    thumbnail: "https://i.ibb.co.com/fz8XH7MX/Integrated-Pest-Management-for-Vegetable-Crops.jpg",
    author: "Dr. Meena Verma",
    authorRole: "Entomologist",
    datePublished: "2023-09-25",
    readTime: "14 min",
    tags: ["IPM", "vegetables", "pest management"],
    url: "/knowledge-hub/articles/ipm-vegetable-crops",
  },
  {
    id: "res-012",
    title: "Livestock Nutrition: Balancing Feed for Optimal Health",
    description: "Guide to creating balanced feed rations for different livestock to improve health and productivity.",
    type: "guide",
    category: "livestock",
    thumbnail: "https://i.ibb.co.com/RqsJrHc/Livestock-Nutrition-Balancing-Feed-for-Optimal-Health.jpg",
    author: "Animal Nutrition Research Center",
    datePublished: "2023-10-18",
    readTime: "16 min",
    tags: ["livestock nutrition", "feed rations", "animal health"],
    url: "/knowledge-hub/guides/livestock-nutrition",
  },
];
