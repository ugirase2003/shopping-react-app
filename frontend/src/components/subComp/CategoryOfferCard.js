import React from "react";
import { useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router-dom";

const CategoryOfferCard = ({ item }) => {

  // category offer card for home screen 
  const [imgLoad, setImgLoad] = useState(false);

  return (
    <SkeletonTheme baseColor="white" highlightColor="#C8C6C5 ">
    <Link to={"/categorywise/" + item.category}>
      <div className="mx-auto sm:h-[400px] border-[16px] rounded-sm border-purple-100 h-[300px]  w-[80%] relative flex  hover:cursor-pointer ">
        {!imgLoad ? (
          <div className="h-full w-full absolute ">
            <Skeleton
              className="h-full absolute z-10"
              baseColor="white"
              highlightColor="#C8C6C5 "
            />
          </div>
        ) : null}
        <img
          src={item.img}
          className="object-fill h-full w-full  z-0 relative"
          onLoad={() => setImgLoad(true)}
        />
        <div className="absolute h-1/3 w-full bg-black/50 z-0 text-center  bottom-0 font-bold text-white text-lg md:text-2xl p-4">
          {" "}
          {item.category || (
            <Skeleton baseColor="#2E2E2E" highlightColor="white" />
          )}
          <p className="md:text-md text-red-600 font-serif">
            {" "}
            {item.offer || (
              <Skeleton baseColor="#2E2E2E" highlightColor="white" />
            )}
          </p>
          <p className="font-medium">Shop Now</p>
        </div>
      </div>
    </Link>
    </SkeletonTheme>
  );
};

export default CategoryOfferCard;
