import { cookies } from "next/headers";
import TeacherDashboard from "../_components/Teacher-Dashboard";
import axiosInstance from "../_utils/axiosInstance";

async function page() {
  const cookieStore = cookies();
  const cookieString = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
  const res = await axiosInstance.get(
    "/api/teacher/my-classroom",

    {
      headers: {
        Cookie: cookieString,
      },
    }
  );
  const data = res.data.data.teacher;
  console.log("hi", res.data.data.teacher);
  return (
    <>
      <TeacherDashboard teacherInfo={data} />
    </>
  );
}

export default page;
