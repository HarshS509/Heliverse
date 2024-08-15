import Link from "next/link";
import {
  UserCircleIcon,
  AcademicCapIcon,
  UsersIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { cookies } from "next/headers";
import axiosInstance from "../_utils/axiosInstance";

const PrincipalDashboard = async () => {
  const cookieStore = cookies();
  const cookieString = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
  const res_classrooms = await axiosInstance.get(
    "/api/principal/classrooms",

    {
      headers: {
        Cookie: cookieString,
      },
    }
  );
  const res_teachers = await axiosInstance.get(
    "/api/principal/teachers",

    {
      headers: {
        Cookie: cookieString,
      },
    }
  );
  const res_students = await axiosInstance.get(
    "/api/principal/students",

    {
      headers: {
        Cookie: cookieString,
      },
    }
  );
  const data_students = res_students.data.data.students;
  const data_classrooms = res_classrooms.data.data.classrooms;
  const data_teachers = res_teachers.data.data.teachers;

  const stats = 0;
  // console.log(data_teachers, "array chaiye");

  // useEffect(() => {
  //   // Fetch stats from API
  //   const fetchStats = async () => {
  //     // Replace with actual API call
  //     const response = await fetch("/api/stats");
  //     const data = await response.json();
  //     setStats(data);
  //   };

  //   fetchStats();
  // }, []);

  const QuickActionButton = ({ href, icon: Icon, text }) => (
    <Link
      href={href}
      className="flex items-center justify-center p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
    >
      <Icon className="w-6 h-6 mr-2" />
      <span>{text}</span>
    </Link>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Principal Dashboard</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <UserCircleIcon className="w-10 h-10 text-blue-500 mr-4" />
            <div>
              <p className="text-gray-500">Total Teachers</p>
              <p className="text-2xl font-bold">
                {data_teachers?.length || "00"}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <UsersIcon className="w-10 h-10 text-green-500 mr-4" />
            <div>
              <p className="text-gray-500">Total Students</p>
              <p className="text-2xl font-bold">
                {data_students?.length || "00"}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <AcademicCapIcon className="w-10 h-10 text-purple-500 mr-4" />
            <div>
              <p className="text-gray-500">Total Classrooms</p>
              <p className="text-2xl font-bold">
                {data_classrooms?.length || "00"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickActionButton
            href="/dashboard/add-classroom"
            icon={PlusCircleIcon}
            text="Create Classroom"
          />
          <QuickActionButton
            href="/dashboard/assign-teacher"
            icon={UserCircleIcon}
            text="Assign Teacher"
          />
          <QuickActionButton
            href="/dashboard/assign-student"
            icon={UsersIcon}
            text="Assign Student"
          />
        </div>
      </div>
    </div>
  );
};

export default PrincipalDashboard;
