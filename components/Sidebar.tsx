"use client";
import React, { useState } from "react";
import { FaBars, FaSearch } from "react-icons/fa";
import { Navlinks } from "@/constants";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { UserButton } from "@clerk/nextjs";
import { LogInIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiVideoUploadFill } from "react-icons/ri";
import { useUserStore } from "@/store";

const SidebarNavbar: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useUserStore();

  // Hide layout for certain paths
  if (pathname === "/sign-in" || pathname === "/sign-up") {
    return <>{children}</>;
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-56 bg-[#1E1E2D] text-white p-4 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Image
              src={"/image/television.png"}
              alt="logo"
              width={32}
              height={32}
            />
            <h2 className="text-xl font-bold ml-2">VideoPal</h2>
          </div>
        </div>
        <nav>
          <ul className="flex flex-col gap-3">
            {Navlinks.map((link) => {
              const isActive = link.route === pathname;
              const isPublic = link.label === "Home";
              const isUserChannel = link.label === "My Channel";
              return (
                <>
                  {isPublic ? (
                    <li
                      onClick={() => setIsSidebarOpen(false)}
                      key={link.label}
                    >
                      <Link
                        href={`${
                          isUserChannel
                            ? `/channel/${user?.username}`
                            : `${link.route}`
                        }`}
                        className={`flex items-center p-3 rounded-md hover:bg-gray-700 ${
                          isActive
                            ? "bg-blue-600 text-white"
                            : "bg-[#2A2A38] text-gray-400"
                        }`}
                      >
                        <Image
                          src={link.icon}
                          alt={link.label}
                          width={20}
                          height={20}
                          className="mr-2"
                        />
                        <span className="text-base font-semibold">
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  ) : (
                    <SignedIn>
                      <li
                        onClick={() => setIsSidebarOpen(false)}
                        key={link.label}
                      >
                        <Link
                          href={`${
                            link.label === "My Channel"
                              ? `/channel/${user?.username}`
                              : `${link.route}`
                          }`}
                          className={`flex items-center p-3 rounded-md hover:bg-gray-700 ${
                            isActive
                              ? "bg-blue-600 text-white"
                              : "bg-[#2A2A38] text-gray-400"
                          }`}
                        >
                          <Image
                            src={link.icon}
                            alt={link.label}
                            width={20}
                            height={20}
                            className="mr-2"
                          />
                          <span className="text-base font-semibold">
                            {link.label}
                          </span>
                        </Link>
                      </li>
                    </SignedIn>
                  )}
                </>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Overlay to close sidebar on mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div
        className={`flex flex-col flex-grow ${
          isSidebarOpen ? "ml-56" : "ml-0"
        } transition-all duration-300`}
      >
        <nav className="bg-[#1E1E2D] text-white w-full p-3 flex items-center justify-between shadow-md z-10">
          {/* Hamburger Menu for Mobile and Desktop */}
          <button className=" text-white" onClick={toggleSidebar}>
            <FaBars size={20} />
          </button>

          {/* Search Bar */}
          <div className="flex-grow max-w-lg mx-2 md:mx-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-gray-800 text-gray-200 rounded-full pl-10 pr-4 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <FaSearch className="absolute top-2 left-2 text-gray-400" />
            </div>
          </div>

          {/* User Profile/Other Icons */}
          <div className="flex justify-center items-center gap-4">
            <SignedIn>
              <Link href={"/upload"}>
                <RiVideoUploadFill className="text-3xl" />
              </Link>
            </SignedIn>
            <div className="flex items-center space-x-3">
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <Link href="/sign-in">
                  <LogInIcon className="text-white" size={20} />
                </Link>
              </SignedOut>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="flex-1 p-4 bg-gray-800 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default SidebarNavbar;
