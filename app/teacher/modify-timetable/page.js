import TimetableEditForm from "@/app/_components/ModifyTimetable";
import axiosInstance from "@/app/_utils/axiosInstance";
import { cookies } from "next/headers";

async function Page() {
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
  const timetableId = res.data.data.teacher.classroom.timetable._id;
  const data = res.data.data.teacher.classroom.timetable.schedule;
  console.log("teacher", data);
  return (
    <>
      <TimetableEditForm existingTimetable={data} timetableId={timetableId} />
    </>
  );
}

export default Page;
