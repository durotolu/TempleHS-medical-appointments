import React from "react";
import { Logo } from "./Logo";

interface Card {
  id: number;
  name: string;
  email: string;
}

// const SignUp: React.FC<{ card: Card }> = ({ card }) => {
const SignUp = () => {
  return (
    <div className="bg-white h-full">
      <div className="flex flex-col items-center">
        <Logo />
        <div className="text-center text-green-950 text-[34px] mt-12 font-extrabold font-['Micro Grotesk']">
          Create an account
        </div>
        <div className="text-center text-green-950 text-xl mb-12 font-normal font-['General Sans']">
          You are a couple of clicks away from the best access to medical care
        </div>
        <div className="flex-col w-full max-w-[500px] justify-start items-center gap-7 inline-flex">
          <div className="w-full h-24">
            <div className="text-black text-lg font-normal font-['General Sans']">
              Email address
            </div>
            <input
              placeholder="name@mail.com"
              className="w-full h-[60px] p-3 rounded-md border border-stone-300"
            />
          </div>
          <div className="w-full h-24">
            <div className="text-black text-lg font-normal font-['General Sans']">
              Date of birth
            </div>
            <input
              placeholder="MM/DD/YYYY"
              className="w-full h-[60px] p-3 rounded-md border border-stone-300"
            />
          </div>
          <div className="w-full h-24">
            <div className="text-black text-lg font-normal font-['General Sans']">
              Password
            </div>
            <input
              placeholder="Password"
              className="w-full h-[60px] p-3 rounded-md border border-stone-300"
            />
          </div>
          <button className="px-10 py-[18px] bg-green-800 rounded-[70px] justify-center items-center gap-3 self-end gap-3 inline-flex">
            <div className="text-white text-opacity-90 text-lg font-normal font-['General Sans']">
              Create Account
            </div>
          </button>
        </div>

        <div className="w-[300px] h-[0px] border border-neutral-800 border-opacity-20 mt-[90px] mb-[50px]"></div>

        <div className="text-center">
          <span className="text-green-950 text-xl font-normal font-['General Sans']">
            Already a member?{" "}
          </span>
          <span className="text-green-600 text-xl font-normal font-['General Sans']">
            Sign in
          </span>
        </div>
        
        {/* <div className="w-[300px] h-[0px] border border-neutral-800 border-opacity-20"></div>
        <div className="w-[844px] h-[0px] border-8 border-gray-200"></div>
        <div className="w-[211px] h-[0px] border-8 border-green-800"></div> */}


      </div>
    </div>
  );
};

export default SignUp;
