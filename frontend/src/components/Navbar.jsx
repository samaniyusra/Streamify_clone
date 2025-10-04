import React from "react";
import useAuthUser from "../hooks/useAuthUser";
import { Link, useLocation } from "react-router";
import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  const { logoutMutate } = useLogout();

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full">
          {/* Left side: Logo (only on chat page) */}
          {isChatPage ? (
            <Link to="/" className="flex items-center gap-2.5">
              <ShipWheelIcon className="size-9 text-primary" />
              <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                Streamify
              </span>
            </Link>
          ) : (
            <div /> // keeps spacing balanced when not on chat page
          )}

          {/* Right side: Buttons, Theme, Avatar, Logout */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link to="/notifications">
              <button className="btn btn-ghost btn-circle hover:bg-gray-500/50">
                <BellIcon className="h-6 w-6 text-base-content opacity-70" />
              </button>
            </Link>

            <ThemeSelector />

            <div className="avatar hover:bg-gray-500/50">
              <div className="w-9 rounded-full">
                <img src={authUser?.profilePic || "/default-avatar.png"} />
              </div>
            </div>

            <button
              className="btn btn-ghost btn-circle hover:bg-gray-500/50"
              onClick={logoutMutate}
            >
              <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
