import AssignTeacherForm from "@/app/_components/AssignTeacher";
import axiosInstance from "@/app/_utils/axiosInstance";
import { cookies } from "next/headers";

async function Page() {
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
  const dataClassrooms = res_classrooms.data.data?.classrooms;
  const dataTeachers = res_teachers.data.data?.teachers;
  // console.log(dataClassrooms, dataTeachers);
  return (
    <>
      <AssignTeacherForm classrooms={dataClassrooms} teachers={dataTeachers} />
    </>
  );
}

export default Page;
