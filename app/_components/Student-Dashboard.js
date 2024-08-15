"use client";
import React from "react";
import {
  UserCircleIcon,
  AcademicCapIcon,
  ClockIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const StudentDashboard = ({
  studentInfo,
  classInfo,
  timetable,
  classmates,
}) => {
  const filteredClassmates = classmates?.filter(
    (classmate) => classmate._id.toString() !== studentInfo._id.toString()
  );
  // console.log(classInfo);

  const InfoCard = ({ icon: Icon, title, value }) => (
    <div className="bg-white p-4 rounded-lg shadow flex items-center">
      <Icon className="w-8 h-8 text-blue-500 mr-3" />
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Student Dashboard</h1>

      {/* Student Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <InfoCard
          icon={UserCircleIcon}
          title="Name"
          value={`${studentInfo.firstName} ${studentInfo.lastName}`}
        />
        <InfoCard
          icon={AcademicCapIcon}
          title="Class"
          value={classInfo?.name || "Not Assigned:("}
        />
        <InfoCard
          icon={UserCircleIcon}
          title="Teacher"
          value={
            studentInfo.teacher &&
            studentInfo.teacher.firstName &&
            studentInfo.teacher.lastName
              ? `${studentInfo.teacher.firstName} ${studentInfo.teacher.lastName}`
              : "Not Assigned"
          }
        />
        <InfoCard
          icon={UsersIcon}
          title="Classmates"
          value={classmates.length - 1}
        />
      </div>

      {/* Timetable */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Timetable</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                {timetable?.map((day) => (
                  <th
                    key={day.day}
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {day.day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {timetable?.length > 0 &&
                timetable[0].periods.map((_, periodIndex) => (
                  <tr key={periodIndex}>
                    <td className="px-6 py-4 text-center text-sm text-gray-500">
                      Period {periodIndex + 1}
                    </td>
                    {timetable.map((day) => (
                      <td
                        key={day._id}
                        className="px-6 py-4 text-center text-sm"
                      >
                        {day.periods[periodIndex]?.subject || "-"}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Classmates */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Classmates</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {filteredClassmates?.map((classmate) => (
              <li key={classmate._id} className="px-6 py-4 flex items-center">
                <UserCircleIcon className="w-10 h-10 text-gray-400 mr-4" />
                <div>
                  <p className="font-medium">
                    {classmate.firstName} {classmate.lastName}
                  </p>
                  <p className="text-sm text-gray-500">{classmate.email}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
