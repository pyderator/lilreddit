import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

const Navbar = () => {
  const [result, reexecuteQuery] = useMeQuery();
  const [, logout] = useLogoutMutation();

  // console.log(result.data.me);

  if (!result.fetching) {
    if (result.data.me.data) {
      alert(1);
      return (
        <nav className="bg-black h-20 w-full flex justify-center">
          <div className="flex flex-row w-full max-w-screen-lg m-auto justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">LilReddit</h1>
            </div>
            <div className="flex flex-row items-center">
              <p className="text-2xl font-bold text-white mr-5">
                Hello, {result.data.me.data.username}
              </p>
              <button
                onClick={() => logout()}
                className="bg-purple-500 text-white text-xl py-2 px-4 mx-2 hover:bg-purple-700 cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
      );
    } else {
      return (
        <nav className="bg-black h-20 w-full flex justify-center">
          <div className="flex flex-row w-full max-w-screen-lg m-auto justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">LilReddit</h1>
            </div>
            <div className="flex flex-row">
              <a
                href="/login"
                className="bg-purple-500 text-white text-xl py-2 px-4 mx-2 hover:bg-purple-700 cursor-pointer"
              >
                Login
              </a>
              <a
                href="/register"
                className="bg-purple-500 text-white text-xl py-2 px-4 mx-2 hover:bg-purple-700 cursor-pointer"
              >
                Register
              </a>
            </div>
          </div>
        </nav>
      );
    }
  } else {
    <p>Loading</p>;
  }
  return (
    <nav className="bg-black">
      <div className="flex flex-row max-w-screen-md m-auto">
        <div>
          <h1 className="text-4xl font-bold ">LilReddit</h1>
        </div>
        <div></div>
      </div>
    </nav>
  );
};

export default Navbar;
