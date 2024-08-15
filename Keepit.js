// "use client";
// import { useRouter } from "next/navigation";
// import { useFormState, useFormStatus } from "react-dom";
// import { loginUser } from "../_lib/action";
// import userState from "../_utils/user-state";
// import { toast } from "react-toastify";
// import { setCookie } from "cookies-next";
// import { useEffect } from "react";

// export default function Page() {
//   const initialState = {
//     errors: {
//       email: null,
//       password: null,
//       role: null,
//     },
//     success: null,
//     data: null,
//     message: null,
//     resetKey: Date.now(),
//   };

//   const router = useRouter();
//   const [state, action] = useFormState(loginUser, initialState);
//   const { pending } = useFormStatus();

//   useEffect(() => {
//     if (state.success) {
//       toast.success(state.message);
//       const userId = state.data?.data?.user?._id;
//       const userRole = state.data?.data?.user?.role;
//       const accessToken = state.data?.data?.accessToken;

//       userState.setUser({ _id: userId, role: userRole });
//       setCookie("accessToken", accessToken, { maxAge: 1200000 });
//       setCookie("role", userRole, { maxAge: 1200000 });

//       switch (userRole) {
//         case "Principal":
//           router.push("/dashboard");
//           break;
//         case "Teacher":
//           router.push("/teacher");
//           break;
//         case "Student":
//           router.push("/student");
//           break;
//         default:
//           router.push("/");
//       }
//     }

//     if (state.success === false) {
//       toast.error(state.message);
//     }
//   }, [state, router]);

//   return (
//     <form action={action}>
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <div className="relative flex flex-col md:flex-row space-y-8 md:space-y-0 bg-white shadow-xl rounded-lg overflow-hidden max-w-4xl w-full">
//           <div className="flex flex-col justify-center p-8 md:p-12 space-y-6 w-full md:w-1/2">
//             <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
//               Welcome Back
//             </h1>
//             <p className="text-gray-600">
//               Please enter your details to sign in.
//             </p>

//             <div className="space-y-4">
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-gray-700 font-medium mb-1"
//                 >
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//                 {state.errors?.email && (
//                   <p className="text-sm text-red-500">{state.errors.email}</p>
//                 )}
//               </div>

//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block text-gray-700 font-medium mb-1"
//                 >
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//                 {state.errors?.password && (
//                   <p className="text-sm text-red-500">
//                     {state.errors.password}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label
//                   htmlFor="role"
//                   className="block text-gray-700 font-medium mb-1"
//                 >
//                   Role
//                 </label>
//                 <select
//                   id="role"
//                   name="role"
//                   className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 >
//                   <option value="">Select a Role</option>
//                   <option value="Principal">Principal</option>
//                   <option value="Teacher">Teacher</option>
//                   <option value="Student">Student</option>
//                 </select>
//                 {state.errors?.role && (
//                   <p className="text-sm text-red-500">{state.errors.role}</p>
//                 )}
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={pending}
//               className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
//             >
//               {pending ? "Signing in..." : "Sign in"}
//             </button>
//           </div>

<div className="hidden md:block relative w-full md:w-1/2">
  <img
    src="/vertical.jpg"
    alt="MySchool Academy"
    className="w-full h-full object-cover rounded-l-lg"
  />
  <div className="absolute bottom-6 right-6 p-6 bg-white bg-opacity-60 rounded-lg shadow-lg">
    <blockquote className="text-black-800 font-semibold">
      &quot;Unlock your potential with MySchool Academy, where every login is a
      step toward a brighter, more empowered future.&quot;
    </blockquote>
  </div>
</div>;
// </div>
//       </div>
//     </form>
//   );
// }
