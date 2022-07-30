import { FC, Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setLanguage } from "../features/language/languageSlice";
const Navbar: FC = () => {
  const languageSelector = useAppSelector((selector) => selector.languageSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <nav className="h-20 flex items-center bg-gray-200 min-h-[80px]">
      <div className="container mx-auto p-3 flex items-center justify-between w-full">
        <Link className="text-xl font-medium" to="/">
          Rabbit FrontEnd Challenge
        </Link>
        <div className="flex space-x-4 items-center">
          <Link
            className="font-medium hover:underline underline-offset-2"
            to="/"
          >
            Home
          </Link>
          <Link
            className="font-medium hover:underline underline-offset-2"
            to="/about"
          >
            About
          </Link>
          <Listbox
            value={languageSelector.language}
            onChange={(value) => {
              dispatch(setLanguage(value));
              navigate(0);
            }}
          >
            <div className="relative z-50">
              <Listbox.Button className="relative w-24 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="block truncate">
                  {languageSelector.language.toUpperCase()}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <SelectorIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {["tr", "en"].map((language, languageId) => (
                    <Listbox.Option
                      key={languageId}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-amber-100 text-amber-900"
                            : "text-gray-900"
                        }`
                      }
                      value={language}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {language.toUpperCase()}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
