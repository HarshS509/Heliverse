"use client";
import Link from "next/link";
import { toast } from "react-toastify";
import { deleteClass } from "../_lib/action";

function Classroom({ classrooms }) {
  const handleDelete = async (id) => {
    try {
      const response = await deleteClass(id);
      if (response.success) {
        toast.success("Classroom deleted successfully");
        // Optionally, you might want to refresh the list of classrooms here
      } else {
        toast.error("Failed to delete classroom");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the classroom");
    }
  };

  // const handleAssignTeacher = async (classroomId) => {
  //   try {
  //     const response = await assignTeacher(classroomId);
  //     if (response.success) {
  //       toast.success("Teacher assigned successfully");
  //       // Optionally, you might want to refresh the list of classrooms here
  //     } else {
  //       toast.error("Failed to assign teacher");
  //     }
  //   } catch (error) {
  //     toast.error("An error occurred while assigning the teacher");
  //   }
  // };

  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-gray-100 border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-3 px-4 text-left">Classroom Name</th>
            <th className="py-3 px-4 text-left">Teacher Name</th>
            <th className="py-3 px-4 text-left">Number of Students</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {classrooms.map((classroom) => (
            <tr key={classroom._id} className="border-t border-gray-300">
              <td className="py-3 px-4">{classroom.name}</td>
              <td className="py-3 px-4">
                {`${classroom.teacher?.firstName || ""} ${
                  classroom.teacher?.lastName || ""
                }`.trim() || "NOT ASSIGNED"}
              </td>
              <td className="py-3 px-4">{classroom.students.length}</td>
              <td className="py-3 px-4 flex space-x-2">
                <button
                  onClick={() => handleDelete(classroom._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-300"
                >
                  Delete
                </button>
                {!classroom.teacher && (
                  <Link
                    href={"/dashboard/assign-teacher"}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                  >
                    Assign Teacher
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Classroom;
