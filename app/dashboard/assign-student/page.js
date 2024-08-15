import AssignStudentForm from "@/app/_components/AssignStudentForm";
import AssignTeacherForm from "@/app/_components/AssignTeacher";
import axiosInstance from "@/app/_utils/axiosInstance";
import { cookies } from "next/headers";

async function Page() {
  const cookieStore = cookies();
  const cookieString = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const res_students = await axiosInstance.get(
    "/api/principal/students",

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
  const dataStudents = res_students.data.data?.students;
  const dataTeachers = res_teachers.data.data?.teachers;
  // console.log(dataStudents, dataTeachers);
  return (
    <>
      <AssignStudentForm students={dataStudents} teachers={dataTeachers} />
    </>
  );
}

export default Page;
