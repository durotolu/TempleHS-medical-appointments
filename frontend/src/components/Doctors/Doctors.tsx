import React, { useEffect, useState } from "react";
import { BackArrow } from "../Icons/BackArrow";
import AppointmentModal, { Appointment } from "../AppointmentModal";
import Sidebar from "../Sidebar";
import Topbar from "./Topbar";
import DoctorCard from "./DoctorCard";

interface Appointments {
  id: number;
  time: string;
  visible: boolean;
}

export interface Doctor {
  id: number;
  name: string;
  title: string;
  bio: string;
  in_person: boolean;
  photo: string;
  appointments: Appointments[];
}

const dayOfWeek = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thur",
  5: "Fri",
  6: "Sat",
};

const Doctors = () => {
  const apiUrl: string =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointment, setAppointment] = useState<Appointment>({
    id: null,
    appointment: "",
    type: "",
    doctor_id: 0,
    user_id: 0,
  });
  const [showModal, setShowModal] = React.useState<boolean>(false);

  useEffect(() => {
    const fetchDoctorsAvailable = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/doctors`, {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("token") as string,
          },
        });
        const data: Doctor[] = await response.json();
        const dataVisible = data.map((doc) => ({
          ...doc,
          appointments: doc.appointments.map((app, i) => {
            if (i <= 2) {
              return {
                ...app,
                visible: true,
              };
            } else {
              return {
                ...app,
                visible: false,
              };
            }
          }),
        }));
        setDoctors(dataVisible);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDoctorsAvailable();
  }, [apiUrl]);

  return (
    <div className="h-full flex">
      <Sidebar />
      <div className="flex-col justify-start items-start gap-6 inline-flex">
        <Topbar />
        <div className="flex pl-7 pr-20">
          <div className="w-[111px] h-[27px] justify-start items-center gap-3 basis-1/2">
            <div className="text-green-950 text-xl font-normal font-['General Sans'] flex items-center gap-2 mb-12">
              <BackArrow />
              Go back
            </div>
            <div className="text-green-950 text-[40px] font-normal font-['General Sans']">
              Select your doctor and appointment time
            </div>
          </div>

          <div className="basis-1/2">
            <div className="flex">
              <input
                placeholder="Select date"
                className="p-4 h-[50px] rounded-md border border-neutral-800 border-opacity-30"
              />
              <input
                placeholder="Select time range"
                className="p-4 h-[50px] rounded-md border border-neutral-800 border-opacity-30"
              />
              <input
                placeholder="Select expertise"
                className="p-4 h-[50px] rounded-md border border-neutral-800 border-opacity-30"
              />
            </div>

            {doctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                setAppointment={setAppointment}
                doctor={doctor}
                setShowModal={setShowModal}
                showModal={showModal}
                doctors={doctors}
                setDoctors={setDoctors}
              />
            ))}
          </div>
        </div>
      </div>
      <AppointmentModal
        showModal={showModal}
        appointment={appointment}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default Doctors;