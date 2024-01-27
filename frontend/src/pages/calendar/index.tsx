import React from "react";
import Calendar from "../../components/Calendar/Calendar";

export default function CalendarPage() {
  return (
    <main className={`min-h-screen items-center relative z-[99999999999]`}>
      <Calendar />
    </main>
  );
}
