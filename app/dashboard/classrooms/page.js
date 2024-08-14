import Classroom from "@/app/_components/Classroom";
import axiosInstance from "@/app/_utils/axiosInstance";
import { cookies } from "next/headers";
import Link from "next/link";

const Classrooms = async () => {
  const cookieStore = cookies();
  const cookieString = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
  console.log(cookieString);
  const res = await axiosInstance.get(
    "/api/principal/classrooms",

    {
      headers: {
        Cookie: cookieString,
      },
    }
  );
  const data = res.data;
  console.log(data, "array chaiye");
  return (
    <div className="flex-grow w-full p-4 bg-white border border-gray-300 rounded-lg shadow-lg">
      <div className="flex justify-between items-center my-5">
        <h2 className="text-2xl font-semibold">Classrooms</h2>
        <Link
          href={"add-classroom"}
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
          Add Classroom
        </Link>
      </div>

      {/* Table for displaying classrooms */}
      <Classroom classrooms={data.data.classrooms} />
    </div>
  );
};

export default Classrooms;
