"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  MapPin,
  Star,
  Tag,
  ShoppingCart,
  Truck,
  Calendar,
  Store,
  BarChart,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "../components/product-card";
import Image from "next/image";
import { Product } from "@/lib/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export default function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Unwrap the params Promise using React.use()
  const resolveParams = use(params);
  const { id } = resolveParams;

  const { data: session } = useSession();
  const userId = session?.user.id;

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/products/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }

        const data = await response.json();
        setProduct(data);

        const relatedResponse = await fetch("/api/products");
        if (relatedResponse.ok) {
          const allProducts = await relatedResponse.json();
          setSimilarProducts(allProducts.data);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async (productId: string, productName: string, productImage: string) => {
    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, productName, productImage, userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }

      // Show success message
      toast.success("Product added to cart");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add to cart");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto"></div>
          <p className="mt-4 text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="outline"
          onClick={() => router.push("/marketplace")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Marketplace
        </Button>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The product you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Button
            onClick={() => router.push("/marketplace")}
            className="bg-green-600 hover:bg-green-700"
          >
            Browse Marketplace
          </Button>
        </div>
      </div>
    );
  }

  const discountedPrice =
    product.discount > 0
      ? product.price * (1 - product.discount / 100)
      : product.price;

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="outline"
        onClick={() => router.push("/marketplace")}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Marketplace
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-muted rounded-lg overflow-hidden h-[300px] md:h-[400px] relative">
            {!product.isAvailable && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                <Badge variant="destructive" className="text-lg py-2 px-3">
                  Out of Stock
                </Badge>
              </div>
            )}
            {product.discount > 0 && (
              <Badge className="absolute top-4 right-4 bg-green-600 hover:bg-green-700 text-lg py-1.5 px-3 z-10">
                {product.discount}% OFF
              </Badge>
            )}
            <Image
              src={product.imageUrl || "/placeholder.svg"}
              alt={product.name}
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-muted">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline" className="bg-muted text-sm">
                {product.category}
              </Badge>
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="font-medium">{product.rating.toFixed(1)}</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center text-muted-foreground mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{product.location}</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">
              ₹{discountedPrice.toFixed(2)}
            </span>
            <span className="text-muted-foreground">/{product.unit}</span>
            {product.discount > 0 && (
              <span className="text-muted-foreground line-through">
                ₹{product.price.toFixed(2)}
              </span>
            )}
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Brand</p>
              <p className="font-medium">{product.brand}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Stock</p>
              <p className="font-medium">
                {product.isAvailable
                  ? `${product.stockQuantity} ${product.unit}s available`
                  : "Out of stock"}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Seller ID</p>
              <p className="font-medium">{product.sellerId}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date Added</p>
              <p className="font-medium">
                {new Date(product.dateAdded).toLocaleDateString()}
              </p>
            </div>
            {product.expirationDate && (
              <div className="col-span-2">
                <p className="text-sm text-muted-foreground">Expiration Date</p>
                <p className="font-medium">
                  {new Date(product.expirationDate).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>

          <Separator />

          <div className="space-y-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={!product.isAvailable || !session?.user}
                      onClick={() => handleAddToCart(product._id, product.name, product.imageUrl)}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </TooltipTrigger>
                {!session && (
                  <TooltipContent>
                    <p>You need to sign in to add to cart</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Button
                      variant="outline"
                      className="w-full"
                      disabled={!product.isAvailable || !session?.user}
                    >
                      Buy Now
                    </Button>
                  </div>
                </TooltipTrigger>
                {!session && (
                  <TooltipContent>
                    <p>You need to sign in to buy product</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Truck className="h-5 w-5" />
                <span>Free delivery on orders over ₹1000</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="delivery">Delivery</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg">{product.description}</p>
            </div>
          </TabsContent>
          <TabsContent value="details" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Product Specifications</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-muted-foreground">Category</div>
                  <div>{product.category}</div>
                  <div className="text-muted-foreground">Brand</div>
                  <div>{product.brand}</div>
                  <div className="text-muted-foreground">Unit</div>
                  <div>{product.unit}</div>
                  {product.expirationDate && (
                    <>
                      <div className="text-muted-foreground">Expiration</div>
                      <div>
                        {new Date(product.expirationDate).toLocaleDateString()}
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Seller Information</h3>
                <div className="flex items-center gap-3 mb-3">
                  <Store className="h-5 w-5 text-green-600" />
                  <span className="font-medium">{product.sellerId}</span>
                </div>
                <p className="text-muted-foreground">
                  Located in {product.location}. Joined AgriSmart in 2023.
                </p>
                <Button variant="outline" size="sm">
                  View Seller Profile
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="delivery" className="mt-6">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Truck className="h-6 w-6 text-green-600 mt-1" />
                <div>
                  <h3 className="text-lg font-medium mb-1">
                    Standard Delivery
                  </h3>
                  <p className="text-muted-foreground">
                    Delivery within 3-5 business days. Free for orders above
                    ₹1000.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Calendar className="h-6 w-6 text-green-600 mt-1" />
                <div>
                  <h3 className="text-lg font-medium mb-1">
                    Delivery Schedule
                  </h3>
                  <p className="text-muted-foreground">
                    Orders placed before 2 PM are processed the same day.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <BarChart className="h-6 w-6 text-green-600 mt-1" />
                <div>
                  <h3 className="text-lg font-medium mb-1">Bulk Orders</h3>
                  <p className="text-muted-foreground">
                    Special delivery arrangements available for bulk orders.
                    Contact seller directly.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {similarProducts.length !== 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {similarProducts
              .filter(
                (p) => p.category === product.category && p._id !== product._id
              )
              .slice(0, 4)
              .map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
