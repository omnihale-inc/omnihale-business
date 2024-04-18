"use client";

import { ChangeEventHandler, useEffect, useState } from "react";

import SignUp from "@/components/SignUp";
import Login from "@/components/Login";
import { redirect } from "next/navigation";
import { LoginCredentials, SignUpCredentials } from "@/types/authCredentials";
import AuthInput from "@/components/Input";
import React from "react";

export default function AuthPage() {
  const [signUp, setSignUp] = useState<SignUpCredentials>({
    name: "",
    address: "",
    state: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [login, setLogin] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  // Renders Login component when the user visit's the page
  const [isUserSignUp, setIsUserSignUp] = useState(true);
  const [isUserLogin, setIsUserLogin] = useState(false);

  // Login error response
  const [loginErrorResponse, setLoginErrorResponse] = useState<string | null>(
    null
  );

  // Sign up  form errors
  const [errors, setErrors] = useState({
    invalidEmail: false,
    passwordNotSame: false,
    invalidPassword: false,
    empty: false,
  });
  // Sign up error response
  const [signUpErrorResponse, setSignUpErrorResponse] = useState<string | null>(
    null
  );
  // Disables the sign up button
  const [disableButton, setDisabledButton] = useState(false);

  const onChangeHandlerSignUp: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => {
    // Adds appointment input fields to addAppointment state
    const name = e.target.name;
    const value = e.target.value;
    setSignUp((state) => ({ ...state, [name]: value }));
  };

  // Sign up props
  const signUpProps = {
    fields: signUp,
    onUserSignUp: setIsUserSignUp,
    signUpHandler,
    errors,
    setErrors,
    disableButton,
    setDisabledButton,
    errorResponse: signUpErrorResponse,
    setErrorResponse: setSignUpErrorResponse,
  };

  // Login props
  const loginProps = {
    fields: login,
    onUserSignUp: setIsUserSignUp,
    loginHandler,
    errorErrorResponse: loginErrorResponse,
    setErrorResponse: setLoginErrorResponse,
    setIsUserLogin,
  };

  // Redirects the user to the dashboard if the user is logged in
  if (isUserLogin) {
    return redirect("/");
  } else {
    // Checks if the user is not signed up
    if (!isUserSignUp) {
      // Renders the sign up form
      return (
        <SignUp {...signUpProps}>
          {Object.entries(signUp).map((value, index) => {
            // Gets the placeholder and field type
            const { fieldType, placeholder } = getPlaceHolderandFieldType(
              value[0]
            );
            return (
              <React.Fragment key={index}>
                {
                  // Renders a select field for the state
                  value[0] === "state" ? (
                    <select
                      className="mb-2 w-full text-xs px-4 py-2 border rounded-md text-gray-400"
                      name="state"
                      onChange={onChangeHandlerSignUp}
                      defaultValue="state"
                    >
                      <option value="state" disabled hidden>
                        state
                      </option>
                      <option value="Abuja">Abuja</option>
                      <option value="Kaduna">Kaduna</option>
                    </select>
                  ) : (
                    // Renders the input fields
                    <>
                      <AuthInput
                        key={index}
                        type={fieldType}
                        onChange={onChangeHandlerSignUp}
                        placeholder={placeholder}
                        value={value[0]}
                      />
                      {value[0] === "password" && (
                        <p className="text-xs mb-4">
                          8 or more character password
                        </p>
                      )}
                    </>
                  )
                }
              </React.Fragment>
            );
          })}
        </SignUp>
      );
    } else {
      // Renders the login form
      return (
        <Login {...loginProps}>
          {Object.entries(login).map((value, index) => {
            const { fieldType, placeholder } = getPlaceHolderandFieldType(
              value[0]
            );
            return (
              <AuthInput
                key={index}
                type={fieldType}
                placeholder={placeholder}
                onChange={(e) => {
                  // Adds appointment input fields to addAppointment state
                  const name = e.target.name;
                  const value = e.target.value;
                  setLogin((state) => ({ ...state, [name]: value }));
                }}
                value={value[0]}
              />
            );
          })}
        </Login>
      );
    }
  }
}

// Gets the placeholder and field type
const getPlaceHolderandFieldType = (value: string) => {
  console.log(value);
  const placeholder =
    // Checks if the value is password or confirm password
    value === "confirmPassword"
      ? // Sets the placeholder to confirm password
        "confirm password"
      : // Sets the placeholder to the value
        value;
  const fieldType =
    // Checks if the value is password or confirm password
    value === "password" || value === "confirmPassword"
      ? // Sets the field type to password
        "password"
      : // Sets the field type to email
      value === "email"
      ? // Sets the field type to email
        "email"
      : // Sets the field type to text
        "text";
  return { placeholder, fieldType };
};

// Handles the login request
const loginHandler = (
  loginCredentials: LoginCredentials,
  setIsUserLogin: (value: boolean) => void,
  setErrorResponse: (value: string | null) => void
) => {
  // Sends a post request to the server
  fetch("http://127.0.0.1:8000/login", {
    headers: {
      "Content-Type": "application/json",
    },
    // Sends the login credentials to the server
    body: JSON.stringify({ login: loginCredentials }),
    method: "POST",
  })
    .then((data) => {
      // Checks if the status is 200
      if (data.status === 200) {
        // Sets the user login to true
        setIsUserLogin(true);
      }
      // Checks if the status is 401
      if (data.status === 401) {
        // Sets the error response
        setErrorResponse("Invalid credentials");
      }
      return data.json();
    })
    .then((data) => {
      // Sets the token in the local storage
      localStorage.setItem("token", data.access_token);
      // Sets the user login to true
    })
    .catch((error) => {
      console.error(error);
    });
};

// Handles the sign up request
const signUpHandler = (
  signUpCredentials: SignUpCredentials,
  setUserSignUp: (value: boolean) => void,
  setErrorResponse: (value: string | null) => void,
  setDisableButton: (value: boolean | { (value: boolean): boolean }) => void
) => {
  // Sends a post request to the server
  fetch("http://127.0.0.1:8000/signup", {
    headers: {
      "Content-Type": "application/json",
    },
    // Sends the sign up credentials to the server
    body: JSON.stringify({ signUp: signUpCredentials }),
    method: "POST",
  })
    .then((data) => {
      // Checks if the status is 200
      if (data.status === 200) {
        setUserSignUp(true);
      }
      if (data.status === 409) {
        // Sets the error response
        setErrorResponse("information already exists");
        setDisableButton(false);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
