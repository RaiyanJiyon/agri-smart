"use client";

import { useState } from "react";
import {
  CreditCard,
  Download,
  FileText,
  Loader2,
  Plus,
  RefreshCw,
  Shield,
  Star,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

// Mock data for billing history
const billingHistory = [
  {
    id: "INV-001",
    date: "Apr 1, 2023",
    amount: "$29.99",
    status: "Paid",
    plan: "Pro Plan",
  },
  {
    id: "INV-002",
    date: "Mar 1, 2023",
    amount: "$29.99",
    status: "Paid",
    plan: "Pro Plan",
  },
  {
    id: "INV-003",
    date: "Feb 1, 2023",
    amount: "$29.99",
    status: "Paid",
    plan: "Pro Plan",
  },
  {
    id: "INV-004",
    date: "Jan 1, 2023",
    amount: "$19.99",
    status: "Paid",
    plan: "Basic Plan",
  },
  {
    id: "INV-005",
    date: "Dec 1, 2022",
    amount: "$19.99",
    status: "Paid",
    plan: "Basic Plan",
  },
];

// Mock data for subscription plans
const subscriptionPlans = [
  {
    id: "basic",
    name: "Basic Plan",
    description: "Essential features for small farms",
    price: "$19.99",
    interval: "month",
    features: [
      "Weather forecasts",
      "Basic crop recommendations",
      "Community access",
      "5 AI queries per day",
      "Email support",
    ],
    popular: false,
  },
  {
    id: "pro",
    name: "Pro Plan",
    description: "Advanced features for growing farms",
    price: "$29.99",
    interval: "month",
    features: [
      "All Basic Plan features",
      "Advanced crop analytics",
      "Disease detection",
      "Market insights",
      "20 AI queries per day",
      "Priority support",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise Plan",
    description: "Complete solution for large operations",
    price: "$49.99",
    interval: "month",
    features: [
      "All Pro Plan features",
      "Custom integrations",
      "Advanced analytics dashboard",
      "Unlimited AI queries",
      "Dedicated account manager",
      "24/7 phone support",
    ],
    popular: false,
  },
];

export default function BillingPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [currentPlan, setCurrentPlan] = useState<string>("pro");

  const handleUpdatePayment = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast("Payment method updated", {
        description: "Your payment method has been updated successfully.",
      });
      setIsLoading(false);
      setIsDialogOpen(false);
    }, 1500);
  };

  const handleChangePlan = (planId: string) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setCurrentPlan(planId);
      toast("Subscription updated", {
        description: `Your subscription has been updated to the ${
          subscriptionPlans.find((plan) => plan.id === planId)?.name
        }.`,
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    toast("Invoice downloaded", {
      description: `Invoice ${invoiceId} has been downloaded.`,
    });
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">
          Billing & Subscription
        </h2>
        <p className="text-muted-foreground">
          Manage your subscription plan and billing information.
        </p>
      </div>

      <Tabs defaultValue="subscription" className="space-y-4">
        <TabsList>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
          <TabsTrigger value="history">Billing History</TabsTrigger>
        </TabsList>

        <TabsContent value="subscription" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>
                You are currently on the{" "}
                {
                  subscriptionPlans.find((plan) => plan.id === currentPlan)
                    ?.name
                }
                .
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">
                    {
                      subscriptionPlans.find((plan) => plan.id === currentPlan)
                        ?.price
                    }
                    <span className="text-sm font-normal text-muted-foreground">
                      /month
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Next billing date: May 1, 2023
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => handleChangePlan(currentPlan)}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Renew Plan
                </Button>
              </div>
            </CardContent>
            <Separator />
            <CardHeader>
              <CardTitle>Available Plans</CardTitle>
              <CardDescription>
                Choose the plan that works best for your farm.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {subscriptionPlans.map((plan) => (
                  <Card
                    key={plan.id}
                    className={`flex flex-col ${
                      plan.popular ? "border-primary" : ""
                    } ${currentPlan === plan.id ? "bg-muted/50" : ""}`}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>{plan.name}</CardTitle>
                        {plan.popular && (
                          <Badge variant="secondary">
                            <Star className="mr-1 h-3 w-3" />
                            Popular
                          </Badge>
                        )}
                      </div>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="mb-4">
                        <span className="text-2xl font-bold">{plan.price}</span>
                        <span className="text-muted-foreground">
                          /{plan.interval}
                        </span>
                      </div>
                      <ul className="space-y-2 text-sm">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-center">
                            <Shield className="mr-2 h-4 w-4 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        variant={
                          currentPlan === plan.id ? "outline" : "default"
                        }
                        disabled={currentPlan === plan.id || isLoading}
                        onClick={() => handleChangePlan(plan.id)}
                      >
                        {isLoading && currentPlan !== plan.id ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                        {currentPlan === plan.id
                          ? "Current Plan"
                          : "Switch Plan"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              <p className="text-sm text-muted-foreground">
                Need a custom plan? Contact our sales team for enterprise
                solutions.
              </p>
              <Button variant="link" className="p-0">
                Contact Sales
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Manage your payment methods and billing details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-muted p-2">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Visa ending in 4242</p>
                      <p className="text-sm text-muted-foreground">
                        Expires 04/2025
                      </p>
                    </div>
                  </div>
                  <Badge>Default</Badge>
                </div>
              </div>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Payment Method
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Payment Method</DialogTitle>
                    <DialogDescription>
                      Add a new credit card or debit card to your account.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name on Card</Label>
                      <Input id="name" placeholder="John Doe" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="country">Country</Label>
                      <Select defaultValue="us">
                        <SelectTrigger id="country">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleUpdatePayment} disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Payment Method"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
            <Separator />
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>
                Update your billing address and contact information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="billing-name">Name</Label>
                  <Input id="billing-name" defaultValue="John Farmer" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="billing-email">Email</Label>
                  <Input
                    id="billing-email"
                    defaultValue="john.farmer@example.com"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="billing-address">Address</Label>
                <Input id="billing-address" defaultValue="123 Farm Road" />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="grid gap-2">
                  <Label htmlFor="billing-city">City</Label>
                  <Input id="billing-city" defaultValue="Farmville" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="billing-state">State</Label>
                  <Input id="billing-state" defaultValue="Iowa" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="billing-zip">ZIP Code</Label>
                  <Input id="billing-zip" defaultValue="12345" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="billing-country">Country</Label>
                <Select defaultValue="us">
                  <SelectTrigger id="billing-country">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>
                <Zap className="mr-2 h-4 w-4" />
                Update Billing Information
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>
                View and download your past invoices.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {billingHistory.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">
                        {invoice.id}
                      </TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.amount}</TableCell>
                      <TableCell>{invoice.plan}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownloadInvoice(invoice.id)}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full sm:w-auto">
                <FileText className="mr-2 h-4 w-4" />
                Download All Invoices
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
