"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import { socket } from "@/socket";

type HomeContentsProps = {
  onModal: (value: boolean) => void;
};

const URL =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8000"
    : "https://api.omnihale.com";

const HomeContents = ({ onModal }: HomeContentsProps) => {
  const [data, setData] = useState<{ appointments: object[] }>({
    appointments: [],
  });
  const [loadingAppointment, setLoadingAppointment] = useState(true);

  useEffect(() => {
    socket.on("appointments", (data) => {
      const id = localStorage.getItem("user_id");
      if (id === data[1]) {
        localStorage.setItem(
          "appointments",
          JSON.stringify({ appointments: data[0] })
        );
        const userAppointments = localStorage.getItem("appointments");
        if (userAppointments) setData(JSON.parse(userAppointments));
      }
    });
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const options: RequestInit = {
      // Set the headers
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    fetch(`${URL}/appointments`, options)
      .then((data) => {
        // Check if the token is valid
        if (data.status === 422 || data.status === 401) {
          localStorage.removeItem("token");
          location.href = "/auth";
        }
        // Return the data
        return data.json();
      })
      .then((data) => {
        // For some weird reason data here gets sorted in ascending order
        console.log(data);
        if (typeof data === "object") {
          setData({ appointments: data });
          setLoadingAppointment(false);
        }
      });
  }, []);
  return (
    <>
      <section className=" lg:flex lg:justify-end">
        <a href="/configure-appointment" className="mr-2">
          <Button backgroundColor="bg-blue-700">Configure Appointment</Button>
        </a>
        <Button
          backgroundColor="bg-green-700"
          onClick={() => {
            onModal(true);
            // Change the URL to "/add-appointment" without actually
            // navigating to a different page
            history.pushState({}, "", "/add-appointment");
          }}
        >
          Add Appointment
        </Button>
      </section>
      <section className="mb-6 lg:w-10/12 mx-auto overflow-x-scroll lg:overflow-x-auto">
        <h2 className="mt-16 mb-5 text-2xl font-semibold">Appointments</h2>
        {loadingAppointment && <p className="my-3">Loading Appointments...</p>}
        {/*display the appointments*/}
        <ul className="text-xs lg:text-base">
          {
            // map through the appointments and display them
            data.appointments.map((appointment, index) => {
              console.log(appointment);
              return (
                <li className="mb-2" key={index}>
                  <ul className="flex border border-gray-400 w-fit rounded-lg shadow-md">
                    {
                      // map through the appointment and display the details
                      Object.entries(appointment).map(
                        // display the details in a list
                        (appointmentItem, itemIndex) =>
                          appointmentItem[0] !== "userId" && (
                            <li
                              className={`px-4 py-2 ${
                                itemIndex !==
                                Object.entries(appointment).length - 2
                                  ? "border-r"
                                  : ""
                              } border-gray-400 flex flex-col justify-center w-44 md:w-fit`}
                              key={itemIndex}
                            >
                              <h6 className="text-xs text-gray-500">
                                {appointmentItem[0]}
                              </h6>
                              <p className="text-lg">{appointmentItem[1]}</p>
                            </li>
                          )
                      )
                    }
                  </ul>
                </li>
              );
            })
          }
        </ul>
      </section>
    </>
  );
};

export default HomeContents;
