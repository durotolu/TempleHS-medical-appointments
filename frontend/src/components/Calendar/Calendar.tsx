"use client";
import React, { useEffect, useState } from "react";

import Scheduler from "./Scheduler";
import Sidebar from "../Sidebar";
import withAuth from "../helpers/WithAuth";

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
  }, [apiUrl]);

  return (
    <div className="h-full flex relative">
      <Sidebar />
      <Scheduler events={appointments} />
    </div>
  );
};

export default withAuth(Calendar);
