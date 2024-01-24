import React, { FormEvent, useRef, useState } from "react";
import { Logo } from "./Icons/Logo";
import Link from "next/link";
import { useRouter } from "next/router";

interface UserRegister {
  date_of_birth: string;
  password: string;
  email: string;
}

const Register = () => {
  const apiUrl: string =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const ref = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const createUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const newUserDetails: UserRegister = {
      email: formData.get("email") as string,
      date_of_birth: formData.get("dateOfBirth") as string,
      password: formData.get("password") as string,
    };

    try {
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserDetails),
      });
      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(
          errorDetails.message || "Failed to submit the data. Please try again."
        );
      }
      router.push("/login");
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
        Create an account
      </div>
      <div className="text-center text-green-950 text-xl mb-12 font-normal font-['General Sans']">
        You are a couple of clicks away from the best access to medical care
      </div>
      <form
        ref={ref}
        onSubmit={createUser}
        className="flex-col w-full max-w-[500px] justify-start items-center gap-7 inline-flex"
      >
        <div className="w-full h-24">
          <div className="text-black text-lg font-normal font-['General Sans']">
            Email address
          </div>
          <input
            placeholder="name@mail.com"
            name="email"
            type="email"
            required
            className="w-full h-[60px] p-3 rounded-md border border-stone-300"
          />
        </div>
        <div className="w-full h-24">
          <div className="text-black text-lg font-normal font-['General Sans']">
            Date of birth
          </div>
          <input
            placeholder="MM/DD/YYYY"
            name="dateOfBirth"
            type="date"
            required
            className="w-full h-[60px] p-3 rounded-md border border-stone-300"
          />
        </div>
        <div className="w-full h-24">
          <div className="text-black text-lg font-normal font-['General Sans']">
            Password
          </div>
          <input
            placeholder="Password"
            name="password"
            type="password"
            required
            className="w-full h-[60px] p-3 rounded-md border border-stone-300"
          />
        </div>
        <div className="h-2" style={{ color: "red" }}>
          {error}
        </div>
        <button
          type="submit"
          className="px-10 py-[18px] bg-green-800 rounded-[70px] justify-center items-center gap-3 self-end gap-3 inline-flex"
        >
          <div className="text-white text-opacity-90 text-lg font-normal font-['General Sans']">
            Create Account
          </div>
        </button>
      </form>
      <div className="w-[300px] h-[0px] border border-neutral-800 border-opacity-20 mt-[90px] mb-[50px]"></div>
      <div className="text-center">
        <span className="text-green-950 text-xl font-normal font-['General Sans']">
          Already a member?{" "}
        </span>
        <Link
          href="/login"
          className="text-green-600 text-xl font-normal font-['General Sans']"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default Register;
