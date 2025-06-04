"use client";
import React, { useState } from "react";
import { Spinner } from "@/components/ui/Spinner";
import { Button } from "@/components/ui/Button";

const SpinnerToggle = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="flex items-center gap-5">
      <Button onClick={() => setShow((pre) => !pre)}>toggle spinner</Button>
      <Spinner show={show} />
    </div>
  );
};

export default SpinnerToggle;
