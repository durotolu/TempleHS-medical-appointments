import React, { ChangeEvent, useEffect, useState } from "react";
import { BackArrow } from "../Icons/BackArrow";
import AppointmentModal, { Appointment } from "../AppointmentModal";
import Sidebar from "../Sidebar";
import Topbar from "./Topbar";
import DoctorCard from "./DoctorCard";
import WithAuth from "@/components/helpers/WithAuth";

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
  degree: string;
  in_person: boolean;
  photo: string;
  appointments: Appointments[];
}

const Doctors = () => {
  const apiUrl: string =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [timeFilter, setTimeFilter] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
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
        setFilteredDoctors(dataVisible);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDoctorsAvailable();
  }, [apiUrl]);

  useEffect(() => {
    console.log("sesd")
    const filteredDocs = doctors.filter((doctor) =>
      doctor.appointments?.find((appointment) => {
        const appointmentDate = appointment.time?.split("T")[0]
        const appointmentTime = appointment.time?.split("T")[1].slice(0, 2)
        console.log(appointmentDate, dateFilter, appointmentTime, timeFilter)
        if (!dateFilter) return (parseInt(appointmentTime) <= (parseInt(timeFilter) + 1)) && (parseInt(appointmentTime) >= (parseInt(timeFilter) - 1))
        if (!timeFilter) return appointmentDate === dateFilter
        return appointmentDate === dateFilter && (parseInt(appointmentTime) <= (parseInt(timeFilter) + 1)) && (parseInt(appointmentTime) >= (parseInt(timeFilter) - 1))
      })
    );
    const docs = filteredDocs.length ? filteredDocs : doctors;
    setFilteredDoctors(docs);
  }, [timeFilter, doctors, dateFilter])

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

          <div className="basis-1/2 h-full">
            <div className="flex justify-between">
              <input
                placeholder="Select date"
                onChange={(e) => setDateFilter(e.target.value)}
                type="date"
                className="p-4 h-[50px] w-[160px] rounded-md border border-neutral-800 border-opacity-30"
              />
              <input
                placeholder="Select time range"
                onChange={(e) => setTimeFilter(e.target.value)}
                type="time"
                className="p-4 h-[50px] w-[160px] rounded-md border border-neutral-800 border-opacity-30"
              />
              <input
                placeholder="Select expertise"
                className="p-4 h-[50px] w-[160px] rounded-md border border-neutral-800 border-opacity-30"
              />
            </div>
            <div className="overflow-y-scroll max-h-[80vh]">
              {filteredDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  setAppointment={setAppointment}
                  doctor={doctor}
                  setShowModal={setShowModal}
                  showModal={showModal}
                  doctors={filteredDoctors}
                  setDoctors={setFilteredDoctors}
                />
              ))}
            </div>
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

export default WithAuth(Doctors);
