import React, { Component } from "react";

import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
} from "@syncfusion/ej2-react-schedule";
import { Appointment } from "./Calendar";

const SchedulerComponent = ({events}: {events: Appointment[]}) => {
  return (
    <ScheduleComponent
      currentView="Month"
      eventSettings={{
        dataSource: events,
      }}
    >
      <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
    </ScheduleComponent>
  );
};

export default SchedulerComponent;
