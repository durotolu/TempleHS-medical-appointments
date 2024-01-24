import React, { useState, useEffect } from "react";
import CardComponent from "../../components/CardComponent";
import Login from "../../components/Login";
import exp from "constants";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [updateUser, setUpdateUser] = useState({ id: "", name: "", email: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/users`);
        const data = await response.json();
        console.log("users", data);
        setUsers(data.reverse());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const createAppointment = async () => {
    const appointment = {
      id: 1,
      type: "check up w/ Leo Stanton",
      appointment: "2024-01-20T12:43:39.017Z",
      doctor_id: 1,
      user_id: 1,
    };
    try {
      const response = await fetch(`${apiUrl}/api/appointments/1`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointment),
      });
      const data = await response.json();
      console.log(data);
      // setUsers([data, ...users]);
      // setNewUser({ name: "", email: "" });
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  return (
    <main className={`min-h-screen items-center  p-16`}>
      <Login />
    </main>
  );
}
