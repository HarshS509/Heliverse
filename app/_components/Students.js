"use client";
import {
  ExclamationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
function Students({ sampleStudents }) {
  console.log(sampleStudents[0]);
  return (
    <>
      <table className="w-full bg-gray-100 border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left">First Name</th>
            <th className="py-2 px-4 text-left">Last Name</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Classroom</th>
            <th className="py-2 px-4 text-left">Teacher</th>
          </tr>
        </thead>
        <tbody>
          {sampleStudents.map((student) => (
            <tr key={student.id} className="border-t border-gray-300">
              <td className="py-2 px-4">{student.firstName}</td>
              <td className="py-2 px-4">{student.lastName}</td>
              <td className="py-2 px-4">{student.email}</td>
              <td className="py-2 px-4">
                {student?.teacher?.classroom?.name || (
                  <span className="text-red-500 flex items-center">
                    <ExclamationCircleIcon
                      className="h-5 w-5 mr-1"
                      aria-hidden="true"
                    />
                    Not Assigned
                  </span>
                )}
              </td>
              <td className="py-2 px-4">
                {student?.teacher?.firstName && student?.teacher?.lastName ? (
                  `${student.teacher.firstName} ${student.teacher.lastName}`
                ) : (
                  <span className="text-red-500 flex items-center">
                    <ExclamationCircleIcon
                      className="h-5 w-5 mr-1"
                      aria-hidden="true"
                    />
                    Not Assigned
                  </span>
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
