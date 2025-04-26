"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";

interface CartItem {
  _id: string;
  productId: string;
  productName: string;
  productImage: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export default function CartPage() {
  const [carts, setCarts] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const router = useRouter();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch(`/api/cart/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch cart");
        const data = await res.json();
        setCarts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchCart();
    }
  }, [userId]);

  const handleDeleteCart = async (cartId: string, productName: string) => {
    try {
      const response = await fetch(`/api/cart/${cartId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to remove item from cart");
      }

      // Update local state to remove the deleted item
      setCarts((prevCarts) => prevCarts.filter((cart) => cart._id !== cartId));

      toast.success("Item removed successfully", {
        description: `Removed: ${productName}`,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove item", {
        description: "Please try again later",
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {carts.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>
          <p className="text-muted-foreground mb-6">
            Browse our marketplace to add products to your cart
          </p>
          <Button onClick={() => router.push("/marketplace")}>
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Product ID</TableHead>
                <TableHead>Added On</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {carts.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>
                    <Image
                      src={item.productImage}
                      alt={item.productName}
                      width={64}
                      height={64}
                      className="rounded"
                    />
                  </TableCell>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>{item.productId}</TableCell>
                  <TableCell>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => {
                          toast("Buy clicked", {
                            description: `Proceed to buy: ${item.productName}`,
                          });
                          // TODO: Add actual buy logic here
                        }}
                      >
                        Buy
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                          handleDeleteCart(item._id, item.productName)
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
