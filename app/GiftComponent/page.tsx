"use client";

import React, { useState } from "react";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { Textarea } from "@/components/UI/Textarea";
import { Label } from "@/components/UI/Label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/Card";
import { Upload, X } from "lucide-react";
import { toast } from "@/components/UI/UseToast";

const ComponentSubmissionForm = () => {
  const [formData, setFormData] = useState({
    code: "",
    title: "",
    tags: "",
    description: "",
    author: "",
    installationGuide: "",
    usageGuide: "",
    props: "",
  });

  const [previewImage, setPreviewImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Image must be smaller than 5MB",
          variant: "destructive",
        });
        return;
      }

      setPreviewImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
    setImagePreview("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate required fields
      if (
        !formData.code ||
        !formData.title ||
        !formData.tags ||
        !formData.description ||
        !formData.author
      ) {
        throw new Error("Please fill in all required fields");
      }

      // Check if long code requires guides
      if (
        formData.code.length > 60 &&
        (!formData.installationGuide || !formData.usageGuide)
      ) {
        throw new Error(
          "Installation and usage guides are required for complex components"
        );
      }

      const formDataToSend = new FormData();

      // Append all form data
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // Append image if exists
      if (previewImage) {
        formDataToSend.append("previewImage", previewImage);
      }

      const response = await fetch("/api/gift-component", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      toast({
        title: "Success!",
        description: "Component submitted successfully",
      });

      // Reset form
      setFormData({
        code: "",
        title: "",
        tags: "",
        description: "",
        author: "",
        installationGuide: "",
        usageGuide: "",
        props: "",
      });
      removeImage();
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to submit component",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Submit a Component
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter component title"
                required
              />
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label htmlFor="tags">
                Tags <span className="text-red-500">*</span>
              </Label>
              <Input
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="Enter tags (comma-separated)"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your component"
                required
                className="min-h-[100px]"
              />
            </div>

            {/* Author */}
            <div className="space-y-2">
              <Label htmlFor="author">
                Author <span className="text-red-500">*</span>
              </Label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="Your name"
                required
              />
            </div>

            {/* Code */}
            <div className="space-y-2">
              <Label htmlFor="code">
                Code <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="code"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                placeholder="Paste your component code here"
                required
                className="min-h-[200px] font-mono"
              />
            </div>

            {/* Installation Guide */}
            <div className="space-y-2">
              <Label htmlFor="installationGuide">Installation Guide</Label>
              <Textarea
                id="installationGuide"
                name="installationGuide"
                value={formData.installationGuide}
                onChange={handleInputChange}
                placeholder="How to install this component"
                className="min-h-[100px]"
              />
            </div>

            {/* Usage Guide */}
            <div className="space-y-2">
              <Label htmlFor="usageGuide">Usage Guide</Label>
              <Textarea
                id="usageGuide"
                name="usageGuide"
                value={formData.usageGuide}
                onChange={handleInputChange}
                placeholder="How to use this component"
                className="min-h-[100px]"
              />
            </div>

            {/* Props */}
            <div className="space-y-2">
              <Label htmlFor="props">Props</Label>
              <Textarea
                id="props"
                name="props"
                value={formData.props}
                onChange={handleInputChange}
                placeholder="List and describe the component props"
                className="min-h-[100px]"
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Preview Image</Label>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Input
                    type="file"
                    id="image"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("image")?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                  </Button>
                  {imagePreview && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={removeImage}
                      className="px-2"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {imagePreview && (
                  <div className="relative w-full max-w-md mx-auto">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit Component"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComponentSubmissionForm;
