"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  UserCircleIcon,
  AcademicCapIcon,
  UsersIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

const PrincipalDashboard = () => {
  const [stats, setStats] = useState({
    totalTeachers: 0,
    totalStudents: 0,
    totalClassrooms: 0,
  });

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
              <p className="text-2xl font-bold">{stats.totalTeachers}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <UsersIcon className="w-10 h-10 text-green-500 mr-4" />
            <div>
              <p className="text-gray-500">Total Students</p>
              <p className="text-2xl font-bold">{stats.totalStudents}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <AcademicCapIcon className="w-10 h-10 text-purple-500 mr-4" />
            <div>
              <p className="text-gray-500">Total Classrooms</p>
              <p className="text-2xl font-bold">{stats.totalClassrooms}</p>
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
            href="/manage-users"
            icon={UsersIcon}
            text="Manage Users"
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {/* Replace with actual recent activity data */}
            {[1, 2, 3].map((item) => (
              <li key={item} className="px-6 py-4 hover:bg-gray-50">
                <p className="text-sm text-gray-500">Activity {item}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrincipalDashboard;
