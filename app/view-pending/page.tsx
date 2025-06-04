"use client";

import { Redis } from "@upstash/redis";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/Dialog";
import { X } from "lucide-react";
import OTPInput from "@/components/OtpInput";
import Image from "next/image";

interface PendingComponent {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  author: string;
  status: string;
  previewUrl: string;
  code: string;
  installationGuide: string | null;
  usageGuide: string | null;
  props: string | null;
}

// Correct Redis initialization
const redis = Redis.fromEnv();

export default function PendingComponentsPage() {
  const [pendingComponents, setPendingComponents] = useState<
    PendingComponent[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedComponent, setSelectedComponent] =
    useState<PendingComponent | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Store pending components in Redis

  const storePendingComponents = async (components: PendingComponent[]) => {
    try {
      if (components.length > 0) {
        await redis.set("pendingComponents", JSON.stringify(components), {
          ex: 3600,
        }); // Set expiry for cache
      }
    } catch (err) {
      console.error("Error storing pending components in Redis:", err);
    }
  };

  // Fetch pending components from Redis
  const fetchPendingComponentsFromRedis = async (): Promise<
    PendingComponent[] | null
  > => {
    try {
      const cachedData = await redis.get("pendingComponents");
      return cachedData ? JSON.parse(cachedData as string) : null;
    } catch (err) {
      console.error("Error fetching from Redis:", err);
      return null;
    }
  };

  // Fetch pending components from API
  const fetchPendingComponents = async (): Promise<
    PendingComponent[] | null
  > => {
    try {
      setIsLoading(true);
      setError(null);

      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
      const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

      if (!adminEmail || !adminPassword) {
        throw new Error("Admin credentials not configured");
      }

      const response = await axios.get(`/api/get-all-pending-components`, {
        params: { email: adminEmail, password: adminPassword },
      });

      if (!response.data?.pendingComponents) {
        throw new Error("Invalid response format");
      }

      return response.data.pendingComponents;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch pending components"
      );
      console.error("Error fetching pending components:", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Combined logic for fetching components from Redis or API
  useEffect(() => {
    const fetchAndStoreComponents = async () => {
      if (!isAuthenticated) return;

      try {
        const cachedData = await fetchPendingComponentsFromRedis();

        if (cachedData) {
          setPendingComponents(cachedData);
        } else {
          const apiData = await fetchPendingComponents();
          if (apiData) {
            setPendingComponents(apiData);
            await storePendingComponents(apiData); // Store in Redis
          }
        }
      } catch (err) {
        console.error("Error in fetch process:", err);
      }
    };

    fetchAndStoreComponents();
  }, [isAuthenticated]);

  const handleAction = async (id: string, status: "approve" | "reject") => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);
      setError(null);

      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
      const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

      if (!adminEmail || !adminPassword) {
        throw new Error("Admin credentials not configured");
      }

      await axios.patch(
        `/api/dashboard`,
        { id, status },
        { params: { email: adminEmail, password: adminPassword } }
      );

      // Update local state and Redis
      const updatedComponents = pendingComponents.filter(
        (component) => component._id !== id
      );
      setPendingComponents(updatedComponents);
      await storePendingComponents(updatedComponents); // Update Redis cache
    } catch (err) {
      setError(
        err instanceof Error ? err.message : `Failed to ${status} component`
      );
      console.error(`Error ${status}ing component:`, err);
      fetchPendingComponents();
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAdminAuth = async (code: string) => {
    try {
      setError(null);
      const adminCode = process.env.NEXT_PUBLIC_ADMIN_CODE;

      if (!adminCode) {
        throw new Error("Admin code not configured");
      }

      if (code === adminCode) {
        setIsAuthenticated(true);
      } else {
        setError("Invalid admin code");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen container mx-auto p-4 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Admin Authentication</h1>
        <OTPInput length={6} onComplete={handleAdminAuth} />
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen container mx-auto p-4 flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pending Components</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {pendingComponents.length === 0 ? (
        <div className="text-center text-gray-500">
          No pending components to review
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pendingComponents.map((component) => (
            <Card
              key={component._id}
              className="cursor-pointer"
              onClick={() => setSelectedComponent(component)}
            >
              <CardHeader>
                <CardTitle>{component.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">
                  {component.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {component.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm mb-2">Author: {component.author}</p>
                <p className="text-sm mb-4">Status: {component.status}</p>

                <Image
                  src={component.previewUrl}
                  alt={component.title}
                  width={400}
                  height={400}
                  className="rounded-md object-cover"
                />

                <div className="flex justify-between mt-4">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAction(component._id, "approve");
                    }}
                    variant="default"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : "Approve"}
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAction(component._id, "reject");
                    }}
                    variant="destructive"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : "Reject"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog
        open={!!selectedComponent}
        onOpenChange={() => setSelectedComponent(null)}
      >
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedComponent?.title}</DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </DialogHeader>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Code:</h3>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
              <code>{selectedComponent?.code}</code>
            </pre>

            {selectedComponent?.installationGuide && (
              <>
                <h3 className="text-lg font-semibold mb-2 mt-4">
                  Installation Guide:
                </h3>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                  <code>{selectedComponent.installationGuide}</code>
                </pre>
              </>
            )}

            {selectedComponent?.usageGuide && (
              <>
                <h3 className="text-lg font-semibold mb-2 mt-4">
                  Usage Guide:
                </h3>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                  <code>{selectedComponent.usageGuide}</code>
                </pre>
              </>
            )}

            {selectedComponent?.props && (
              <>
                <h3 className="text-lg font-semibold mb-2 mt-4">Props:</h3>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                  <code>{selectedComponent.props}</code>
                </pre>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
