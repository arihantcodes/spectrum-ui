import React from "react";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from "@/components/ui/ResponsiveModal";
import { Button } from "@/components/ui/Button";

const ResponsiveModalDemo = () => {
  return (
    <ResponsiveModal>
      <ResponsiveModalTrigger asChild>
        <Button variant="outline">Open</Button>
      </ResponsiveModalTrigger>
      <ResponsiveModalContent>
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>Are you absolutely sure?</ResponsiveModalTitle>
          <ResponsiveModalDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};

export default ResponsiveModalDemo;
