"use client";
import React, { useState, useEffect } from "react";
import {
  UserCircleIcon,
  AcademicCapIcon,
  ClockIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const TeacherDashboard = ({ teacherInfo }) => {
  const [students, setStudents] = useState([]);
  // const [timetable, setTimetable] = useState([]);
  const timetable = teacherInfo?.classroom?.timetable?.schedule;

  useEffect(() => {
    // This would be where you fetch the data if you had an API
    // Here we're using static data for the purpose of this example
    // const fetchTeacherData = async () => {
    //   const infoResponse = await fetch("/api/teacher/info");
    //   const infoData = await infoResponse.json();
    //   setTeacherInfo(infoData);
    //   const studentsResponse = await fetch("/api/teacher/students");
    //   const studentsData = await studentsResponse.json();
    //   setStudents(studentsData);
    //   const timetableResponse = await fetch("/api/teacher/timetable");
    //   const timetableData = await timetableResponse.json();
    //   setTimetable(timetableData);
    // };
    // fetchTeacherData();
    // For now, assuming teacherInfo and timetable are directly passed as props
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

  const handleEditStudent = (studentId) => {
    // Implement edit student functionality
    console.log("Edit student:", studentId);
  };

  const handleDeleteStudent = (studentId) => {
    // Implement delete student functionality
    console.log("Delete student:", studentId);
  };

  const handleAddPeriod = () => {
    // Implement add period functionality
    console.log("Add new period");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Teacher Dashboard</h1>

      {/* Teacher Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <InfoCard
          icon={UserCircleIcon}
          title="Name"
          value={`${teacherInfo.firstName} ${teacherInfo.lastName}`}
        />
        <InfoCard
          icon={AcademicCapIcon}
          title="Class"
          value={`${teacherInfo?.classroom?.name || "Not assigned"}`}
        />
        <InfoCard
          icon={UserCircleIcon}
          title="Total Students"
          value={`${teacherInfo?.students?.length || "00"}`}
        />
        <InfoCard icon={ClockIcon} title="Email" value={teacherInfo.email} />
      </div>

      {/* Student List */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Students</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teacherInfo?.students?.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <UserCircleIcon className="w-8 h-8 text-gray-400 mr-3" />
                      <div className="text-sm font-medium text-gray-900">
                        {`${student.firstName} ${student.lastName}`}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{student.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEditStudent(student.id)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteStudent(student.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Timetable Management */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Timetable Management</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ].map((day) => (
                  <th
                    key={day}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                "12:00 - 13:00",
                "13:00 - 14:00",
                "14:00 - 15:00",
                "15:00 - 16:00",
                "16:00 - 17:00",
                "17:00 - 18:00",
              ].map((timeSlot, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {timeSlot}
                  </td>
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ].map((day) => {
                    const period = timetable
                      .find((daySchedule) => daySchedule.day === day)
                      ?.periods.find(
                        (p) => p.startTime === timeSlot.split(" - ")[0]
                      );
                    return (
                      <td
                        key={day}
                        className="px-6 py-4 whitespace-nowrap text-sm"
                      >
                        {period ? period.subject : "-"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link
          href={"/teacher/create-timetable"}
          onClick={handleAddPeriod}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Create Timetable
        </Link>
      </div>
    </div>
  );
};

export default TeacherDashboard;
