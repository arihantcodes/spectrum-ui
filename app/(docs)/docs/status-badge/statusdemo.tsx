import {
  CircleCheck,
  CircleDashed,
  CircleX,
  Clock5,
  ScanSearch,
  TriangleAlert,
} from "lucide-react";
import React from "react";

const StatusDemo = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <div className="w-40 h-[35px] flex items-center justify-center bg-orange-50 rounded-xl ">
          <span className="flex items-center  text-[#EAA65D] font-semibold">
            <TriangleAlert className="w-4 h-4 mr-2" strokeWidth={3} />
            Pending
          </span>
        </div>
        <div className="w-40 h-[35px] flex items-center justify-center bg-rose-50 rounded-xl ">
          <span className="flex items-center  text-[#D57463] font-semibold">
            <CircleX className="w-4 h-4 mr-2" strokeWidth={3} />
            Failed
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
        <div className="w-40 h-[35px] flex items-center justify-center bg-emerald-50 rounded-xl ">
          <span className="flex items-center  text-[#57BC6C] font-semibold">
            <CircleCheck className="w-4 h-4 mr-2" strokeWidth={3} />
            Success
          </span>
        </div>
        <div className="w-40 h-[35px] flex items-center justify-center bg-sky-100 rounded-xl ">
          <span className="flex items-center  text-[#008AF5] font-semibold">
            <CircleDashed className="w-4 h-4 mr-2" strokeWidth={3} />
            In progress
          </span>
        </div>{" "}
        <div className="w-40 h-[35px] flex items-center justify-center bg-yellow-50 rounded-xl ">
          <span className="flex items-center  text-[#F0B13D] font-semibold">
            <ScanSearch className="w-4 h-4 mr-2" strokeWidth={3} />
            In review
          </span>
        </div>{" "}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="w-40 h-[35px] flex items-center justify-center bg-zinc-100 rounded-xl ">
          <span className="flex items-center  text-[#777777] font-semibold">
            <Clock5 className="w-4 h-4 mr-2" strokeWidth={3} />
            Expired
          </span>
        </div>
        <div className="w-40 h-[35px] flex items-center justify-center bg-violet-50 rounded-xl ">
          <span className="flex items-center  text-[#6C3CF0] font-semibold">
            <Clock5 className="w-4 h-4 mr-2" strokeWidth={3} />
            Submited
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatusDemo;
