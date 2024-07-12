/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { PiUserCircle } from "react-icons/pi";

const Avatar = ({ userId, name, imageURL, width, height }) => {
  let avatarName = "";

  if (name) {
    const splitName = name?.split(" ");

    if (splitName.length > 1) {
      avatarName = splitName[0][0] + splitName[1][0];
    } else {
      avatarName = splitName[0][0];
    }
  }

  const bgColor = [
    "bg-teal-300",
    "bg-emerald-400",
    "bg-amber-300",
    "bg-orange-500",
    "bg-red-300",
    "bg-yellow-300",
    "bg-lime-400",
    "bg-green-400",
    "bg-cyan-400",
    "bg-sky-400",
    "bg-indigo-400",
  ];
  const randomNumber = Math.floor(Math.random() * bgColor.length);

  return (
    <div
      className={`text-slate-800 overflow-hidden rounded-full font-semibold`}
      style={{ width: width + "px", height: height + "px" }}
    >
      {imageURL ? (
        <img
          src={imageURL}
          width={width}
          height={height}
          alt={name}
          className="overflow-hidden rounded-full"
        />
      ) : name ? (
        <div
          style={{ width: width + "px", height: height + "px" }}
          className={`overflow-hidden rounded-full flex justify-center items-center ${bgColor[randomNumber]} text-lg`}
        >
          {avatarName}
        </div>
      ) : (
        <PiUserCircle size={width} />
      )}
    </div>
  );
};

export default Avatar;
