"use client";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import { loginUser } from "../_lib/action";
import userState from "../_utils/user-state";
import { toast } from "react-toastify";
import { setCookie } from "cookies-next";
import { useEffect } from "react";
export default function Page() {
  const initialState = {
    errors: {
      userNameOrEmail: null,
      password: null,
      role: null,
    },
    success: null,
    data: null,
    message: null,
    resetKey: Date.now(),
  };
  const router = useRouter();
  const [state, action] = useFormState(loginUser, initialState);
  const { pending } = useFormStatus();

  useEffect(
    function () {
      if (state.success) {
        // console.log("reached toast success");
        toast.success(state.message);
        const userId = state.data?.data?.user?._id;
        const userRole = state.data?.data?.user?.role;
        const accessToken = state.data?.data?.accessToken;
        console.log(accessToken);
        userState.setUser({ _id: userId, role: userRole });
        setCookie("accessToken", accessToken, {
          maxAge: "1200000",
        });
        if (userRole === "Principal") {
          router.push("/dashboard");
        } else if (userRole === "Teacher") {
          router.push("/teacher");
        } else if (userRole === "Student") {
          router.push("/student");
        }

        // setTimeout(() => {
        //   window.location.href = "/";
        // }, 500);
      }
      if (state.success === false) {
        toast.error(state.message);
      }
    },
    [state]
  );

  return (
    <form action={action}>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          <div className="flex flex-col justify-center p-8 md:p-14">
            <span className="mb-3 text-4xl font-bold text-black">
              Welcome back
            </span>
            <span className="font-light text-gray-400 mb-8">
              Please enter your details.
            </span>
            <div className="mb-2">
              <span className="mb-2 text-md text-black">Email</span>
              <input
                type="text"
                // className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                className="w-full rounded-lg border border-gray-300 bg-zinc-100 p-3 font-normal placeholder:text-sm "
                name="email"
                id="email"
              />
              {state.errors?.email && (
                <p className="p-3  text-xs text-red-500">{`${state.errors.email}`}</p>
              )}
            </div>
            <div className="mb-2">
              <span className="mb-2 text-md">Password</span>
              <input
                type="password"
                name="password"
                id="pass"
                // className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 text-black"
                className="w-full rounded-lg border border-gray-300 bg-zinc-100 p-3 font-normal placeholder:text-sm "
              />
              {state?.errors?.password && (
                <p className="p-3 text-xs text-red-500">{`${state.errors.password}`}</p>
              )}
            </div>

            <div className="mb-2">
              <label className="mb-2 text-md" for="role">
                Role
              </label>
              <select
                id="role"
                name="role"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option selected>Select a Role</option>
                <option value="Principal">Principal</option>
                <option value="Teacher">Teacher</option>
                <option value="Student">Student</option>
              </select>
              {state.errors?.role && (
                <p className="p-3 text-xs text-red-500">{`${state.errors.role}`}</p>
              )}
            </div>

            <button className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:outline hover:outline-gray-300">
              Sign in
            </button>
          </div>
          <div className="relative">
            <img
              src="/vertical.jpg"
              alt="img"
              className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
            />

            <div className="absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
              <span className="text-white text-xl">
                &quote;We&apos;ve been uesing Untitle to kick
                <br />
                start every new project and can&apos;t <br />
                imagine working without it.&quote;
              </span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
