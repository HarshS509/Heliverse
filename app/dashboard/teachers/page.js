import Teachers from "@/app/_components/Teachers";
import axiosInstance from "@/app/_utils/axiosInstance";
import { cookies } from "next/headers";
import Link from "next/link";

// Sample data for teachers
const sampleTeachers = [
  {
    id: 1,
    email: "john.doe@example.com",
    firstName: "John",
    lastName: "Doe",
    classroom: "Room A",
  },
  {
    id: 2,
    email: "jane.smith@example.com",
    firstName: "Jane",
    lastName: "Smith",
    classroom: "",
  }, // No classroom
  {
    id: 3,
    email: "alice.johnson@example.com",
    firstName: "Alice",
    lastName: "Johnson",
    classroom: "Room C",
  },
  {
    id: 4,
    email: "bob.brown@example.com",
    firstName: "Bob",
    lastName: "Brown",
    classroom: "Room D",
  },
];

const Page = async () => {
  const cookieStore = cookies();
  const cookieString = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
  const res = await axiosInstance.get(
    "/api/principal/teachers",

    {
      headers: {
        Cookie: cookieString,
      },
    }
  );
  const data = res.data.data.teachers;
  // console.log(data, "array chaiye mujheeee");

  return (
    <div className="w-full mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
      <div className="flex justify-between items-center my-5">
        <h2 className="text-2xl font-semibold">Teachers</h2>
        <Link
          href={"add-teacher"}
          type="button"
          className="flex items-center justify-center text-white bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600  focus:outline-none"
        >
          <svg
            className="h-3.5 w-3.5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            />
          </svg>
          Add Teacher
        </Link>
      </div>

      {/* Teachers Table */}
      <Teachers sampleTeachers={data} />
    </div>
  );
};

export default Page;
