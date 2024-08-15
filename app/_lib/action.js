"use server";

import { isAxiosError } from "axios";
import axiosInstance from "../_utils/axiosInstance";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const cookieStore = cookies();
const cookieString = cookieStore
  .getAll()
  .map((cookie) => `${cookie.name}=${cookie.value}`)
  .join("; ");
export async function loginUser(prevState, formData) {
  const uri = "http://13.49.35.186";
  // console.log("hi");
  const email = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role");
  // console.log(email, password, role, "hereee");
  const bodyObject = {
    email,
    password,
    role,
  };
  // console.log(bodyObject, "DATAAAA");
  const errors = {
    email: !email ? "Username or email is required" : null,
    password:
      !password || password.length < 4
        ? "Password must be at least 4 characters long"
        : null,
    role: role === "Select a Role" ? "Role is required" : null,
  };

  if (Object.values(errors).some((error) => error !== null)) {
    return { errors, resetKey: prevState.resetKey };
  }
  // const response = axiosInstance.post("/api/auth/login", data, {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   withCredentials: true,
  // });

  try {
    // const preData = await response;
    // const { data } = preData;
    const response = await fetch(`${uri}/api/auth/login`, {
      method: "POST", // or 'GET', 'PUT', 'DELETE', etc. depending on your use case
      headers: {
        "Content-Type": "application/json", // Specify content type as JSON
      },
      body: JSON.stringify(bodyObject), // Convert body object to JSON string
      credentials: "include", // Include cookies and authentication info
    });

    // Check if response was successful
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    // Parse JSON response
    const data = await response.json();
    // console.log("Success:", data); // Handle success

    // console.log(data);
    revalidatePath("/");
    // console.log(data);
    return {
      data,
      success: true,
      resetKey: Date.now(),
      message: data?.message,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error.response?.data?.message);
    } else {
      console.error(error);
    }
    return {
      errors,
      success: false,
      message: "Signin failed",
      resetKey: prevState.resetKey,
    };
  }
}

export async function addClassRoom(prevState, formData) {
  // console.log("hiii", Date.now());
  const name = formData.get("name");
  // console.log("name", name);
  const weekdayStartTime = formData.get("weekdayStartTime");
  const weekdayEndTime = formData.get("weekdayEndTime");
  const saturdayStartTime = formData.get("saturdayStartTime");
  const saturdayEndTime = formData.get("saturdayEndTime");
  const weekdayTimings = {
    startTime: weekdayStartTime,
    endTime: weekdayEndTime,
  };
  const saturdayTimings = {
    startTime: saturdayStartTime,
    endTime: saturdayEndTime,
  };
  // console.log(weekdayTimings, saturdayTimings);
  // console.log(cookieString);
  const errors = {
    name: !name ? "Name is required" : null,
  };
  if (Object.values(errors).some((error) => error !== null)) {
    return { errors, resetKey: prevState.resetKey };
  }
  const data = {
    name,
    weekdayTimings,
    saturdayTimings,
  };

  try {
    // console.log("befor axios");
    const response = await axiosInstance.post(
      "/api/principal/classrooms",
      data,
      {
        headers: {
          Cookie: cookieString,
        },
      }
    );
    // console.log(response);
    revalidatePath("/dashboard/classrooms");
    return {
      success: true,
      data: response.data,
      message: response.data?.message,
      resetKey: Date.now(),
    };
  } catch (error) {
    // console.log("hi");
    if (isAxiosError(error)) {
      console.error(error.response?.data?.message);
    } else {
      console.error(error);
    }
    return {
      errors,
      success: false,
      message: "Classroom could not be created :(",
      resetKey: prevState.resetKey,
    };
  }
}

