"use client";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
// import userState from "../_utils/user-state";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { addClassRoom } from "@/app/_lib/action";
import userState from "@/app/_utils/user-state";

const weekdayStartTimes = ["12:00"];
const weekdayEndTimes = ["18:00"];
const saturdayStartTimes = ["12:00"];
const saturdayEndTimes = ["16:00"];
export default function Page() {
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
  const [state, action] = useFormState(addClassRoom, initialState);
  const { pending } = useFormStatus();

  useEffect(
    function () {
      if (state.success) {
        // console.log("reached toast success");
        toast.success(state.message);

        router.push("/dashboard/classrooms");
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
        <h2 className="text-xl font-semibold mb-4">Add Classroom</h2>

        {/* Name Input */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-1"
          >
            Classroom Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Weekday Timings */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Weekday Timings</h3>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label
                htmlFor="weekdayStartTime"
                className="block text-gray-700 font-medium mb-1"
              >
                Start Time
              </label>
              <select
                id="weekdayStartTime"
                name="weekdayStartTime"
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                {weekdayStartTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label
                htmlFor="weekdayEndTime"
                className="block text-gray-700 font-medium mb-1"
              >
                End Time
              </label>
              <select
                id="weekdayEndTime"
                name="weekdayEndTime"
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                {weekdayEndTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Saturday Timings */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Saturday Timings</h3>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label
                htmlFor="saturdayStartTime"
                className="block text-gray-700 font-medium mb-1"
              >
                Start Time
              </label>
              <select
                id="saturdayStartTime"
                name="saturdayStartTime"
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                {saturdayStartTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label
                htmlFor="saturdayEndTime"
                className="block text-gray-700 font-medium mb-1"
              >
                End Time
              </label>
              <select
                id="saturdayEndTime"
                name="saturdayEndTime"
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                {saturdayEndTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
        >
          Add Classroom
        </button>
      </form>
    </div>
  );
}
