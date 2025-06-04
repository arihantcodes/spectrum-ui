import React from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "./ui/Badge";
import { Check, FileText, Mail, MessageSquare, Users } from "lucide-react";
const Newsletter = () => {
  return (
    <>
      <Card className="rounded-none border-none ">
        <div className="mb-4 w-full p-6 border-t border-neutral-200 dark:border-neutral-800">
          <h3 className="text-lg font-medium">Newsletter Post</h3>
          <p className="text-sm text-neutral-400">
            View existing posts, create new posts, and edit templates
          </p>
        </div>
        <div className="grid grid-cols-1 ">
          <div className="border-y border-neutral-300  dark:border-neutral-800 p-6">
            <h4 className="font-medium">
              Maximizing Your Productivity: Tools for Success
            </h4>
            <p className="text-sm text-neutral-400 mb-2">
              This newsletter focuses on the best productivity tools
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                variant="outline"
                className="bg-[#E0FAEC] dark:bg-green-950 rounded-sm text-green-500 border-green-200 dark:border-green-800 text-xs"
              >
                <Check className="h-4 w-4 mr-2" />
                Published
              </Badge>
              <span className="text-neutral-500">•</span>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <Mail className="h-3 w-3" />
                13342
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <Users className="h-3 w-3" />
                2313 (17.7%)
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <MessageSquare className="h-3 w-3" />
                1222 (58%)
              </div>
            </div>
          </div>
          <div className="border-b border-neutral-300  dark:border-neutral-800 p-6">
            <h4 className="font-medium">
              Maximizing Your Productivity: Tools for Success
            </h4>
            <p className="text-sm text-neutral-400 mb-2">
              This newsletter focuses on the best productivity tools
            </p>
            <Badge
              variant="outline"
              className="bg-sky-100 dark:bg-sky-950 rounded-sm text-sky-500 border-sky-200 dark:border-sky-800 text-xs"
            >
              <FileText className="h-4 w-4 mr-2" />
              Draft
            </Badge>
          </div>
          <div className=" border-b border-neutral-300  dark:border-neutral-800 p-6">
            <h4 className="font-medium">
              Maximizing Your Productivity: Tools for Success
            </h4>
            <p className="text-sm text-neutral-400">
              This newsletter focuses on the best productivity tools
            </p>
          </div>
        </div>
      </Card>
    </>
  );
};

export default Newsletter;
