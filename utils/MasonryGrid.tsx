'use client';

import Masonry from 'masonry-layout';
import { useEffect, useRef, useState } from 'react';

const MasonryGrid = ({ children }: { children: React.ReactNode }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [columnWidth, setColumnWidth] = useState('100%');

  useEffect(() => {
    const parentWidth = containerRef.current?.parentElement?.offsetWidth || 0
    if (parentWidth >= 1200) {
      setColumnWidth('23%');
    }else if (parentWidth >= 990) {
      setColumnWidth('30.3333%');
    }else if (parentWidth >= 700) {
      setColumnWidth('50%');
    }else if (parentWidth <=619) {
      setColumnWidth('100%')
    }

    console.log(parentWidth, columnWidth);

    if (gridRef.current) {
      new Masonry(gridRef.current, {
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        gutter: 30,
        fitWidth:true,
        percentPosition: true,

      });
    }

  }, [columnWidth]);

  return (
    <div ref={containerRef} className="relative max-w-screen-xl mx-auto">
      <div ref={gridRef} className="grid mx-auto w-full justify-center">
      <div className="grid-sizer" style={{ width: columnWidth }} />
        {children}
    </div>
    </div>
  );
};

export default MasonryGrid;
