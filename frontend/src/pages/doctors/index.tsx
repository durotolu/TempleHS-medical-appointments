import React, { useState, useEffect } from "react";
import CardComponent from "../../components/CardComponent";
import Doctors from "../../components/Doctors";
import exp from "constants";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function DoctorsPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [updateUser, setUpdateUser] = useState({ id: "", name: "", email: "" });

  useEffect(() => {
    const fetchDoctorsAvailable = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/doctors`);
        const data = await response.json();
        console.log("doctors", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDoctorsAvailable();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`${apiUrl}/api/users`);
  //       const data = await response.json();
  //       console.log("users", data);
  //       setUsers(data.reverse());
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <main className={`min-h-screen items-center`}>
      <Doctors />
    </main>
  );
}
