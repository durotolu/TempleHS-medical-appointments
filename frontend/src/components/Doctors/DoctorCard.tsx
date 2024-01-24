import React from "react";
import { LeftArrow } from "../Icons/LeftArrow";
import { RightArrow } from "../Icons/RightArrow";
import { Appointment } from "../AppointmentModal";
import { Doctor } from "./Doctors";

interface Card {
  doctor: Doctor;
  doctors: Doctor[];
  setAppointment: (appointments: Appointment) => void;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  setDoctors: (doctors: Doctor[]) => void;
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

const DoctorCard = ({
  doctor: { id, bio, title, photo, in_person, name, appointments },
  setAppointment,
  setShowModal,
  showModal,
  doctors,
  setDoctors,
}: Card) => (
  <div key={id} className="rounded-lg shadow mt-3">
    <div className="w-full flex justify-end">
      <div className="w-[183px] h-7 px-[17px] py-[2px] bg-emerald-100 justify-center gap-2.5 inline-flex">
        <div className="text-green-700 text-base font-semibold font-['General Sans'] leading-relaxed">
          {in_person ? "In-person visit only" : "Virtual visit only"}
        </div>
      </div>
    </div>
    <div className="px-4 pb-4">
      <div className="flex">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="w-[75px] h-15 rounded-[106px] mr-3"
          src={photo || "https://via.placeholder.com/83x80"}
          alt="doctor"
        />
        <div className="flex flex-col">
          <div className="justify-start items-start inline-flex">
            <div className="grow shrink basis-0 text-green-950 text-[22px] font-medium font-['General Sans'] leading-[44.80px]">
              {name}
            </div>
          </div>
          <div className="justify-start items-start inline-flex">
            <div className="grow shrink basis-0 text-green-950 text-md font-normal font-['General Sans'] leading-[28.80px]">
              {title}
            </div>
          </div>
        </div>
      </div>
      <div className="text-green-950 text-base font-normal font-['General Sans'] leading-relaxed my-2">
        {bio}
      </div>
      <div className="justify-start items-start inline-flex">
        <div className="grow shrink basis-0 text-green-950 text-md font-medium font-['General Sans'] leading-[18.80px]">
          Next Available Slots
        </div>
      </div>
      <div className="justify-start items-start gap-3.5 inline-flex my-2 w-full">
        {appointments.map(({ id: appId, time, visible }) => {
          const dateObj = new Date(time);
          const today = new Date();
          const day =
            dateObj.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)
              ? "Today"
              : `${dayOfWeek[dateObj.getDay() as keyof typeof dayOfWeek]} ${
                  dateObj.getMonth() + 1
                }/${dateObj.getDate()}`;
          return (
            <button
              key={appId}
              className={`w-[150px] px-3 py-[8px] rounded-[80px] border border-neutral-800 border-opacity-30 justify-center items-center gap-2.5 flex duration-700 ease-in-out ${
                !visible && "hidden"
              }`}
              onClick={() => {
                setAppointment({
                  id: appId,
                  appointment: time,
                  type: "",
                  doctor_id: id,
                  user_id: parseInt(localStorage.getItem("user_id") as string),
                });
                setShowModal(!showModal);
              }}
            >
              <div>
                <span className="text-green-950 text-sm font-normal font-['General Sans'] leading-[28.80px]">
                  {day},{" "}
                </span>
                <span className="text-green-950 text-sm font-normal font-['General Sans'] leading-[28.80px]">
                  3:00PM
                </span>
              </div>
            </button>
          );
        })}
        {appointments.length > 3 && (
          <div className="w-[101px] h-10 justify-start items-start gap-[21px] inline-flex">
            <button
              disabled={appointments[0].visible}
              onClick={() => {
                const laststVisibleIndex = appointments.findLastIndex(
                  (appointment) => appointment.visible
                );
                const nextHiddenIndex = laststVisibleIndex - 3;
                const newAppointments = [...appointments];
                newAppointments[laststVisibleIndex] = {
                  ...newAppointments[laststVisibleIndex],
                  visible: false,
                };
                newAppointments[nextHiddenIndex] = {
                  ...newAppointments[nextHiddenIndex],
                  visible: true,
                };

                const doctorIndex = doctors.findIndex(
                  (doctor) => doctor.id === id
                );
                doctors[doctorIndex].appointments = [...newAppointments];
                setDoctors([...doctors]);
              }}
              className={`${appointments[0].visible && "opacity-20"}`}
            >
              <LeftArrow />
            </button>
            <button
              disabled={appointments[appointments.length - 1].visible}
              className={`${
                appointments[appointments.length - 1].visible && "opacity-20"
              }`}
              onClick={() => {
                const firstVisibleIndex = appointments.findIndex(
                  (appointment) => appointment.visible
                );
                const nextHiddenIndex = firstVisibleIndex + 3;
                const newAppointments = [...appointments];
                newAppointments[firstVisibleIndex] = {
                  ...newAppointments[firstVisibleIndex],
                  visible: false,
                };
                newAppointments[nextHiddenIndex] = {
                  ...newAppointments[nextHiddenIndex],
                  visible: true,
                };

                const doctorIndex = doctors.findIndex(
                  (doctor) => doctor.id === id
                );
                doctors[doctorIndex].appointments = [...newAppointments];
                setDoctors([...doctors]);
              }}
            >
              <RightArrow />
            </button>
          </div>
        )}
      </div>
      <div className="justify-start items-start inline-flex">
        <div className="grow shrink basis-0 text-green-600 text-md font-medium font-['General Sans'] leading-[28.80px]">
          Check Full profile and availability
        </div>
      </div>
    </div>
  </div>
);

export default DoctorCard;
