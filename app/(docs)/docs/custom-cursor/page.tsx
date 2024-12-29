import CustomCursor from '@/components/custom_cursor';
import React from 'react';
import { PageSubTitle, PageTemplate } from "../components/page-template";
import { Steppers } from "@/components/ui/steppers";
import Usage from "@/app/(docs)/docs/components/usage";


const page = () => {
  return (
    <PageTemplate
      title="Custom Cursor"
      description="A customizable cursor for enhancing user interactions."
    >
      <PageSubTitle>Usage</PageSubTitle>
      <Usage
        title="custom cursor"
        path="app/(docs)/docs/custom-cursor/usage/custom-cursor-usage.tsx"
      >
        {/* you can also use rgba values here */}
        <CustomCursor shape="circle" size={40} color="transparent" />
        {/* <CustomCursor shape="icon" iconUrl="/skull.jpg" size={50} /> //use this line for icon */}

         <h1 className="text-center text-4xl font-bold m-20 hover:text-yellow-400">
           This page uses a custom cursor!
        </h1>
      </Usage>

      <PageSubTitle>Installation</PageSubTitle>
      <Steppers withInstall codePath="components/custom_cursor.tsx" withEnd />

    </PageTemplate>
  );
};

export default page;

// const CircleCursorPage: React.FC = () => {
//     return (
//       <div className="relative w-full h-screen bg-zinc-900">
//         {/* can change the shape, size and color of the cursor */}
//         <CustomCursor shape="circle" size={40} color="transparent" />  
//         {/* <CustomCursor shape="icon" iconUrl="/skull.jpg" size={50} /> //use this line for icon */}
        
//         <h1 className="text-center text-4xl font-bold pt-20 hover:text-yellow-400">
//           This page uses a custom cursor!
//         </h1>
//       </div>
//     );
//   };
  
//   export default CircleCursorPage;