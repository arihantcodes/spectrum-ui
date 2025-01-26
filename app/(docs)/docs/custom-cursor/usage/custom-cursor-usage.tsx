import React from 'react';
import CustomCursor from "@/components/custom_cursor";

const Custom_cursor_usage: React.FC = () => {
    return (
      <div className="relative w-full h-screen bg-zinc-900">

        {/* can change the shape, size and color of the cursor */}
        <CustomCursor shape="circle" size={40} color="transparent" />  
        {/* <CustomCursor shape="icon" iconUrl="/skull.jpg" size={50} /> //use this line for icon */}
        
        <h1 className="text-center text-4xl font-bold pt-20 hover:text-yellow-400">
          This page uses a custom cursor!!!
        </h1>

      </div>
    );
  };
  
  export default Custom_cursor_usage;