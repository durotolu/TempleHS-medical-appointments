import React, { useEffect, useState } from "react";
import { Logo } from "./Icons/Logo";
import { AppointmentIcon } from "./Icons/AppointmentIcon";
import { DashboardIcon } from "./DashboardIcon";
import { Bell } from "./Icons/Bell";
import { LeftArrow } from "./Icons/LeftArrow";
import { RightArrow } from "./Icons/RightArrow";
import { BackArrow } from "./Icons/BackArrow";
import AppointmentModal, { Appointment } from "./AppointmentModal";

interface Appointments {
  id: number;
  time: string;
  visible: boolean;
}

interface Doctor {
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

// const Doctors: React.FC<{ card: Card }> = ({ card }) => {
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
        console.log(dataVisible);
        setDoctors(dataVisible);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDoctorsAvailable();
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
      <div className="flex-col justify-start items-start gap-6 inline-flex">
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
              Pelumi Alesh
            </div>
            <div className="w-[127px] left-[91px] top-[26px] absolute text-lime-900 text-sm font-normal font-['General Sans'] leading-snug">
              pelumi.al@mail.com
            </div>
          </div>
        </div>

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

            {doctors.map(
              ({ id, bio, title, photo, in_person, name, appointments }) => (
                <div key={id} className="rounded-lg shadow mt-3">
                  <div className="w-full flex justify-end">
                    <div className="w-[183px] h-7 px-[17px] py-[2px] bg-emerald-100 justify-center gap-2.5 inline-flex">
                      <div className="text-green-700 text-base font-semibold font-['General Sans'] leading-relaxed">
                        {in_person
                          ? "In-person visit only"
                          : "Virtual visit only"}
                      </div>
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    <div className="flex">
                      <img
                        className="w-[75px] h-15 rounded-[106px] mr-3"
                        src={photo || "https://via.placeholder.com/83x80"}
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
                          dateObj.setHours(0, 0, 0, 0) ===
                          today.setHours(0, 0, 0, 0)
                            ? "Today"
                            : `${
                                dayOfWeek[
                                  dateObj.getDay() as keyof typeof dayOfWeek
                                ]
                              } ${dateObj.getMonth() + 1}/${dateObj.getDate()}`;
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
                                user_id: parseInt(
                                  localStorage.getItem("user_id") as string
                                ),
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
                              const laststVisibleIndex =
                                appointments.findLastIndex(
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
                              doctors[doctorIndex].appointments = [
                                ...newAppointments,
                              ];
                              setDoctors([...doctors]);
                            }}
                            className={`${
                              appointments[0].visible && "opacity-20"
                            }`}
                          >
                            <LeftArrow />
                          </button>
                          <button
                            disabled={
                              appointments[appointments.length - 1].visible
                            }
                            className={`${
                              appointments[appointments.length - 1].visible &&
                              "opacity-20"
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
                              doctors[doctorIndex].appointments = [
                                ...newAppointments,
                              ];
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
              )
            )}
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
