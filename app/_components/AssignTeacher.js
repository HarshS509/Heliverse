"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { assignTeacherAction } from "../_lib/action";
import { toast } from "react-toastify";

const AssignTeacherForm = ({ classrooms, teachers }) => {
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
  const [state, action] = useFormState(assignTeacherAction, initialState);
  const { pending } = useFormStatus();

  useEffect(
    function () {
      if (state.success) {
        // console.log("reached toast success");
        toast.success(state.message);

        router.push("/dashboard/teachers");
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
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white border border-gray-300 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Assign Teacher to Classroom
        </h1>
        <form action={action} className="space-y-4">
          <div>
            <label
              htmlFor="teacherId"
              className="block text-sm font-medium text-gray-700"
            >
              Teacher
            </label>
            <select
              id="teacherId"
              name="teacherId"
              // value={formData.teacherId}
              // onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select a teacher</option>
              {/* TODO: Populate with actual teacher data */}
              {teachers.map((teacher) => (
                <option key={teacher?._id} value={teacher?._id}>
                  {`${teacher.firstName} ${teacher.lastName}`}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="classroomId"
              className="block text-sm font-medium text-gray-700"
            >
              Classroom
            </label>
            <select
              id="classroomId"
              name="classroomId"
              // value={formData.classroomId}
              // onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select a classroom</option>
              {classrooms.map((classroom) => (
                <option key={classroom?._id} value={classroom?._id}>
                  {classroom?.name}
                </option>
              ))}
              {/* TODO: Populate with actual classroom data */}
            </select>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Assign Teacher
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssignTeacherForm;
