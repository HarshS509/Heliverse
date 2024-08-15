"use client";

import { useRouter } from "next/navigation";
import {
  UserCircleIcon,
  AcademicCapIcon,
  UsersIcon,
  ArrowRightStartOnRectangleIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import { deleteCookie } from "cookies-next";
import { revalidatePath } from "next/cache";
import { toast } from "react-toastify";

const AdminSidebar = ({ role }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const router = useRouter();
  const NavLink = ({ href, children }) => {
    const isActive = router.pathname === href;
    return (
      <Link
        href={href}
        className={`flex items-center gap-3 rounded-xl bg-light px-3 py-[10px] text-sm font-medium text-light-title dark:bg-dark dark:text-dark-title ${
          isActive
            ? "!dark:text-dark-title !bg-black !text-dark-title dark:!bg-dark-card"
            : ""
        }`}
      >
        {children}
      </Link>
    );
  };

  const handleClick = () => {
    if (role?.value === "Principal") {
      router.push("/dashboard");
    } else if (role?.value === "Teacher") {
      router.push("/teacher");
    } else if (role?.value === "Student") {
      router.push("/student");
    } else {
      router.push("/"); // Default path if no role matches
    }
  };

  const handleLogout = () => {
    deleteCookie("accessToken");
    deleteCookie("role");

    // Add your logout logic here, e.g., clearing cookies or tokens, then redirecting
    router.push("/");
    toast.success("User logged out!");
    // Redirect to login page after logout
  };

  return (
    <>
      <button
        className="p-4 text-light-title dark:text-dark-title sm:hidden"
        onClick={() => {
          setIsSidebarOpen(!isSidebarOpen);
        }}
      >
        <UserCircleIcon className="h-6 w-6 font-normal" />
      </button>
      <div
        className={`absolute z-10 min-h-screen w-64 origin-left rounded-b-xl rounded-r-xl border border-[#D9D9D9] bg-light transition-transform dark:border-gray-700 dark:bg-dark ${
          isSidebarOpen ? "scale-x-100" : "scale-x-0"
        } sm:relative sm:h-auto sm:scale-x-100`}
      >
        <button
          className="p-4 text-light-title dark:text-dark-title sm:hidden"
          onClick={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
        >
          <UserCircleIcon className="h-6 w-6 font-normal" />
        </button>
        <div className="border-b border-[#D9D9D9] bg-light px-6 py-3 dark:border-gray-700 dark:bg-dark sm:p-6">
          <h1
            onClick={handleClick}
            className="cursor-pointer text-xl font-medium text-light-title dark:text-dark-title"
          >
            MySchool
          </h1>
        </div>
        <div className="flex flex-col gap-2 p-6">
          {role?.value === "Principal" && (
            <>
              <NavLink href="/dashboard/classrooms">
                <AcademicCapIcon className="h-6 w-6 font-normal" />
                Classrooms
              </NavLink>
              <NavLink href="/dashboard/teachers">
                <UserCircleIcon className="h-6 w-6 font-normal" />
                Teachers
              </NavLink>
              <NavLink href="/dashboard/students">
                <UsersIcon className="h-6 w-6 font-normal" />
                Students
              </NavLink>
              <NavLink href="/dashboard/assign-teacher">
                <ClipboardDocumentCheckIcon className="h-6 w-6 font-normal" />
                Assign Teacher
              </NavLink>
              <NavLink href="/dashboard/assign-student">
                <ClipboardDocumentListIcon className="h-6 w-6 font-normal" />
                Assign Student
              </NavLink>
            </>
          )}
          {role?.value === "Teacher" && (
            <>
              <NavLink href="/teacher">
                <AcademicCapIcon className="h-6 w-6 font-normal" />
                My Classroom
              </NavLink>
            </>
          )}
          {role?.value === "Student" && (
            <>
              <NavLink href="/student">
                <AcademicCapIcon className="h-6 w-6 font-normal" />
                My Classroom
              </NavLink>
            </>
          )}
        </div>
        <div className="mt-auto p-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full rounded-xl bg-red-500 px-4 py-2 text-white font-medium hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800"
          >
            <ArrowRightStartOnRectangleIcon className="h-6 w-6 font-normal" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
