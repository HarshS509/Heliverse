"use client";
import { useRouter } from "next/navigation";
import {
  ExclamationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

function Students({ sampleStudents }) {
  const router = useRouter();

  const handleAssignTeacher = (studentId) => {
    // Navigate to the page where you can assign a teacher
    router.push(`/assign-teacher/${studentId}`);
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
              Teacher
            </th>
            <th className="py-3 px-4 text-center text-gray-600 font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {sampleStudents.map((student) => (
            <tr key={student.id} className="border-b border-gray-300">
              <td className="py-3 px-4 text-center">{student.firstName}</td>
              <td className="py-3 px-4 text-center">{student.lastName}</td>
              <td className="py-3 px-4 text-center">{student.email}</td>
              <td className="py-3 px-4 text-center">
                {student?.teacher?.classroom?.name || (
                  <span className="text-red-500 flex items-center justify-center">
                    <ExclamationCircleIcon
                      className="h-5 w-5 mr-1"
                      aria-hidden="true"
                    />
                    Not Assigned
                  </span>
                )}
              </td>
              <td className="py-3 px-4 text-center">
                {student?.teacher?.firstName && student?.teacher?.lastName ? (
                  `${student.teacher.firstName} ${student.teacher.lastName}`
                ) : (
                  <span className="text-red-500 flex items-center justify-center">
                    <ExclamationCircleIcon
                      className="h-5 w-5 mr-1"
                      aria-hidden="true"
                    />
                    Not Assigned
                  </span>
                )}
              </td>
              <td className="py-3 px-4 text-center">
                {!student.teacher ? (
                  <Link
                    href={"/dashboard/assign-student"}
                    className="py-1 px-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
                  >
                    Assign Teacher
                  </Link>
                ) : (
                  <span>-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Students;