export async function registerTeacher(prevState, formData) {
  // console.log("hi");
  const email = formData.get("email");
  const password = formData.get("password");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  // console.log(email, password, firstName, "hereee");
  const bodyObject = {
    email,
    password,
    firstName,
    role: "Teacher",
    lastName,
  };
  // console.log(bodyObject, "DATAAAA");
  const errors = {
    email: !email ? "Username or email is required" : null,
    password:
      !password || password.length < 4
        ? "Password must be at least 4 characters long"
        : null,
    firstName: !firstName ? "First name is required" : null,
    lastName: !lastName ? "Last name is required" : null,
  };

  if (Object.values(errors).some((error) => error !== null)) {
    return { errors, resetKey: prevState.resetKey };
  }

  try {
    // console.log("befor axios");
    const response = await axiosInstance.post(
      "/api/principal/teachers",
      bodyObject,
      {
        headers: {
          Cookie: cookieString,
        },
      }
    );
    // console.log(response);
    revalidatePath("/dashboard/teachers");
    return {
      success: true,
      data: response.data,
      message: response.data?.message,
      resetKey: Date.now(),
    };
  } catch (error) {
    // console.log("hi");
    if (isAxiosError(error)) {
      console.error(error.response?.data?.message);
    } else {
      console.error(error);
    }
    return {
      errors,
      success: false,
      message: "Teacher profile could not be created :(",
      resetKey: prevState.resetKey,
    };
  }
}
export async function registerStudent(prevState, formData) {
  // console.log("hi");
  const email = formData.get("email");
  const password = formData.get("password");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  // console.log(email, password, firstName, "hereee");
  const bodyObject = {
    email,
    password,
    firstName,
    role: "Student",
    lastName,
  };
  // console.log(bodyObject, "DATAAAA");
  const errors = {
    email: !email ? "Username or email is required" : null,
    password:
      !password || password.length < 4
        ? "Password must be at least 4 characters long"
        : null,
    firstName: !firstName ? "First name is required" : null,
    lastName: !lastName ? "Last name is required" : null,
  };

  if (Object.values(errors).some((error) => error !== null)) {
    return { errors, resetKey: prevState.resetKey };
  }

  try {
    // console.log("befor axios");
    const response = await axiosInstance.post(
      "/api/principal/students",
      bodyObject,
      {
        headers: {
          Cookie: cookieString,
        },
      }
    );
    // console.log(response);
    revalidatePath("/dashboard/students");
    return {
      success: true,
      data: response.data,
      message: response.data?.message,
      resetKey: Date.now(),
    };
  } catch (error) {
    // console.log("hi");
    if (isAxiosError(error)) {
      console.error(error.response?.data?.message);
    } else {
      console.error(error);
    }
    return {
      errors,
      success: false,
      message: "Student profile could not be created :(",
      resetKey: prevState.resetKey,
    };
  }
}
export async function assignTeacherAction(prevState, formData) {
  // console.log("hiii", Date.now());
  const teacherId = formData.get("teacherId");
  const classroomId = formData.get("classroomId");

  const errors = {
    teacherId: teacherId === "Select a teacher" ? "Select Teacher" : null,
    classroomId:
      classroomId === "Select a classroom" ? "Select classroom" : null,
  };
  if (Object.values(errors).some((error) => error !== null)) {
    return { errors, resetKey: prevState.resetKey };
  }
  const data = {
    teacherId,
    classroomId,
  };

  try {
    // console.log("befor axios");
    const response = await axiosInstance.post(
      "/api/principal/assign-teacher",
      data,
      {
        headers: {
          Cookie: cookieString,
        },
      }
    );
    // console.log(response);
    revalidatePath("/dashboard/teachers");
    revalidatePath("/dashboard/classrooms");
    revalidatePath("/dashboard/students");
    revalidatePath("/");
    return {
      success: true,
      data: response.data,
      message: response.data?.message,
      resetKey: Date.now(),
    };
  } catch (error) {
    // console.log("hi");
    if (isAxiosError(error)) {
      console.error(error.response?.data?.message);
    } else {
      console.error(error);
    }
    return {
      errors,
      success: false,
      message: "Classroom could not be created :(",
      resetKey: prevState.resetKey,
    };
  }
}

