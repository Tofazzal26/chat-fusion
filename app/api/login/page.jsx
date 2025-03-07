"use client";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const { email, password } = data;
    setLoading(true);
    try {
      const resp = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (resp?.status === 200) {
        toast.success("Login Successful");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        router.push("/");
      } else {
        toast.error("Password not match");
      }
    } catch (error) {
      console.log("Server Error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="absolute top-[50%] lg:left-[35%] left-[25%] translate-y-[-50%]">
        <div className="border-2 border-gray-200 rounded-md">
          <div className="md:px-[60px] px-[20px] pb-[10px] md:pb-6">
            <h1 className="text-center text-lg md:text-xl my-4 md:my-6 uppercase">
              Login and Register
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="text-gray-500">Email *</label>
                <br />
                <input
                  type="text"
                  className="md:py-[10px] py-2 mt-2 mb-4 px-3 w-full md:w-[400px] md:px-5 bg-[#f3f4f7] border-[1px]  outline-none rounded-none border-gray-200"
                  {...register("email", { required: true })}
                />
                <br />
                {errors.email && (
                  <span className="text-red-400">
                    This Email field is required
                  </span>
                )}
              </div>
              <div>
                <label className="text-gray-500">Password *</label>
                <br />
                <input
                  type="password"
                  className="md:py-[10px] py-2 mt-2 mb-4 px-3 w-full md:w-[400px] md:px-5 bg-[#f3f4f7] border-[1px]  outline-none rounded-none border-gray-200"
                  {...register("password", { required: true })}
                />
                <br />
                {errors.password && (
                  <span className="text-red-400">
                    This Password field is required
                  </span>
                )}
              </div>
              <button
                disabled={loading}
                className={`bg-[#6f23fd] text-white text-lg w-full py-[10px] mt-4 cursor-pointer disabled:opacity-50 flex justify-center items-center`}
              >
                {loading ? <Loader className="animate-spin" /> : "Login"}
              </button>
              <h2 className="mt-4 text-gray-600">
                This will handle both{" "}
                <span className="text-red-400">Login</span> and{" "}
                <span className="text-red-400">Registration.</span>
              </h2>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
