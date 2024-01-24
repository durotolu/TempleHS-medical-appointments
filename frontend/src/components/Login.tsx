import React, { FormEvent, useRef, useState } from "react";
import { Logo } from "./Icons/Logo";
import Link from "next/link";
import { useRouter } from "next/router";

interface UserLogin {
  password: string;
  email: string;
}

const Login = () => {
  const apiUrl: string =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const ref = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const loginUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const loginDetails: UserLogin = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDetails),
      });
      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(
          errorDetails.message || "Failed to submit the data. Please try again."
        );
      }
      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user_id", data.user_id);
      localStorage.setItem("user_email", data.email);
      router.push("/doctors");
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      setError(message);
    } finally {
      ref.current?.reset();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Logo />
      <div className="text-center text-green-950 text-[34px] mt-12 font-extrabold font-['Micro Grotesk']">
        Sign In
      </div>
      <div className="text-center mb-12">
        <span className="text-stone-800 text-xl font-normal font-['General Sans'] leading-7">
          Is this your first time here?{" "}
        </span>
        <Link
          href="/"
          className="text-green-700 text-xl font-medium font-['General Sans'] leading-7"
        >
          Create an account instead
        </Link>
      </div>
      <form
        ref={ref}
        onSubmit={loginUser}
        className="flex-col w-full max-w-[500px] justify-start items-center gap-7 inline-flex"
      >
        <div className="w-full h-24">
          <div className="text-black text-lg font-normal font-['General Sans']">
            Email address
          </div>
          <input
            placeholder="johndoe@xyz.com"
            name="email"
            type="email"
            required
            className="w-full h-[60px] p-3 rounded-md border border-stone-300"
          />
        </div>
        <div className="w-full h-24">
          <div className="text-black text-lg font-normal font-['General Sans']">
            Password
          </div>
          <input
            placeholder="*********"
            name="password"
            type="password"
            required
            className="w-full h-[60px] p-3 rounded-md border border-stone-300"
          />
        </div>
        <div className="h-2" style={{ color: "red" }}>
          {error}
        </div>
        <div className="h-10 justify-center items-center gap-4 inline-flex self-end">
          <div className="px-4 py-2 rounded-[40px] justify-center items-center gap-2.5 flex">
            <div className="text-stone-700 text-sm font-medium font-['General Sans'] leading-snug">
              Forgot Password?
            </div>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-700 rounded-[40px] justify-center items-center gap-2.5 flex"
          >
            <div className="text-stone-50 text-sm font-medium font-['General Sans'] leading-snug">
              Sign In
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