export async function assignStudentAction(prevState, formData) {
  // console.log("hiii", Date.now());
  const teacherId = formData.get("teacherId");
  const studentId = formData.get("studentId");

  const errors = {
    teacherId: teacherId === "Select a teacher" ? "Select Teacher" : null,
    studentId: studentId === "Select a student" ? "Select student" : null,
  };
  if (Object.values(errors).some((error) => error !== null)) {
    return { errors, resetKey: prevState.resetKey };
  }
  const data = {
    teacherId,
    studentId,
  };

  try {
    // console.log("befor axios");
    const response = await axiosInstance.post(
      "/api/principal/assign-student",
      data,
      {
        headers: {
          Cookie: cookieString,
        },
      }
    );
    // console.log(response);
    revalidatePath("/dashboard/teachers");
    revalidatePath("/dashboard/classrooms");
    revalidatePath("/dashboard/students");
    revalidatePath("/");
    return {
      success: true,
      data: response.data,
      message: response.data?.message,
      resetKey: Date.now(),
    };
  } catch (error) {
    // console.log("hi");
    if (isAxiosError(error)) {
      console.error(error.response?.data?.message);
    } else {
      console.error(error);
    }
    return {
      errors,
      success: false,
      message: "student could not be assigned :(",
      resetKey: prevState.resetKey,
    };
  }
}
export async function createTimeTableAction(prevState, formData) {
  // console.log("hiii", Date.now());
  const subject1 = formData.get("monday_period_1");
  const subject2 = formData.get("monday_period_2");
  const subject3 = formData.get("monday_period_3");
  const subject4 = formData.get("monday_period_4");
  const subject5 = formData.get("monday_period_5");
  const subject6 = formData.get("monday_period_6");
  const subject7 = formData.get("tuesday_period_1");
  const subject8 = formData.get("tuesday_period_2");
  const subject9 = formData.get("tuesday_period_3");
  const subject10 = formData.get("tuesday_period_4");
  const subject11 = formData.get("tuesday_period_5");
  const subject12 = formData.get("tuesday_period_6");
  const subject13 = formData.get("wednesday_period_1");
  const subject14 = formData.get("wednesday_period_2");
  const subject15 = formData.get("wednesday_period_3");
  const subject16 = formData.get("wednesday_period_4");
  const subject17 = formData.get("wednesday_period_5");
  const subject18 = formData.get("wednesday_period_6");
  const subject19 = formData.get("thursday_period_1");
  const subject20 = formData.get("thursday_period_2");
  const subject21 = formData.get("thursday_period_3");
  const subject22 = formData.get("thursday_period_4");
  const subject23 = formData.get("thursday_period_5");
  const subject24 = formData.get("thursday_period_6");
  const subject25 = formData.get("friday_period_1");
  const subject26 = formData.get("friday_period_2");
  const subject27 = formData.get("friday_period_3");
  const subject28 = formData.get("friday_period_4");
  const subject29 = formData.get("friday_period_5");
  const subject30 = formData.get("friday_period_6");
  const subject31 = formData.get("saturday_period_1");
  const subject32 = formData.get("saturday_period_2");
  const subject33 = formData.get("saturday_period_3");
  const subject34 = formData.get("saturday_period_4");
  // console.log(subject1);

  const errors = {
    subject1: subject1 === "Select subject" ? "Select Teacher" : null,
    subject2: subject2 === "Select subject" ? "Select Teacher" : null,
    subject3: subject3 === "Select subject" ? "Select Teacher" : null,
    subject4: subject4 === "Select subject" ? "Select Teacher" : null,
    subject5: subject5 === "Select subject" ? "Select Teacher" : null,
    subject6: subject6 === "Select subject" ? "Select Teacher" : null,
    subject7: subject7 === "Select subject" ? "Select Teacher" : null,
    subject8: subject8 === "Select subject" ? "Select Teacher" : null,
    subject9: subject9 === "Select subject" ? "Select Teacher" : null,
    subject10: subject10 === "Select subject" ? "Select Teacher" : null,
    subject11: subject11 === "Select subject" ? "Select Teacher" : null,
    subject12: subject12 === "Select subject" ? "Select Teacher" : null,
    subject13: subject13 === "Select subject" ? "Select Teacher" : null,
    subject14: subject14 === "Select subject" ? "Select Teacher" : null,
    subject15: subject15 === "Select subject" ? "Select Teacher" : null,
    subject16: subject16 === "Select subject" ? "Select Teacher" : null,
    subject17: subject17 === "Select subject" ? "Select Teacher" : null,
    subject18: subject18 === "Select subject" ? "Select Teacher" : null,
    subject19: subject19 === "Select subject" ? "Select Teacher" : null,
    subject20: subject20 === "Select subject" ? "Select Teacher" : null,
    subject21: subject21 === "Select subject" ? "Select Teacher" : null,
    subject22: subject22 === "Select subject" ? "Select Teacher" : null,
    subject23: subject23 === "Select subject" ? "Select Teacher" : null,
    subject24: subject24 === "Select subject" ? "Select Teacher" : null,
    subject25: subject25 === "Select subject" ? "Select Teacher" : null,
    subject26: subject26 === "Select subject" ? "Select Teacher" : null,
    subject27: subject27 === "Select subject" ? " Select Teacher" : null,
    subject28: subject28 === "Select subject" ? "Select Teacher" : null,
    subject29: subject29 === "Select subject" ? "Select Teacher" : null,
    subject30: subject30 === "Select subject" ? "Select Teacher" : null,
    subject31: subject31 === "Select subject" ? "Select Teacher" : null,
    subject32: subject32 === "Select subject" ? " Select Teacher" : null,
    subject33: subject33 === "Select subject" ? "Select Teacher" : null,
    subject34: subject34 === "Select subject" ? "Select Teacher" : null,
  };
  if (Object.values(errors).some((error) => error !== null)) {
    return { errors, resetKey: prevState.resetKey };
  }
  const data = {
    timetableData: {
      schedule: [
        {
          day: "Monday",
          periods: [
            { subject: subject1, startTime: "12:00", endTime: "13:00" },
            { subject: subject2, startTime: "13:00", endTime: "14:00" },
            { subject: subject3, startTime: "14:00", endTime: "15:00" },
            { subject: subject4, startTime: "15:00", endTime: "16:00" },
            { subject: subject5, startTime: "16:00", endTime: "17:00" },
            { subject: subject6, startTime: "17:00", endTime: "18:00" },
          ],
        },
        {
          day: "Tuesday",
          periods: [
            { subject: subject7, startTime: "12:00", endTime: "13:00" },
            { subject: subject8, startTime: "13:00", endTime: "14:00" },
            { subject: subject9, startTime: "14:00", endTime: "15:00" },
            { subject: subject10, startTime: "15:00", endTime: "16:00" },
            { subject: subject11, startTime: "16:00", endTime: "17:00" },
            { subject: subject12, startTime: "17:00", endTime: "18:00" },
          ],
        },

        {
          day: "Wednesday",
          periods: [
            { subject: subject13, startTime: "12:00", endTime: "13:00" },
            { subject: subject14, startTime: "13:00", endTime: "14:00" },
            { subject: subject15, startTime: "14:00", endTime: "15:00" },
            { subject: subject16, startTime: "15:00", endTime: "16:00" },
            { subject: subject17, startTime: "16:00", endTime: "17:00" },
            { subject: subject18, startTime: "17:00", endTime: "18:00" },
          ],
        },
        {
          day: "Thursday",
          periods: [
            { subject: subject19, startTime: "12:00", endTime: "13:00" },
            { subject: subject20, startTime: "13:00", endTime: "14:00" },
            { subject: subject21, startTime: "14:00", endTime: "15:00" },
            { subject: subject22, startTime: "15:00", endTime: "16:00" },
            { subject: subject23, startTime: "16:00", endTime: "17:00" },
            { subject: subject24, startTime: "17:00", endTime: "18:00" },
          ],
        },
        {
          day: "Friday",
          periods: [
            { subject: subject25, startTime: "12:00", endTime: "13:00" },
            { subject: subject26, startTime: "13:00", endTime: "14:00" },
            { subject: subject27, startTime: "14:00", endTime: "15:00" },
            { subject: subject28, startTime: "15:00", endTime: "16:00" },
            { subject: subject29, startTime: "16:00", endTime: "17:00" },
            { subject: subject30, startTime: "17:00", endTime: "18:00" },
          ],
        },
        {
          day: "Saturday",
          periods: [
            { subject: subject31, startTime: "12:00", endTime: "13:00" },
            { subject: subject32, startTime: "13:00", endTime: "14:00" },
            { subject: subject33, startTime: "14:00", endTime: "15:00" },
            { subject: subject34, startTime: "15:00", endTime: "16:00" },
          ],
        },
      ],
    },
  };

  try {
    // console.log("befor axios");
    const response = await axiosInstance.post("/api/teacher/timetable", data, {
      headers: {
        Cookie: cookieString,
      },
    });
    // console.log(response);
    revalidatePath("/teacher");
    // revalidatePath("/dashboard/classrooms");
    // revalidatePath("/dashboard/students");
    // revalidatePath("/");
    return {
      success: true,
      data: response.data,
      message: response.data?.message,
      resetKey: Date.now(),
    };
  } catch (error) {
    // console.log("hi");
    if (isAxiosError(error)) {
      console.error(error.response?.data?.message);
    } else {
      console.error(error);
    }
    return {
      errors,
      success: false,
      message: "student could not be assigned :(",
      resetKey: prevState.resetKey,
    };
  }
}

