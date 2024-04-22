"use client";

import { isEmail, isEmpty, isStrongPassword } from "validator";

import React from "react";
import Image from "next/image";
import { SignUpCredentials } from "@/types/authCredentials";

type Error = { code: number; msg?: string };

type FormError = {
  invalidEmail: boolean;
  passwordNotSame: boolean;
  invalidPassword: boolean;
  empty: boolean;
};

type SignUpProps = {
  fields: SignUpCredentials;
  onUserSignUp: (value: boolean) => void;
  signUpHandler: (
    signUpCredentials: SignUpCredentials,
    setUserSignUp: (value: boolean) => void,
    setErrorResponse: (value: string | null) => void,
    setDisableButton: (value: boolean | { (value: boolean): boolean }) => void
  ) => void;
  errors: FormError;
  setErrors: (value: FormError | { (state: FormError): FormError }) => void;
  errorResponse: string | null;
  setErrorResponse: (value: string | null) => void;
  disableButton: boolean;
  setDisabledButton: (value: boolean | { (value: boolean): boolean }) => void;
  children: React.ReactNode;
};

const SignUp = ({
  fields,
  onUserSignUp,
  signUpHandler,
  errors,
  setErrors,
  disableButton,
  setDisabledButton,
  errorResponse,
  setErrorResponse,
  children,
}: SignUpProps) => {
  return (
    <section className="grid place-items-center h-screen">
      <div className="w-1/6">
        <h3 className="text-center m-3 text-2xl font-semibold">Sign Up</h3>
        <p className="text-xs mb-5">
          Create an account for a healthcare provider
        </p>
        <form onSubmit={(e) => e.preventDefault()}>
          <FormErrorMessage errors={errors} />
          {errorResponse && (
            <p className="text-red-600 text-xs mb-2">{errorResponse}</p>
          )}
          {
            // maps through the fields and displays the input fields
            children
          }
          {disableButton && <span className="text-xs mb-1">loading...</span>}
          <div className="flex justify-center">
            <button
              className={`${
                disableButton ? "bg-blue-400" : "bg-blue-700"
              } my-3 px-4 py-2 text-white text-sm rounded-md`}
              disabled={disableButton}
              onClick={() => {
                signUpValidation(fields, (error) => {
                  setErrorHandler(
                    error,
                    setErrors,
                    signUpHandler,
                    setErrorResponse,
                    onUserSignUp,
                    fields,
                    setDisabledButton
                  );
                });
              }}
            >
              Create an account
            </button>
          </div>
        </form>
        <p className="text-xs text-left">
          Already have an account.
          <button
            className="text-blue-500 ml-1"
            onClick={() => onUserSignUp(true)}
          >
            login
          </button>
        </p>
        {/*logo and app name*/}
        <div className="flex justify-center items-center mt-10 mb-6">
          <Image
            src="/logo.svg"
            alt="Omnihale logo"
            width={30}
            height={30}
            className="mr-3 rounded-md"
          />
          <p className="font-semibold mr-1">Omnihale</p>
          <p className="text-gray-500">for Business</p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;

const FormErrorMessage = ({ errors }: { errors: FormError }) => {
  return (
    <ul className="mb-2">
      {errors.invalidEmail && (
        <li className="text-red-600 text-xs"> You entered an invalid email.</li>
      )}
      {errors.empty && (
        <li className="text-red-600 text-xs">Some fields are empty.</li>
      )}
      {errors.invalidPassword && (
        <li className="text-red-600 text-xs">Enter a valid password.</li>
      )}
      {errors.passwordNotSame && (
        <li className="text-red-600 text-xs">Passwords are not the same.</li>
      )}
    </ul>
  );
};

//
const signUpValidation = (
  fields: SignUpCredentials,
  errorHandler: (error: Error) => void
) => {
  if (!isEmail(fields.email)) {
    errorHandler({ code: 11, msg: "invalid email" });
    return;
  }
  if (fields.password !== fields.confirmPassword) {
    errorHandler({ code: 13, msg: "password doesn't match" });
    return;
  }
  if (
    !isStrongPassword(fields.password, {
      minLength: 8,
      minUppercase: 0,
      minSymbols: 0,
      minNumbers: 0,
      minLowercase: 0,
    })
  ) {
    errorHandler({ code: 14, msg: "invalid password" });
    return;
  }

  const arrayFields = Object.entries(fields);
  for (let value of arrayFields) {
    if (isEmpty(value[1])) {
      errorHandler({ code: 12, msg: "empty field" });
      return;
    }
  }

  errorHandler({ code: 99, msg: "no error" });
  return;
};

const setErrorHandler = (
  error: Error,
  setErrors: (value: FormError | { (state: FormError): FormError }) => void,
  signUpHandler: (
    fields: SignUpCredentials,
    setUserSignUp: (value: boolean) => void,
    setErrorResponse: (value: string | null) => void,
    setDisableButton: (value: boolean | { (value: boolean): boolean }) => void
  ) => void,
  setErrorResponse: (value: string | null) => void,
  setUserSignUp: (value: boolean) => void,
  signUpCredentials: SignUpCredentials,
  setDisableButton: (value: boolean | { (value: boolean): boolean }) => void
) => {
  //checks for invalid email
  error.code === 11
    ? setErrors((state) => ({ ...state, invalidEmail: true }))
    : setErrors((state) => ({ ...state, invalidEmail: false }));

  //checks for empty value
  error.code === 12
    ? setErrors((state) => ({ ...state, empty: true }))
    : setErrors((state) => ({ ...state, empty: false }));

  //checks for invalid password
  error.code === 14
    ? setErrors((state) => ({
        ...state,
        invalidPassword: true,
      }))
    : setErrors((state) => ({
        ...state,
        invalidPassword: false,
      }));

  //checks for empty value
  error.code === 13
    ? setErrors((state) => ({
        ...state,
        passwordNotSame: true,
      }))
    : setErrors((state) => ({
        ...state,
        passwordNotSame: false,
      }));

  //no error
  if (error.code === 99) {
    setDisableButton(true);
    signUpHandler(
      signUpCredentials,
      setUserSignUp,
      setErrorResponse,
      setDisableButton
    );
  }
};
