import React from "react";
import { Outlet, useNavigate } from "react-router-dom"; 
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Contribute", href: "/create", current: false },
  { name: "All Projects", href: "/all-projects" },
  { name: "Events", href: "/eventlist" },
  { name: "Ask AI", href: "/chatbot" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}


const Layout = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate(); 
  const handleSignOut = () => {
    // Clear JWT token and user ID from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    // Redirect the user to the home page or login page
    navigate("/"); // Or you can navigate to "/login" if you have a login page
  };
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white text-gray-800 p-2.5 fixed w-full top-0 z-10 shadow-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">EcoConnect</h1>

          {/* Navigation and Dropdown Menu */}
          <Disclosure as="nav" className="bg-white">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon
                      aria-hidden="true"
                      className="block size-6 group-data-[open]:hidden"
                    />
                    <XMarkIcon
                      aria-hidden="true"
                      className="hidden size-6 group-data-[open]:block"
                    />
                  </DisclosureButton>
                </div>

                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex shrink-0 items-center"></div>

                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          aria-current={item.current ? "page" : undefined}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-600 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        <img
                          alt="User Profile"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          className="size-8 rounded-full"
                        />
                      </MenuButton>
                    </div>

                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5">
                      <MenuItem>
                        <a
                          href={`/user/profile/${userId}`}
                          className="block px-4 py-2 text-sm text-gray-700"
                        >
                          Your Profile
                        </a>
                      </MenuItem>
                      <MenuItem>
                        <a
                          href="/user/your-projects"
                          className="block px-4 py-2 text-sm text-gray-700"
                        >
                          Your Projects
                        </a>
                      </MenuItem>
                      <MenuItem>
                        <a
                          href="/leaderboard"
                          className="block px-4 py-2 text-sm text-gray-700"
                        >
                          Leaderboard
                        </a>
                      </MenuItem>
                      <MenuItem>
                        <a
                          href="#"
                          onClick={handleSignOut} 
                          className="block px-4 py-2 text-sm text-gray-700"
                        >
                          Sign out
                        </a>
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                </div>
              </div>
            </div>

            <DisclosurePanel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
            </DisclosurePanel>
          </Disclosure>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-16">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white w-full py-4 text-center mt-10">
        <p>&copy; 2024 EcoConnect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
