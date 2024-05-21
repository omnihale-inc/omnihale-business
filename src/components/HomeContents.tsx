"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import { socket } from "@/utils/socket";

type HomeContentsProps = {
  onModal: (value: boolean) => void;
};

const URL =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8000"
    : "https://api.omnihale.com";

/**
 * Represents the HomeContents component.
 * @param {Object} onModal - The onModal function.
 * @returns {JSX.Element} The rendered HomeContents component.
 */
const HomeContents = ({ onModal }: HomeContentsProps) => {
  const [data, setData] = useState<
    { date: string; appointments: Array<object> }[]
  >([]);
  const [loadingAppointment, setLoadingAppointment] = useState(true);

  useEffect(() => {
    socket.on("appointments", (data) => {
      const id = localStorage.getItem("user_id");
      if (id === data[1]) {
        localStorage.setItem("appointments", JSON.stringify(data[0]));
        const userAppointments = localStorage.getItem("appointments");
        if (userAppointments) {
          setData(parseUserAppointments(userAppointments));
        }
      }
    });
  });

  useEffect(() => {
    const id = localStorage.getItem("user_id");
    socket.emit("initial-appointments", id);
    setLoadingAppointment(false);
  }, []);

  /**
   * Handles the click event of the Add Appointment button.
   * @param {boolean} value - The value to pass to the onModal function.
   */
  const handleAddAppointmentClick = (value: boolean) => {
    onModal(value);
    // Change the URL to "/add-appointment" without actually navigating to a different page
    history.pushState({}, "", "/add-appointment");
  };

  return (
    <>
      <AppointmentControls
        handleAddAppointmentClick={handleAddAppointmentClick}
      />
      <AppointmentsList loadingAppointment={loadingAppointment} data={data} />
    </>
  );
};

export default HomeContents;

function parseUserAppointments(
  userAppointments: string
): React.SetStateAction<{ date: string; appointments: Array<object> }[]> {
  return JSON.parse(userAppointments).map((data: any) => {
    const appointments = removeDateAndRemoteField(data);
    return { date: data.date, appointments };
  });

  function removeDateAndRemoteField(data: any) {
    return data.appointments.map((appointment: any) => {
      delete appointment.date;
      delete appointment.remote;
      return appointment;
    });
  }
}

function AppointmentControls({
  handleAddAppointmentClick,
}: {
  handleAddAppointmentClick: (value: boolean) => void;
}) {
  return (
    <section className=" lg:flex lg:justify-end">
      <a href="/configure-appointment" className="mr-2">
        <Button backgroundColor="bg-blue-700">Configure Appointment</Button>
      </a>
      <Button
        backgroundColor="bg-green-700"
        onClick={() => handleAddAppointmentClick(true)}
      >
        Add Appointment
      </Button>
    </section>
  );
}

function AppointmentsList({
  loadingAppointment,
  data,
}: {
  loadingAppointment: boolean;
  data: Array<{
    date: string;
    appointments: Array<object>;
  }>;
}) {
  return (
    <section className="mb-6 lg:w-10/12 mx-auto overflow-x-scroll lg:overflow-x-auto">
      <h2 className="mt-16 mb-5 text-2xl font-semibold">Appointments</h2>
      {loadingAppointment && data.length < 0 && (
        <p className="my-3">Loading Appointments...</p>
      )}
      <ul className="text-xs lg:text-base">
        {
          // map through the appointments and display them
          data.map((appointmentGroup, index) => {
            return (
              <li className="mb-2" key={index}>
                <h5 className="mb-4 mt-8 text-sm lg:text-lg">
                  {appointmentGroup.date}
                </h5>
                {appointmentGroup.appointments.map(
                  (appointment, appointmentIndex) => (
                    <AppointmentItem
                      key={appointmentIndex}
                      appointmentIndex={appointmentIndex}
                      appointment={appointment}
                    />
                  )
                )}
              </li>
            );
          })
        }
      </ul>
    </section>
  );
}

function AppointmentItem({
  appointment,
  appointmentIndex,
}: {
  appointmentIndex: number;
  appointment: object;
}): React.JSX.Element {
  return (
    <ul
      className="flex border border-gray-400 w-fit rounded-lg shadow-md mb-2"
      key={appointmentIndex}
    >
      {
        // map through the appointment and display the details
        Object.entries(appointment).map(
          // display the details in a list
          (appointmentItem, itemIndex) => (
            <li
              className={`px-4 py-2 ${
                itemIndex !== Object.entries(appointment).length - 1
                  ? "border-r"
                  : ""
              } border-gray-400 flex flex-col justify-center w-44 md:w-fit`}
              key={itemIndex}
            >
              <h6 className="text-xs text-gray-500">{appointmentItem[0]}</h6>
              <p className="text-lg">{appointmentItem[1]}</p>
            </li>
          )
        )
      }
    </ul>
  );
}
