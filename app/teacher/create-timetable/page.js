"use client";
import { createTimeTableAction } from "@/app/_lib/action";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "react-toastify";

const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "Literature",
  "History",
  "Geography",
  "Art",
  "Music",
];

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const CustomSelect = ({ name, value, onChange, options, disabled }) => (
  <select
    name={name}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
    disabled={disabled}
  >
    <option value="">Select subject</option>
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

const TimetableForm = () => {
  const [timetable, setTimetable] = useState({});
  const initialState = {
    errors: {
      name: null,
    },
    success: null,
    data: null,
    message: null,
    resetKey: Date.now(),
  };
  const router = useRouter();
  const [state, action] = useFormState(createTimeTableAction, initialState);
  const { pending } = useFormStatus();

  useEffect(
    function () {
      if (state.success) {
        // console.log("reached toast success");
        toast.success(state.message);

        router.push("/teacher");
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

  const handleSubjectChange = (day, period, subject) => {
    setTimetable((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [period]: subject,
      },
    }));
  };

  const isSubjectAvailable = (day, subject) => {
    return !Object.values(timetable[day] || {}).includes(subject);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Timetable submitted:", timetable);
  };

  return (
    <div className="container flex mx-auto min-h-screen p-4 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
      <div className="container mx-auto p-6 max-w-4xl bg-white border border-gray-300 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Weekly Timetable
        </h1>
        <form action={action}>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left text-gray-700">Day</th>
                  {[...Array(6)].map((_, i) => (
                    <th key={i} className="border p-3 text-left text-gray-700">
                      {`${12 + i}:00 - ${13 + i}:00`}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.map((day) => (
                  <tr key={day} className="hover:bg-gray-50">
                    <td className="border p-3 font-semibold text-gray-800">
                      {day}
                    </td>
                    {[...Array(day === "Saturday" ? 4 : 6)].map((_, period) => (
                      <td key={period} className="border p-2">
                        <CustomSelect
                          name={`${day.toLowerCase()}_period_${period + 1}`}
                          value={timetable[day]?.[period] || ""}
                          onChange={(value) =>
                            handleSubjectChange(day, period, value)
                          }
                          options={subjects.filter(
                            (subject) =>
                              isSubjectAvailable(day, subject) ||
                              subject === timetable[day]?.[period]
                          )}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit Timetable
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TimetableForm;
