"use client";
import { getStudentById, updateStudentAction } from "@/app/_lib/action";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "react-toastify";

const ModifyStudentForm = () => {
  const { studentId } = useParams(); // Assume you're using URL parameters to get the student ID
  // console.log(studentId);
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

  const [state, action] = useFormState(updateStudentAction, initialState);
  const { pending } = useFormStatus();
  const router = useRouter();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const data = await getStudentById(studentId);
        // console.log(data);
        // Fetch the current student data
        setStudent(data.data.data.student);
      } catch (error) {
        console.error("Failed to fetch student data:", error);
        toast.error("Failed to load student data");
      }
    };

    fetchStudent();
  }, [studentId]);

  useEffect(() => {
    if (state?.success) {
      toast.success(state?.message);
      router.push("/teacher");
    }
    if (state?.success === false) {
      toast.error(state?.message);
    }
  }, [state]);

  if (!student) {
    return <p>Loading...</p>; // Loading state while fetching data
  }

  return (
    <div className="w-full mx-auto my-auto max-w-md p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
      <form action={action}>
        <input type="hidden" value={studentId} name="studentId" />
        <h2 className="text-xl font-semibold mb-4">Modify Student</h2>

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
            defaultValue={student.firstName} // Set default value from fetched data
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
            defaultValue={student.lastName} // Set default value from fetched data
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
            defaultValue={student.email} // Set default value from fetched data
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
          Update Student
        </button>
      </form>
    </div>
  );
};

export default ModifyStudentForm;
