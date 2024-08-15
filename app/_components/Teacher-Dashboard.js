"use client";
import React from "react";
import {
  UserCircleIcon,
  AcademicCapIcon,
  ClockIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import {
  deleteStudentTeacher,
  deleteTimetableAction,
  modifyTimetable,
} from "../_lib/action";
import { toast } from "react-toastify";

const TeacherDashboard = ({ teacherInfo }) => {
  const timetable = teacherInfo?.classroom?.timetable?.schedule;
  console.log(teacherInfo?.classroom?.timetable?._id, "timeeeee");

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
    console.log("Edit student:", studentId);
  };

  const handleDeleteStudent = async (studentId) => {
    const response = await deleteStudentTeacher(studentId);
    if (response.success) {
      toast.success("Student deleted successfully");
    } else {
      toast.error("Failed to delete student");
    }
    console.log("Delete student:", studentId);
  };

  const handleCreateTimetable = () => {
    console.log("Create new timetable");
  };

  const handleModifyTimetable = async () => {
    const response = await modifyTimetable(teacherInfo.classroom.timetable._id);
    if (response.success) {
      toast.success("Timetable modified successfully");
    } else {
      toast.error("Failed to modify timetable");
    }
  };

  const handleDeleteTimetable = async () => {
    const response = await deleteTimetableAction(
      teacherInfo.classroom.timetable._id
    );
    if (response.success) {
      toast.success("Timetable deleted successfully");
    } else {
      toast.error("Failed to delete timetable");
    }
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
                      onClick={() => handleDeleteStudent(student._id)}
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
          {timetable ? (
            <>
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
              <div className="mt-4 flex gap-4">
                <Link
                  href={`/teacher/modify-timetable`}
                  onClick={handleModifyTimetable}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                >
                  Modify Timetable
                </Link>
                <button
                  onClick={handleDeleteTimetable}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Delete Timetable
                </button>
              </div>
            </>
          ) : (
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-500">No timetable available.</p>
              <Link
                href={"/teacher/create-timetable"}
                onClick={handleCreateTimetable}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors inline-block"
              >
                Create Timetable
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
