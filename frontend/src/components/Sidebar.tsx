import React from "react";
import { Logo } from "./Icons/Logo";
import { AppointmentIcon } from "./Icons/AppointmentIcon";
import { DashboardIcon } from "./DashboardIcon";

const Sidebar = () => {
  return (
    <div className="shadow bg-white relative">
      <div className="flex-col justify-start items-start gap-2 inline-flex h-screen">
        <div className="self-stretch pl-10 pr-6 py-12 justify-between items-center inline-flex">
          <div className="justify-start items-center gap-2 flex">
            <div className="text-stone-800 text-base font-medium font-['General Sans'] leading-relaxed">
              <Logo />
            </div>
          </div>
          <div className="w-2 h-2 bg-white rounded-full" />
        </div>
        <div className="self-stretch pl-10 pr-6 py-4 justify-between items-center inline-flex">
          <div className="justify-start items-center gap-2 flex">
            <DashboardIcon />
            <div className="text-stone-800 text-base font-medium font-['General Sans'] leading-relaxed">
              Dashboard
            </div>
          </div>
          <div className="w-2 h-2 bg-white rounded-full" />
        </div>
        <div className="self-stretch pl-10 pr-6 py-4 bg-emerald-50 justify-between items-center inline-flex">
          <div className="justify-start items-center gap-2 flex mr-16">
            <AppointmentIcon />
            <div className="text-green-700 text-base font-semibold font-['General Sans'] leading-relaxed">
              Appointments
            </div>
          </div>
          <div className="w-2 h-2 bg-green-700 rounded-full" />
        </div>
      </div>
      <div className="w-[156px] h-[38.10px] left-[43px] top-[50.81px] absolute"></div>
    </div>
  );
};

export default Sidebar;
