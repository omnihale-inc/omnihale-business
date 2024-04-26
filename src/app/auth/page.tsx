"use client";

import { ChangeEventHandler, useEffect, useState } from "react";

import SignUp from "@/components/SignUp";
import Login from "@/components/Login";
import { redirect } from "next/navigation";
import { LoginCredentials, SignUpCredentials } from "@/types/authCredentials";
import AuthInput from "@/components/Input";
import React from "react";

const URL =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8000"
    : "https://api.omnihale.com";

export default function AuthPage() {
  // State for sign up form fields
  const [signUp, setSignUp] = useState<SignUpCredentials>({
    name: "",
    address: "",
    state: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State for login form fields
  const [login, setLogin] = useState<LoginCredentials>({
    email: "",
    password: "",
  });

  // State for rendering sign up or login component
  const [isUserSignUp, setIsUserSignUp] = useState(true);
  const [isUserLogin, setIsUserLogin] = useState(true);

  // State for login error response
  const [loginErrorResponse, setLoginErrorResponse] = useState<string | null>(
    null
  );

  // State for sign up form errors
  const [errors, setErrors] = useState({
    invalidEmail: false,
    passwordNotSame: false,
    invalidPassword: false,
    empty: false,
  });

  // State for sign up error response
  const [signUpErrorResponse, setSignUpErrorResponse] = useState<string | null>(
    null
  );

  // State for disabling the sign up button
  const [disableButton, setDisabledButton] = useState(false);

  // State for disabling the login button
  const [disableLoginButton, setDisabledLoginButton] = useState(false);

  // Checks if the user is logged in
  useEffect(() => {
    // Redirects the user to the dashboard if the user is logged in
    if (!localStorage.getItem("token")) {
      setIsUserLogin(false);
    } else {
      redirect("/");
    }
  }, []);

  // Handles sign up form field changes
  const onChangeHandlerSignUp: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSignUp((state) => ({ ...state, [name]: value }));
  };

  // Sign up component props
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

  // Login component props
  const loginProps = {
    fields: login,
    onUserSignUp: setIsUserSignUp,
    loginHandler,
    errorErrorResponse: loginErrorResponse,
    setErrorResponse: setLoginErrorResponse,
    disableLoginButton,
    onDisabledLoginButton: setDisabledLoginButton,
    setIsUserLogin,
  };

  // Renders sign up or login component based on user selection
  if (!isUserLogin) {
    if (!isUserSignUp) {
      // Renders the sign up form
      return (
        <SignUp {...signUpProps}>
          {Object.entries(signUp).map((value, index) => {
            const { fieldType, placeholder } = getPlaceHolderandFieldType(
              value[0]
            );
            return (
              <React.Fragment key={index}>
                {value[0] === "state" ? (
                  // Renders a select field for the state
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
                      onChange={(e) => {
                        onChangeHandlerSignUp(e);
                        setSignUpErrorResponse(null);
                      }}
                      placeholder={placeholder}
                      value={value[0]}
                    />
                    {value[0] === "password" && (
                      <p className="text-xs mb-4">
                        8 or more character password
                      </p>
                    )}
                  </>
                )}
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
                  const name = e.target.name;
                  const value = e.target.value;
                  setLogin((state) => ({ ...state, [name]: value }));
                  setErrors({
                    invalidEmail: false,
                    passwordNotSame: false,
                    invalidPassword: false,
                    empty: false,
                  });
                  setLoginErrorResponse(null);
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
  const placeholder = value === "confirmPassword" ? "confirm password" : value;
  const fieldType =
    value === "password" || value === "confirmPassword"
      ? "password"
      : value === "email"
      ? "email"
      : "text";
  return { placeholder, fieldType };
};

// Handles the login request
const loginHandler = (
  loginCredentials: LoginCredentials,
  setIsUserLogin: (value: boolean) => void,
  setErrorResponse: (value: string | null) => void,
  setDisbaledLoginButton: (value: boolean) => void
) => {
  fetch(`${URL}/login`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ login: loginCredentials }),
    method: "POST",
  })
    .then((data) => {
      if (data.status === 200) {
        location.href = "/";
      }
      if (data.status === 401) {
        setErrorResponse("Invalid credentials");
        setDisbaledLoginButton(false);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("fields");
        localStorage.removeItem("user_id");
      }
      return data.json();
    })
    .then((data) => {
      if (!data.message) {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user_id", data.user);
      }
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
  fetch(`${URL}/signup`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ signUp: signUpCredentials }),
    method: "POST",
  })
    .then((data) => {
      if (data.status === 200) {
        setUserSignUp(true);
      }
      if (data.status === 409) {
        setErrorResponse("information already exists");
        setDisableButton(false);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
