import React from "react";
import "../../App.css";

const Operation_Modal = ({ status, setStatus }) => {
  return (
    <div className={` flex items-center justify-center  `}>
      <div
        className={`${
          status.status === 200 ? "bg-green-400 " : "bg-red-400 "
        }w-full  p-6 shadow-lg flex relative  items-center justify-center`}
      >
        <div
          className={`${
            status.status === 200 ? "text-green-400 " : "text-red-400 "
          }  bg-white  rounded-full h-6 w-6 flex items-center justify-center  `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={`${
                status.status === 200 ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12"
              }`}
            ></path>
          </svg>
        </div>
        <div>
          
          <p className="text-white ml-4 font-bold text-sm">
            {status.status === 200
              ? "Profile Has been Updated!!"
              : "Authentication Failed with  " +
                status.status +
                " Wrong Password or Login Again"}{" "}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1 shadow-md  ">
          <div className="h-full bg-white animate-loader "></div>
        </div>
      </div>
    </div>
  );
};

export default Operation_Modal;
