"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "react-toastify";
import { getTeacherById, updateTeacher } from "@/app/_lib/action"; // Import the function to fetch and update teacher data

const ModifyTeacherForm = () => {
  const { teacherId } = useParams(); // Assume you're using URL parameters to get the teacher ID
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

  const [state, action] = useFormState(updateTeacher, initialState);
  const { pending } = useFormStatus();
  const router = useRouter();
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const data = await getTeacherById(teacherId); // Fetch the current teacher data
        setTeacher(data);
      } catch (error) {
        console.error("Failed to fetch teacher data:", error);
        toast.error("Failed to load teacher data");
      }
    };

    fetchTeacher();
  }, [teacherId]);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.push("/dashboard/teachers");
    }
    if (state.success === false) {
      toast.error(state.message);
    }
  }, [state]);

  if (!teacher) {
    return <p>Loading...</p>; // Loading state while fetching data
  }

  return (
    <div className="w-full mx-auto my-auto max-w-md p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
      <form action={action}>
        <h2 className="text-xl font-semibold mb-4">Modify Teacher</h2>

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
            defaultValue={teacher.firstName} // Set default value from fetched data
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
            defaultValue={teacher.lastName} // Set default value from fetched data
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
            defaultValue={teacher.email} // Set default value from fetched data
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
            placeholder="Leave blank to keep current password" // Placeholder indicating optional field
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Weekday Timings */}

        {/* Saturday Timings */}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
        >
          Update Teacher
        </button>
      </form>
    </div>
  );
};

export default ModifyTeacherForm;
