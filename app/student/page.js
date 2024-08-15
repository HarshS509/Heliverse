import { cookies } from "next/headers";
import StudentDashboard from "../_components/Student-Dashboard";
import axiosInstance from "../_utils/axiosInstance";

async function page() {
  const cookieStore = cookies();
  const cookieString = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const stu_response = await axiosInstance.get(
    "/api/student/my-class-info",

    {
      headers: {
        Cookie: cookieString,
      },
    }
  );
  // console.log(stu_response.data.data);
  return (
    <>
      <StudentDashboard
        studentInfo={stu_response.data.data.student}
        classInfo={stu_response.data.data.classroom}
        timetable={stu_response.data.data.classroom.timetable.schedule}
        classmates={stu_response.data.data.student.teacher.classroom.students}
      />
    </>
  );
}

export default page;
