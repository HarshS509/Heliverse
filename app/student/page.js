"use client";
import React, { useState, useEffect } from "react";
import {
  UserCircleIcon,
  AcademicCapIcon,
  ClockIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const StudentDashboard = () => {
  const [studentInfo, setStudentInfo] = useState({
    name: "",
    email: "",
    className: "",
    teacherName: "",
  });

  const [timetable, setTimetable] = useState([]);
  const [classmates, setClassmates] = useState([]);

  useEffect(() => {
    // Fetch student info, timetable, and classmates from API
    const fetchStudentData = async () => {
      // Replace with actual API calls
      const infoResponse = await fetch("/api/student/info");
      const infoData = await infoResponse.json();
      setStudentInfo(infoData);

      const timetableResponse = await fetch("/api/student/timetable");
      const timetableData = await timetableResponse.json();
      setTimetable(timetableData);

      const classmatesResponse = await fetch("/api/student/classmates");
      const classmatesData = await classmatesResponse.json();
      setClassmates(classmatesData);
    };

    fetchStudentData();
  }, []);

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
        <InfoCard icon={UserCircleIcon} title="Name" value={studentInfo.name} />
        <InfoCard
          icon={AcademicCapIcon}
          title="Class"
          value={studentInfo.className}
        />
        <InfoCard
          icon={UserCircleIcon}
          title="Teacher"
          value={studentInfo.teacherName}
        />
        <InfoCard
          icon={UsersIcon}
          title="Classmates"
          value={classmates.length}
        />
      </div>

      {/* Timetable */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Timetable</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Monday
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tuesday
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Wednesday
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thursday
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Friday
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {timetable.map((row, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {row.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {row.monday}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {row.tuesday}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {row.wednesday}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {row.thursday}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {row.friday}
                  </td>
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
            {classmates.map((classmate) => (
              <li key={classmate.id} className="px-6 py-4 flex items-center">
                <UserCircleIcon className="w-10 h-10 text-gray-400 mr-4" />
                <div>
                  <p className="font-medium">{classmate.name}</p>
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
