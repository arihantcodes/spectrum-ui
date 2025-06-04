import DiscloseImage from "@/components/SpectrumUI/DiscloseImage";
import React from "react";

const page = () => {
  return (
    <div>
      <DiscloseImage
        alt="A beautiful image"
        vertical
        doorClassName="bg-green-500"
        src="https://plus.unsplash.com/premium_vector-1689096860582-07eee139f9f1?bg=FFFFFF&w=800&auto=format&fit=crop&q=100&ixlib=rb-4.0.3"
      />
    </div>
  );
};

export default page;
