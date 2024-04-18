"use client";

import { useEffect, useState } from "react";

import HomeContents from "@/components/HomeContents";
import Header from "@/components/Header";
import AddAppointmentModal from "@/components/AddAppointmentModal";
import AddAppointmentModalChildren from "@/components/AddAppointmentModalChildren";
import withAuthenticated from "@/components/withAuthenticated";

const data = {
  appointments: [
    {
      id: 1,
      patientName: "John Doe",
      doctorName: "Dr. Smith",
      appointmentDate: "2022-09-01",
      appointmentTime: "10:00 AM",
    },
    {
      id: 1,
      name: "John Doe",
      age: 30,
      email: "johndoe@example.com",
    },
    {
      id: 2,
      patientName: "Jane Smith",
      doctorName: "Dr. Johnson",
      appointmentDate: "2022-09-02",
      appointmentTime: "11:30 AM",
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 25,
      email: "janesmith@example.com",
    },
    {
      id: 3,
      name: "Mike Johnson",
      age: 35,
      email: "mikejohnson@example.com",
    },
    {
      id: 3,
      patientName: "Michael Brown",
      doctorName: "Dr. Davis",
      appointmentDate: "2022-09-03",
      appointmentTime: "2:15 PM",
    },
  ],
};

function HomePage() {
  const [modal, setModal] = useState(false);
  useEffect(() => {
    // Check if the user is coming from the add-appointment page
    if (localStorage.getItem("add-appointment") === "true") {
      // Open the modal if the user is coming from the add-appointment page
      setModal(true);
      history.pushState({}, "", "/add-appointment");
      localStorage.setItem("add-appointment", "false");
    }
  }, []);
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };
  //   fetch("http://127.0.0.1:8000/appointments", options);
  // }, []);
  return (
    <main className="pt-10 w-11/12  mx-auto">
      <Header />
      <HomeContents data={data} onModal={setModal} />
      {modal && (
        <AddAppointmentModal>
          <AddAppointmentModalChildren onModal={setModal} />
        </AddAppointmentModal>
      )}
    </main>
  );
}

export default withAuthenticated(HomePage);