export async function deleteClass(id) {
  try {
    const response = await axiosInstance.delete(
      `/api/principal/classrooms/${id}`,
      {
        headers: {
          Cookie: cookieString,
        },
      }
    );
    // console.log(response.data.message);
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/classrooms");
    revalidatePath("/dashboard/teachers");
    revalidatePath("/dashboard/students");
    return {
      success: true,
      message: response.data?.message,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      // console.log(error.response?.data?.message);
    } else {
      // console.log(error);
    }
    return {
      success: false,
      message: "Class could not be deleted :(",
    };
  }
}

export async function deleteStudentPrincipal(id) {
  try {
    const response = await axiosInstance.delete(
      `/api/principal/students/${id}`,
      {
        headers: {
          Cookie: cookieString,
        },
      }
    );
    // console.log(response.data.message);
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/classrooms");
    revalidatePath("/dashboard/teachers");
    revalidatePath("/dashboard/students");
    return {
      success: true,
      message: response.data?.message,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      // console.log(error.response?.data?.message);
    } else {
      // console.log(error);
    }
    return {
      success: false,
      message: "Student could not be deleted :(",
    };
  }
}

export async function deleteStudentTeacher(id) {
  // console.log("hiiiii");
  try {
    const response = await axiosInstance.delete(
      `/api/teacher/delete-student/${id}`,
      {
        headers: {
          Cookie: cookieString,
        },
      }
    );
    // console.log(response.data.message);
    revalidatePath("/teacher");

    return {
      success: true,
      message: response.data?.message,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      // console.log(error.response?.data?.message);
    } else {
      // console.log(error);
    }
    return {
      success: false,
      message: "Student could not be deleted :(",
    };
  }
}

