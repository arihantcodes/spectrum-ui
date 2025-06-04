"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

interface ResponseMessage {
  statusCode: number;
  category: string;
  description: string;
}

const statusCodes: ResponseMessage[] = [
  { statusCode: 100, category: "informational", description: "Continue" },
  {
    statusCode: 101,
    category: "informational",
    description: "Switching Protocols",
  },
  { statusCode: 200, category: "success", description: "OK" },
  { statusCode: 201, category: "success", description: "Created" },
  { statusCode: 202, category: "success", description: "Accepted" },
  { statusCode: 204, category: "success", description: "No Content" },
  { statusCode: 300, category: "redirection", description: "Multiple Choices" },
  {
    statusCode: 301,
    category: "redirection",
    description: "Moved Permanently",
  },
  { statusCode: 302, category: "redirection", description: "Found" },
  { statusCode: 304, category: "redirection", description: "Not Modified" },
  { statusCode: 400, category: "clientError", description: "Bad Request" },
  { statusCode: 401, category: "clientError", description: "Unauthorized" },
  { statusCode: 403, category: "clientError", description: "Forbidden" },
  { statusCode: 404, category: "clientError", description: "Not Found" },
  {
    statusCode: 500,
    category: "serverError",
    description: "Internal Server Error",
  },
  { statusCode: 501, category: "serverError", description: "Not Implemented" },
  { statusCode: 502, category: "serverError", description: "Bad Gateway" },
  {
    statusCode: 503,
    category: "serverError",
    description: "Service Unavailable",
  },
  // Add more status codes here...
];

const categoryColors = {
  informational: "bg-blue-500/10 border border-blue-800 text-blue-300",
  success: "bg-green-500/10 border border-green-800  text-green-300",
  redirection: "bg-yellow-500/10 border border-yellow-800 text-yellow-300",
  clientError: "bg-orange-500/10 border border-orange-800 text-orange-300",
  serverError: "bg-red-500/10 border border-red-800 text-red-300",
};

const categoryIcons: { [key in ResponseMessage["category"]]: JSX.Element } = {
  informational: <Info className="w-5 h-5" />,
  success: <CheckCircle className="w-5 h-5" />,
  redirection: <AlertTriangle className="w-5 h-5" />,
  clientError: <XCircle className="w-5 h-5" />,
  serverError: <XCircle className="w-5 h-5" />,
};

export default function Ststuscodelist() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredCodes = statusCodes.filter(
    (code) =>
      code.statusCode.toString().includes(searchTerm) ||
      code.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      code.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCodes.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCodes.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Card className="w-full max-w-4xl mx-auto backdrop-blur-md  border border-white/20 shadow-xl">
      <CardContent className="p-6">
        <Input
          type="text"
          placeholder="Search status codes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="font-semibold">Status Code</div>
          <div className="font-semibold">Category</div>
          <div className="font-semibold">Description</div>
          {currentItems.map((item) => (
            <>
              <div
                className={`flex items-center justify-center ${
                  categoryColors[item.category as keyof typeof categoryColors]
                } rounded-3xl w-28 `}
              >
                {item.statusCode}
              </div>
              <div className="flex items-center capitalize">
                {categoryIcons[item.category as keyof typeof categoryIcons]}
                <span className="ml-2">{item.category}</span>
              </div>
              <div>{item.description}</div>
            </>
          ))}
        </div>
        <div className="flex justify-between items-center mt-4">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
