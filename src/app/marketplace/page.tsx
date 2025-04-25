"use client";

import { Pagination } from "@/app/marketplace/components/pagination";
import { useState, useEffect } from "react";
import { FilterBar } from "./components/filter-bar";
import { ProductCard } from "./components/product-card";
import { Product } from "@/lib/types";
import Loading from "../loading";

export default function MarketplacePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter and pagination state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Construct query parameters
        const params = new URLSearchParams({
          searchTerm,
          category: selectedCategory,
          minPrice: priceRange[0].toString(),
          maxPrice: priceRange[1].toString(),
          page: currentPage.toString(),
          limit: itemsPerPage.toString(),
        });

        const response = await fetch(`/api/products?${params}`);

        if (!response.ok) {
          throw new Error("Failed to fetch products data");
        }

        const data = await response.json();

        if (data.success) {
          setProducts(data.data);
          setTotalItems(data.pagination.totalItems);
          setTotalPages(data.pagination.totalPages);
        }
      } catch (error) {
        setError("Failed to load products. Please try again later.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm, selectedCategory, priceRange, currentPage, itemsPerPage]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-700 dark:text-green-500 mb-2">
          Agricultural Marketplace
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Find high-quality agricultural products from trusted sellers
        </p>
      </div>

      <FilterBar
        onSearch={(term) => {
          setSearchTerm(term);
          setCurrentPage(1); // Reset to first page when searching
        }}
        onCategoryChange={(category) => {
          setSelectedCategory(category);
          setCurrentPage(1); // Reset to first page when changing category
        }}
        onPriceRangeChange={(range) => {
          setPriceRange(range);
          setCurrentPage(1); // Reset to first page when changing price range
        }}
        selectedCategory={selectedCategory}
        priceRange={priceRange}
      />

      {error ? (
        <div className="text-center py-12 text-red-500">{error}</div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">No products found</h2>
          <p className="text-muted-foreground">
            Try adjusting your filters or search term
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={(value) => {
              setItemsPerPage(value);
              setCurrentPage(1); // Reset to first page when changing items per page
            }}
            totalItems={totalItems}
          />
        </>
      )}
    </div>
  );
}