export async function modifyTimetable(prevState, formData) {
  // console.log("hiii", Date.now());
  const subject1 = formData?.get("monday_period_1");
  const subject2 = formData?.get("monday_period_2");
  const subject3 = formData?.get("monday_period_3");
  const subject4 = formData?.get("monday_period_4");
  const subject5 = formData?.get("monday_period_5");
  const subject6 = formData?.get("monday_period_6");
  const subject7 = formData?.get("tuesday_period_1");
  const subject8 = formData?.get("tuesday_period_2");
  const subject9 = formData?.get("tuesday_period_3");
  const subject10 = formData?.get("tuesday_period_4");
  const subject11 = formData?.get("tuesday_period_5");
  const subject12 = formData?.get("tuesday_period_6");
  const subject13 = formData?.get("wednesday_period_1");
  const subject14 = formData?.get("wednesday_period_2");
  const subject15 = formData?.get("wednesday_period_3");
  const subject16 = formData?.get("wednesday_period_4");
  const subject17 = formData?.get("wednesday_period_5");
  const subject18 = formData?.get("wednesday_period_6");
  const subject19 = formData?.get("thursday_period_1");
  const subject20 = formData?.get("thursday_period_2");
  const subject21 = formData?.get("thursday_period_3");
  const subject22 = formData?.get("thursday_period_4");
  const subject23 = formData?.get("thursday_period_5");
  const subject24 = formData?.get("thursday_period_6");
  const subject25 = formData?.get("friday_period_1");
  const subject26 = formData?.get("friday_period_2");
  const subject27 = formData?.get("friday_period_3");
  const subject28 = formData?.get("friday_period_4");
  const subject29 = formData?.get("friday_period_5");
  const subject30 = formData?.get("friday_period_6");
  const subject31 = formData?.get("saturday_period_1");
  const subject32 = formData?.get("saturday_period_2");
  const subject33 = formData?.get("saturday_period_3");
  const subject34 = formData?.get("saturday_period_4");
  // console.log(subject1);

  const errors = {
    subject1: subject1 === "Select subject" ? "Select Teacher" : null,
    subject2: subject2 === "Select subject" ? "Select Teacher" : null,
    subject3: subject3 === "Select subject" ? "Select Teacher" : null,
    subject4: subject4 === "Select subject" ? "Select Teacher" : null,
    subject5: subject5 === "Select subject" ? "Select Teacher" : null,
    subject6: subject6 === "Select subject" ? "Select Teacher" : null,
    subject7: subject7 === "Select subject" ? "Select Teacher" : null,
    subject8: subject8 === "Select subject" ? "Select Teacher" : null,
    subject9: subject9 === "Select subject" ? "Select Teacher" : null,
    subject10: subject10 === "Select subject" ? "Select Teacher" : null,
    subject11: subject11 === "Select subject" ? "Select Teacher" : null,
    subject12: subject12 === "Select subject" ? "Select Teacher" : null,
    subject13: subject13 === "Select subject" ? "Select Teacher" : null,
    subject14: subject14 === "Select subject" ? "Select Teacher" : null,
    subject15: subject15 === "Select subject" ? "Select Teacher" : null,
    subject16: subject16 === "Select subject" ? "Select Teacher" : null,
    subject17: subject17 === "Select subject" ? "Select Teacher" : null,
    subject18: subject18 === "Select subject" ? "Select Teacher" : null,
    subject19: subject19 === "Select subject" ? "Select Teacher" : null,
    subject20: subject20 === "Select subject" ? "Select Teacher" : null,
    subject21: subject21 === "Select subject" ? "Select Teacher" : null,
    subject22: subject22 === "Select subject" ? "Select Teacher" : null,
    subject23: subject23 === "Select subject" ? "Select Teacher" : null,
    subject24: subject24 === "Select subject" ? "Select Teacher" : null,
    subject25: subject25 === "Select subject" ? "Select Teacher" : null,
    subject26: subject26 === "Select subject" ? "Select Teacher" : null,
    subject27: subject27 === "Select subject" ? " Select Teacher" : null,
    subject28: subject28 === "Select subject" ? "Select Teacher" : null,
    subject29: subject29 === "Select subject" ? "Select Teacher" : null,
    subject30: subject30 === "Select subject" ? "Select Teacher" : null,
    subject31: subject31 === "Select subject" ? "Select Teacher" : null,
    subject32: subject32 === "Select subject" ? " Select Teacher" : null,
    subject33: subject33 === "Select subject" ? "Select Teacher" : null,
    subject34: subject34 === "Select subject" ? "Select Teacher" : null,
  };
  if (Object.values(errors).some((error) => error !== null)) {
    return { errors, resetKey: prevState.resetKey };
  }
  const data = {
    updateData: {
      schedule: [
        {
          day: "Monday",
          periods: [
            { subject: subject1, startTime: "12:00", endTime: "13:00" },
            { subject: subject2, startTime: "13:00", endTime: "14:00" },
            { subject: subject3, startTime: "14:00", endTime: "15:00" },
            { subject: subject4, startTime: "15:00", endTime: "16:00" },
            { subject: subject5, startTime: "16:00", endTime: "17:00" },
            { subject: subject6, startTime: "17:00", endTime: "18:00" },
          ],
        },
        {
          day: "Tuesday",
          periods: [
            { subject: subject7, startTime: "12:00", endTime: "13:00" },
            { subject: subject8, startTime: "13:00", endTime: "14:00" },
            { subject: subject9, startTime: "14:00", endTime: "15:00" },
            { subject: subject10, startTime: "15:00", endTime: "16:00" },
            { subject: subject11, startTime: "16:00", endTime: "17:00" },
            { subject: subject12, startTime: "17:00", endTime: "18:00" },
          ],
        },

        {
          day: "Wednesday",
          periods: [
            { subject: subject13, startTime: "12:00", endTime: "13:00" },
            { subject: subject14, startTime: "13:00", endTime: "14:00" },
            { subject: subject15, startTime: "14:00", endTime: "15:00" },
            { subject: subject16, startTime: "15:00", endTime: "16:00" },
            { subject: subject17, startTime: "16:00", endTime: "17:00" },
            { subject: subject18, startTime: "17:00", endTime: "18:00" },
          ],
        },
        {
          day: "Thursday",
          periods: [
            { subject: subject19, startTime: "12:00", endTime: "13:00" },
            { subject: subject20, startTime: "13:00", endTime: "14:00" },
            { subject: subject21, startTime: "14:00", endTime: "15:00" },
            { subject: subject22, startTime: "15:00", endTime: "16:00" },
            { subject: subject23, startTime: "16:00", endTime: "17:00" },
            { subject: subject24, startTime: "17:00", endTime: "18:00" },
          ],
        },
        {
          day: "Friday",
          periods: [
            { subject: subject25, startTime: "12:00", endTime: "13:00" },
            { subject: subject26, startTime: "13:00", endTime: "14:00" },
            { subject: subject27, startTime: "14:00", endTime: "15:00" },
            { subject: subject28, startTime: "15:00", endTime: "16:00" },
            { subject: subject29, startTime: "16:00", endTime: "17:00" },
            { subject: subject30, startTime: "17:00", endTime: "18:00" },
          ],
        },
        {
          day: "Saturday",
          periods: [
            { subject: subject31, startTime: "12:00", endTime: "13:00" },
            { subject: subject32, startTime: "13:00", endTime: "14:00" },
            { subject: subject33, startTime: "14:00", endTime: "15:00" },
            { subject: subject34, startTime: "15:00", endTime: "16:00" },
          ],
        },
      ],
    },
  };
  // console.log("dataaaaaa", data, "dataaaaaa");

  try {
    // console.log("befor axios");
    const response = await axiosInstance.put("/api/teacher/timetable", data, {
      headers: {
        Cookie: cookieString,
      },
    });
    // console.log(response);
    revalidatePath("/teacher");
    // revalidatePath("/dashboard/classrooms");
    // revalidatePath("/dashboard/students");
    // revalidatePath("/");
    return {
      success: true,
      data: response.data,
      message: response.data?.message,
      resetKey: Date.now(),
    };
  } catch (error) {
    // console.log("hi");
    if (isAxiosError(error)) {
      console.error(error.response?.data?.message);
    } else {
      console.error(error);
    }
    return {
      errors,
      success: false,
      message: "student could not be assigned :(",
      resetKey: prevState.resetKey,
    };
  }
}

