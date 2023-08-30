import { useTransition, animated } from "@react-spring/web";
import React, { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { Link } from "react-router-dom";

const MenuItem = ({ item, nav }) => {
  const [openSub, setOpenSub] = useState(false);
  const transition = useTransition(openSub, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { tension: 0, friction: 0 },
  });
  return (
    // here we are rendring all the menu items for navbar
    <li
      className={`px-1 md:px-0  flex flex-col   cursor-pointer border-b border-gray-300 md:border-0  md:w-fit relative  mb-1 ${
        openSub ? "md:h-full" : "h-16"
      } `}
      onMouseLeave={() => setOpenSub(false)}
    >
      <span className="w-full  px-2 flex items-center">
        <p
          onMouseEnter={() => setOpenSub(true)}
          onClick={() => {
            setOpenSub(!openSub);
           
          }}
          className="h-16  justify-center flex items-center min-w-[100px]  md:hover:border-b-purple-600 md:border-b-white md:border-b-2 duration-100 w-full md:w-fit m-auto   px-3  "
       
        >
          {item.category}
        </p>
        {"subCategory" in item ? (
          <AiOutlineDown
            className={` top-2 md:hidden right-3 ${
              openSub ? "rotate-0" : "-rotate-90"
            } duration-75`}
            size={12}
          />
        ) : null}
      </span>
      {"subCategory" in item
        ? transition((style, show) =>
            show ? (
              <animated.ul
                style={style}
                className={`py-2  md:py-4 text-center       md:shadow-md  md:top-16 duration-200 ease-in min-w-[110px] bg-white  `}
              >
                {item.subCategory.map((element, index) => {
                  return (
                    <Link
                      to={"categorywise/" + `${item.category}/${element}`}
                      onClick={() => {
                        if (nav.nav != null) nav.setNav(!nav.nav);
                      }}
                    >
                      <li
                        className={` cursor-pointer p-2 hover:font-bold duration-150 `}
                        key={index}
                      >
                        {element}
                      </li>
                    </Link>
                  );
                })}
              </animated.ul>
            ) : null
          )
        : null}
    </li>
  );
};

export default MenuItem;
