"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { categories } from "@/data/products";

interface FilterBarProps {
  onSearch: (term: string) => void;
  onCategoryChange: (category: string) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  selectedCategory: string;
  priceRange: [number, number];
}

export function FilterBar({
  onSearch,
  onCategoryChange,
  onPriceRangeChange,
  selectedCategory,
  priceRange,
}: FilterBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [tempCategory, setTempCategory] = useState(selectedCategory);
  const [tempPriceRange, setTempPriceRange] =
    useState<[number, number]>(priceRange);

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleApplyFilters = () => {
    onCategoryChange(tempCategory);
    onPriceRangeChange(tempPriceRange);
  };

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleSearch}
            className="bg-green-600 hover:bg-green-700"
          >
            Search
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Products</SheetTitle>
                <SheetDescription>
                  Adjust filters to find the perfect products for your farm
                </SheetDescription>
              </SheetHeader>
              <div className="py-6 px-4 space-y-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Categories</h3>
                  <RadioGroup
                    value={tempCategory}
                    onValueChange={setTempCategory}
                    className="flex flex-col space-y-1"
                  >
                    {categories.map((category) => (
                      <div
                        key={category}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem
                          value={category}
                          id={`category-${category}`}
                        />
                        <Label htmlFor={`category-${category}`}>
                          {category}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <h3 className="text-sm font-medium">Price Range</h3>
                    <span className="text-sm">
                      ₹{tempPriceRange[0]} - ₹{tempPriceRange[1]}
                    </span>
                  </div>
                  <Slider
                    defaultValue={tempPriceRange}
                    min={0}
                    max={20000}
                    step={100}
                    onValueChange={(value) =>
                      setTempPriceRange(value as [number, number])
                    }
                    className="py-4"
                  />
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button
                    onClick={handleApplyFilters}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Apply Filters
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category)}
            className={
              selectedCategory === category
                ? "bg-green-600 hover:bg-green-700"
                : ""
            }
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}
