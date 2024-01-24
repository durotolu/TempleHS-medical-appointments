"use client";
import React from "react";
import { Bell } from "../Icons/Bell";

const Topbar = () => {
  const email = localStorage.getItem("user_email")
  return (
    <div className="bg-neutral-50 border-b border-gray-200 flex w-full h-[79px] justify-between items-center px-10">
      <div className="justify-start items-start inline-flex">
        <div className="grow shrink basis-0 text-lime-900 text-2xl font-semibold font-['General Sans'] leading-[28.80px]">
          Schedule Appoinment
        </div>
      </div>
      <div className="w-[218px] h-12 relative">
        <div className="w-[22px] h-[22px] left-0 top-[16px] absolute">
          <Bell />
        </div>
        <div className="w-10 h-10 left-[39px] top-[7px] relative bg-black bg-opacity-20 rounded-full" />
        <div className="w-[98px] left-[91px] top-[4px] absolute text-lime-900 text-base font-normal font-['General Sans'] leading-relaxed">
          {email?.split('@')[0]}
        </div>
        <div className="w-[127px] left-[91px] top-[26px] absolute text-lime-900 text-sm font-normal font-['General Sans'] leading-snug">
          {email}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
