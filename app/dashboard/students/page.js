import Students from "@/app/_components/Students";
import axiosInstance from "@/app/_utils/axiosInstance";
import { cookies } from "next/headers";
import Link from "next/link";

// Sample data for students

const Page = async () => {
  const cookieStore = cookies();
  const cookieString = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
  const res = await axiosInstance.get(
    "/api/principal/students",

    {
      headers: {
        Cookie: cookieString,
      },
    }
  );
  const data = res.data.data.students;
  console.log(data, "array chaiye");
  return (
    <div className=" w-full mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
      <div className="flex justify-between items-center my-5">
        <h2 className="text-2xl font-semibold">Students</h2>
        <Link
          href={"add-students"}
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
          Add Student
        </Link>
      </div>

      {/* Students Table */}
      <Students sampleStudents={data} />
    </div>
  );
};

export default Page;
