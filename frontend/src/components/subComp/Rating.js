import React from "react";

const Rating = ({ rating, ppl_quan }) => {
  // rating czrd ppl_quan is how many people have rated 
  return (
    <div className="border  w-fit mt-2 py-[3px] hover:border-black hover:cursor-pointer rounded-sm flex  p   px-2">
      <span className=" text-black text-sm font-bold pr-1">{rating}⭐</span>{" "}
      <span className=" text-sm  pl-1  text-center border-l-2 text-gray-500 ">
        {ppl_quan} Ratings
      </span>
    </div>
  );
};

export default Rating;
