"use client";
import React, { useEffect, useState } from "react";

import dynamic from "next/dynamic";
import { Logo } from "./Logo";
import { AppointmentIcon } from "./AppointmentIcon";
import { DashboardIcon } from "./DashboardIcon";
import { Bell } from "./Bell";
import { LeftArrow } from "./LeftArrow";
import Scheduler from "./scheduler";

export interface Appointment {
  StartTime: string;
  Subject: string;
  EndTime: string;
  Id: number;
}

const Calendar = () => {
  const apiUrl: string =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/api/appointments/${localStorage.getItem("user_id")}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token") as string,
            },
          }
        );
        const data = await response.json();
        const events: Appointment[] = data.map(
          (app: { id: any; type: any; appointment: any }) => ({
            Id: app.id,
            Subject: app.type,
            StartTime: new Date(app.appointment),
            EndTime: new Date(
              new Date(app.appointment).getTime() + 30 * 30 * 1000
            ),
          })
        );
        setAppointments(events);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <div className="h-full flex">
      <div className="bg-white shadow">
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
      <div>
        <Scheduler events={appointments} />
      </div>
    </div>
  );
};

export default Calendar;
