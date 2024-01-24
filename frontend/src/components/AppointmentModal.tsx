import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";

export interface Appointment {
  appointment: string;
  type: string;
  doctor_id: number | null;
  user_id: number | null;
  id: number | null;
}

export default function AppointmentModal({
  showModal,
  appointment,
  setShowModal,
}: {
  showModal: boolean;
  appointment: Appointment;
  setShowModal: (show: boolean) => void;
}) {
  const apiUrl: string =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const bookAppointment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const appointmentDetails: Appointment = {
      ...appointment,
      type: formData.get("type") as string,
    };

    try {
      const response = await fetch(
        `${apiUrl}/api/appointments/${appointmentDetails.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token") as string,
          },
          body: JSON.stringify(appointmentDetails),
        }
      );

      console.log(response)

      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(
          errorDetails.message || "Failed to submit the data. Please try again."
        );
      }
      router.push("/calendar");
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      setError(message);
    }
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none p-6">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Book Appointment</h3>
                </div>
                <div className="relative p-6 flex-auto">
                  <form
                    onSubmit={bookAppointment}
                    className="flex-col w-full max-w-[500px] justify-start items-center gap-7 inline-flex"
                  >
                    <div className="w-full h-24">
                      <div className="text-black text-lg font-normal font-['General Sans'] mb-2">
                        Reason for appointment
                      </div>
                      <input
                        placeholder="Check up"
                        name="type"
                        type="text"
                        required
                        className="w-[300px] h-[60px] p-3 rounded-md border border-stone-300"
                      />
                    </div>
                    <div className="h-2" style={{ color: "red" }}>
                      {error}
                    </div>
                    <div className="h-10 self-end flex items-center justify-between p-6 rounded-b">
                      <button
                        className="text-red-500 border background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mr-4"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-green-700 rounded-[40px] justify-center items-center gap-2.5 flex"
                      >
                        <div className="text-stone-50 text-sm font-medium font-['General Sans'] leading-snug">
                          Create Appointment
                        </div>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
