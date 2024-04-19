"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

import HomeContents from "@/components/HomeContents";
import Header from "@/components/Header";
import AddAppointmentModal from "@/components/AddAppointmentModal";
import AddAppointmentModalChildren from "@/components/AddAppointmentModalChildren";
import withAuthenticated from "@/components/withAuthenticated";

function HomePage() {
  const [modal, setModal] = useState(false);
  const [isTokenOk, setIsTokenOk] = useState(false);
  const [data, setData] = useState({ appointments: [] });
  const [fields, setFields] = useState([]);
  const [addAppointment, setAddAppointment] = useState({});

  useEffect(() => {
    // Check if the user is coming from the add-appointment page
    if (localStorage.getItem("add-appointment") === "true") {
      // Open the modal if the user is coming from the add-appointment page
      setModal(true);
      history.pushState({}, "", "/add-appointment");
      localStorage.setItem("add-appointment", "false");
    }
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    fetch("http://127.0.0.1:8000/appointments", options)
      .then((data) => {
        if (data.status === 422 || data.status === 401) {
          localStorage.removeItem("token");
          location.href = "/auth";
        } else {
          setIsTokenOk(true);
        }
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setData({ appointments: data });
      });
  }, []);

  return isTokenOk ? (
    <main className="pt-10 w-11/12  mx-auto">
      <Header />
      <HomeContents data={data} onModal={setModal} />
      {modal && (
        <AddAppointmentModal>
          <AddAppointmentModalChildren
            addAppointment={addAppointment}
            fields={fields}
            setAddAppointment={setAddAppointment}
            onModal={setModal}
          />
        </AddAppointmentModal>
      )}
    </main>
  ) : (
    <div></div>
  );
}

export default withAuthenticated(HomePage);