export async function deleteTimetableAction(id) {
  try {
    const response = await axiosInstance.delete(
      `/api/teacher/timetable/${id}`,
      {
        headers: {
          Cookie: cookieString,
        },
      }
    );
    // console.log(response);
    revalidatePath("/teacher");
    return {
      success: true,
      message: response.data?.message,
    };
  } catch (error) {
    console.error(error.response?.data?.message);
    return {
      success: false,
      message: "Failed to delete timetable :(",
    };
  }
}

export async function deleteTeacher(id) {
  try {
    const response = await axiosInstance.delete(
      `/api/principal/teachers/${id}`,
      {
        headers: {
          Cookie: cookieString,
        },
      }
    );
    // console.log(response);
    revalidatePath("/dashboard/teachers");
    revalidatePath("/dashboard/students");

    revalidatePath("/dashboard/classrooms");
    revalidatePath("/dashboard/");

    return {
      success: true,
      message: response.data?.message,
    };
  } catch (error) {
    console.error(error.response?.data?.message);
    return {
      success: false,
      message: "Failed to delete teacher :(",
    };
  }
}
export async function getTeacherById(id) {
  try {
    const response = await axiosInstance.get(`/api/principal/teachers/${id}`, {
      headers: {
        Cookie: cookieString,
      },
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error(error.response?.data?.message);
    return {
      success: false,
      message: "Failed to fetching teacher :(",
    };
  }
}

export async function updateTeacherAction(prevState, formData) {
  const id = formData.get("teacherId");
  const email = formData.get("email");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const password = formData.get("password");
  // console.log(id, email, firstName, lastName, password);
  const data = {
    email,
    firstName,
    lastName,
    password,
  };
  try {
    const response = await axiosInstance.put(
      `/api/principal/teachers/${id}`,
      data,
      {
        headers: {
          Cookie: cookieString,
        },
      }
    );
    // console.log(response.data);
    revalidatePath("/dashboard/teachers");
    revalidatePath("/dashboard/students");
    return {
      success: true,
      message: response.data?.message,
    };
  } catch (error) {
    console.error(error.response?.data?.message);
    return {
      success: false,
      message: "Failed to update teacher :(",
    };
  }
}

export async function getStudentById(id) {
  try {
    const response = await axiosInstance.get(`/api/teacher/students/${id}`, {
      headers: {
        Cookie: cookieString,
      },
    });
    // console.log(response.data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error(error.response?.data?.message);
    return {
      success: false,
      message: "Failed to fetching student :(",
    };
  }
}

export async function updateStudentAction(prevState, formData) {
  const id = formData.get("studentId");
  const email = formData.get("email");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const password = formData.get("password");
  // console.log(id, email, firstName, lastName, password);
  const data = {
    email,
    firstName,
    lastName,
    password,
  };
  try {
    const response = await axiosInstance.put(
      `/api/teacher/students/${id}`,
      data,
      {
        headers: {
          Cookie: cookieString,
        },
      }
    );
    // console.log(response.data);
    revalidatePath("/dashboard/students");
    revalidatePath("/dashboard/students");
    return {
      success: true,
      message: response.data?.message,
    };
  } catch (error) {
    console.error(error.response?.data?.message);
    return {
      success: false,
      message: "Failed to update student :(",
    };
  }
}
