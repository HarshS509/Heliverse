"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

import React from "react";
import {
  addClassRoom,
  registerStudent,
  registerTeacher,
} from "@/app/_lib/action";
import { toast } from "react-toastify";

const StudentForm = ({}) => {
  const initialState = {
    errors: {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
    },
    success: null,
    data: null,
    message: null,
    resetKey: Date.now(),
  };
  const router = useRouter();
  const [state, action] = useFormState(registerStudent, initialState);
  const { pending } = useFormStatus();

  useEffect(
    function () {
      if (state.success) {
        // console.log("reached toast success");
        toast.success(state.message);

        router.push("/dashboard/students");
        // setTimeout(() => {
        //   window.location.href = "/";
        // }, 500);
      }
      if (state.success === false) {
        toast.error(state.message);
      }
    },
    [state]
  );

  return (
    <div className="w-full mx-auto my-auto max-w-md p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
      <form action={action}>
        <h2 className="text-xl font-semibold mb-4">Register Student Profile</h2>

        {/* First Name Input */}
        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-gray-700 font-medium mb-1"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Last Name Input */}
        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-gray-700 font-medium mb-1"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Weekday Timings */}

        {/* Saturday Timings */}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
        >
          Add Student
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
