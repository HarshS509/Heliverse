"use client";
import {
  TrashIcon,
  PencilSquareIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { deleteTeacher } from "../_lib/action";
import { toast } from "react-toastify";

function Teachers({ sampleTeachers }) {
  const handleDelete = async (id) => {
    const response = await deleteTeacher(id);
    if (response.success) {
      // Update the list of teachers
      toast.success("Teacher deleted successfully");
    } else {
      toast.error("Failed to delete teacher");
    }
    // Implement delete logic
    // console.log("Delete teacher with id:", id);
  };

  const handleModify = (id) => {
    // Implement modify logic
    // console.log("Modify teacher with id:", id);
  };

  const handleAssignClassroom = (id) => {
    // Implement assign classroom logic
    // console.log("Assign classroom to teacher with id:", id);
  };

  return (
    <>
      <table className="w-full bg-gray-100 border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-200 border-b border-gray-300">
            <th className="py-3 px-4 text-center text-gray-600 font-semibold">
              First Name
            </th>
            <th className="py-3 px-4 text-center text-gray-600 font-semibold">
              Last Name
            </th>
            <th className="py-3 px-4 text-center text-gray-600 font-semibold">
              Email
            </th>
            <th className="py-3 px-4 text-center text-gray-600 font-semibold">
              Classroom
            </th>
            <th className="py-3 px-4 text-center text-gray-600 font-semibold">
              Number of Students
            </th>
            <th className="py-3 px-4 text-center text-gray-600 font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {sampleTeachers.map((teacher) => (
            <tr key={teacher.id} className="border-b border-gray-300">
              <td className="py-3 px-4 text-center">{teacher.firstName}</td>
              <td className="py-3 px-4 text-center">{teacher.lastName}</td>
              <td className="py-3 px-4 text-center">{teacher.email}</td>

              <td className="py-3 px-4 text-center">
                {teacher?.classroom?.name || "-"}
              </td>
              <td className="py-3 px-4 text-center">
                {teacher?.students?.length || "00"}
              </td>
              <td className="py-3 px-4 text-center">
                <div className="flex justify-center items-center space-x-2">
                  <Link
                    href={`/dashboard/teachers/${teacher._id}`}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <PencilSquareIcon className="h-5 w-5" aria-hidden="true" />
                  </Link>
                  <button
                    onClick={() => handleDelete(teacher._id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <TrashIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  {!teacher.classroom && (
                    <Link
                      href={"/dashboard/assign-teacher"}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                    >
                      Assign Classroom
                    </Link>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Teachers;
