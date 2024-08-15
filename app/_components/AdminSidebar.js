"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {
  UserCircleIcon,
  AcademicCapIcon,
  ClockIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
// import { cookies } from "next/headers";
// import { cookies } from "next/headers";

const AdminSidebar = ({ role }) => {
  // const cookieStore = cookies();
  // const role = cookieStore.get("role");
  console.log(role.value, "roleee");
  // const cookieString = cookieStore
  //   .getAll()
  //   .map((cookie) => `${cookie.name}=${cookie.value}`)
  //   .join("; ");
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
    if (role.value === "Principal") {
      router.push("/dashboard");
    } else if (role.value === "Teacher") {
      router.push("/teacher");
    } else if (role.value === "Student") {
      router.push("/student");
    } else {
      router.push("/"); // Default path if no role matches
    }
  };
  return (
    <>
      <button
        className=" p-4  text-light-title dark:text-dark-title sm:hidden "
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
          className=" p-4  text-light-title dark:text-dark-title sm:hidden "
          onClick={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
        >
          <UserCircleIcon className="h-6 w-6 font-normal" />
        </button>
        <div className="border-b border-[#D9D9D9] bg-light  px-6 py-3 dark:border-gray-700 dark:bg-dark sm:p-6 ">
          <h1
            onClick={handleClick}
            className="cursor-pointer text-xl font-medium text-light-title dark:text-dark-title"
          >
            MySchool
          </h1>
        </div>
        <div className="flex flex-col gap-2 p-6">
          <NavLink href="/dashboard/classrooms">
            <UserCircleIcon className="h-6 w-6 font-normal" />
            Classrooms
          </NavLink>
          <NavLink href="/dashboard/teachers">
            <UserCircleIcon className="h-6 w-6 font-normal" />
            Teachers
          </NavLink>
          <NavLink href="/dashboard/students">
            <UserCircleIcon className="h-6 w-6 font-normal" />
            Students
          </NavLink>{" "}
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
