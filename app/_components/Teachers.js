"use client";
import {
  TrashIcon,
  PencilSquareIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
function Teachers({ sampleTeachers }) {
  const handleDelete = (id) => {
    // Implement delete logic
    console.log("Delete teacher with id:", id);
  };

  const handleModify = (id) => {
    // Implement modify logic
    console.log("Modify teacher with id:", id);
  };

  const handleAssignClassroom = (id) => {
    // Implement assign classroom logic
    console.log("Assign classroom to teacher with id:", id);
  };
  return (
    <>
      <table className="w-full bg-gray-100 border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">First Name</th>
            <th className="py-2 px-4 text-left">Last Name</th>
            <th className="py-2 px-4 text-left">Classroom</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sampleTeachers.map((teacher) => (
            <tr key={teacher.id} className="border-t border-gray-300">
              <td className="py-2 px-4">{teacher.email}</td>
              <td className="py-2 px-4">{teacher.firstName}</td>
              <td className="py-2 px-4">{teacher.lastName}</td>
              <td className="py-2 px-4">
                {teacher?.classroom?.name || "No classroom assigned"}
              </td>
              <td className="py-2 px-4 flex space-x-2 items-center">
                <button
                  onClick={() => handleModify(teacher.id)}
                  className="text-blue-500 hover:text-blue-600"
                >
                  <PencilSquareIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  onClick={() => handleDelete(teacher.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <TrashIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                {!teacher.classroom && (
                  <Link
                    href={"/dashboard/assign-teacher"}
                    className="text-green-500 hover:text-green-600 flex items-center space-x-1"
                  >
                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    <span>Assign Classroom</span>
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Teachers;
