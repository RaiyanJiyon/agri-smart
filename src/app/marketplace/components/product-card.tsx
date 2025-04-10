"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/data/products";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const {
    productId,
    name,
    category,
    price,
    unit,
    location,
    imageUrl,
    isAvailable,
    rating,
    discount,
  } = product;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="h-full overflow-hidden p-0">
        <div className="relative">
          {!isAvailable && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
              <Badge variant="destructive" className="text-lg py-1.5">
                Out of Stock
              </Badge>
            </div>
          )}
          {discount > 0 && (
            <Badge className="absolute top-2 right-2 bg-green-600 hover:bg-green-700 z-10">
              {discount}% OFF
            </Badge>
          )}
          <div className="h-48 bg-muted overflow-hidden">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={name}
              width={500}
              height={192}
              className="w-full h-full object-cover transition-transform hover:scale-105"
            />
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <Badge variant="outline" className="bg-muted">
              {category}
            </Badge>
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="text-sm font-medium">{rating.toFixed(1)}</span>
            </div>
          </div>
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{name}</h3>
          <div className="flex items-center text-muted-foreground mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex items-center font-medium">
            <span className="text-lg">₹{price}</span>
            <span className="text-sm text-muted-foreground ml-1">/{unit}</span>
            {discount > 0 && (
              <span className="text-sm text-muted-foreground line-through ml-2">
                ₹{Math.round(price / (1 - discount / 100))}
              </span>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button
            asChild
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={!isAvailable}
          >
            <Link href={`/marketplace/${productId}`}>View Details</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
