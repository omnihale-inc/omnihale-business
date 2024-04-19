"use client";

import { useEffect, useState } from "react";

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
    appointmentsHandler();
    fieldsHandler();
  }, []);

  const appointmentsHandler = () => {
    // Fetch the appointments
    const token = localStorage.getItem("token");
    const options = {
      // Set the headers
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    fetch("http://127.0.0.1:8000/appointments", options)
      .then((data) => {
        // Check if the token is valid
        if (data.status === 422 || data.status === 401) {
          localStorage.removeItem("token");
          location.href = "/auth";
        } else {
          // Set the token status to true
          setIsTokenOk(true);
        }
        // Return the data
        return data.json();
      })
      .then((data) => {
        console.log(data);
        // Set the data
        setData({ appointments: data });
      });
  };

  const fieldsHandler = () => {
    // Fetch the fields
    const token = localStorage.getItem("token");
    // Get the fields from the local storage
    const fields = localStorage.getItem("fields");
    const options = {
      // Set the headers
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    // Check if the fields are not in the local storage
    if (!fields) {
      // Fetch the fields
      fetch("http://127.0.0.1:8000/fields", options)
        .then((data) => {
          // Check if the token is valid
          if (data.status === 422 || data.status === 401) {
            localStorage.removeItem("token");
            location.href = "/auth";
          } else {
            // Set the token status to true
            setIsTokenOk(true);
          }
          // Return the data
          return data.json();
        })
        .then((data) => {
          console.log(data);
          // Set the fields
          setFields(data);
          // Set the fields in the local storage
          localStorage.setItem("fields", JSON.stringify(data));
          console.log(localStorage.getItem("fields"));
        });
    } else {
      // Set the fields from local storage
      setFields(JSON.parse(fields));
      console.log(JSON.parse(fields));
    }
  };

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
