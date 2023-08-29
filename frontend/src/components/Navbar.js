import React, { useContext, useEffect, useState } from "react";
import MenuItem from "./subComp/MenuItem";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Cart_Context } from "./Context/CartSizeContext";
import { Link } from "react-router-dom";
import { UserContext } from "./Context/UserContext";
import axios from "axios";
import AccountInfo from "./subComp/AccountInfo";
import { animated, useTransition } from "@react-spring/web";

export const Navbar = () => {
  const [nav, setNav] = useState(false);

  

  useEffect(() => {
    getUserInfo();
  }, []);

  // transtion for opening settings or pro info
  const [proSetting, setProSetting] = useState(false);
  const transition = useTransition(proSetting, {
    from: { y: -100, opacity: 0 },
    enter: { y: -70, opacity: 1 },
    leave: { y: -100, opacity: 0 },
    config: { tension: 150, friction: 20 },
  });

  document.addEventListener("click", () => setProSetting(false));

  // transtion for after logging out
  const [loggedOut, setLoggedOut] = useState(false);
  const transitionl = useTransition(loggedOut, {
    from: { x: 100 },
    enter: { x: 0 },
    leave: { x: 150 },
    config: { tension: 130, friction: 20 },
  });

  const cart = useContext(Cart_Context);
  const userCon = useContext(UserContext);

  const getUserInfo = async () => {
    if (userCon.user === null) {
      //check local storage
      const savedUser = localStorage.getItem("user");
      if (savedUser != null) {
        let user = JSON.parse(savedUser);
        console.log(user);
        const res = await axios.get("/getUserData/" + user._id).catch((err) => {
          
        });

        if (res.status === 201) {
          userCon.setUser(res.data);
          cart.setCartSize(res.data.size);
        } else if (res.status === 401 || res.status === 403)
          console.log("Token has Expired");
        else if (res.status === 404 || res.status === 500)
          console.log("Internal Errro Occured", res.data);
        else console.log("Problem", res.status);
      }
    } else console.log(userCon.user);
  };

  if (nav === true) document.body.style.overflow = "hidden";
  else document.body.style.overflow = "visible";

  const menu = [
    {
      category: "Men",
      subCategory: ["Footwear", "Jeans", "Jackets", "Tshirt"],
    },
    {
      category: "Women",
      subCategory: [ "Jeans", "Jackets", "Shirts"],
    },
    { category: "Kids", subCategory: ["T-shirt", "Jeans", "Jackets"] },
  ];

  return (
    <>
      {/* Navbar */}

      <div className="max-w-[1600px] mx-auto px-5  shadow-md z-20 h-16 sticky top-0 w-full bg-white  ">
        {/* black screen overlay */}
        <div
          className={`${
            !nav ? "hidden" : "fixed"
          } bg-black/80 w-full h-screen z-10 top-0 left-0 md:hidden`}
          onClick={() => {
            setNav(!nav);
          }}
        ></div>

        {/* mobile nav */}

        <nav
          className={`min-w-[250px] h-screen bg-white z-30 md:hidden fixed top-0 left-0  ${
            nav ? "translate-x-0" : "-translate-x-full"
          }  duration-300`}
        >
          <h1 className="  font-bold font-serif text-purple-700 ml-6 mt-2 text-2xl">
            Shoppie
          </h1>
          <AiOutlineClose
            className="md:hidden cursor-pointer absolute right-0 top-4 mr-2 "
            size={25}
            onClick={() => setNav(!nav)}
          />

          <ul className="flex flex-col  h-full  justify-start     w-full px-3 mt-4 ">
            <Link
              to={"/"}
              className="px-1   flex flex-col  items-center justify-center  cursor-pointer border-b border-gray-300  relative h-16  mb-1"
              onClick={() => setNav(!nav)}
            >
              All Products
            </Link>
            {menu.map((item) => {
              return <MenuItem item={item} nav={{ nav, setNav }} />;
            })}
          </ul>
        </nav>

        {/* big screen nav */}
        <nav className={`flex justify-between items-center h-full`}>
          <h1 className=" md:text-4xl font-bold font-serif text-purple-700 ml-6 text-3xl">
            Shoppie
          </h1>
          <AiOutlineMenu
            className="md:hidden cursor-pointer absolute left-0 ml-2 "
            size={25}
            onClick={() => setNav(!nav)}
          />

          <ul className="  hidden md:flex h-full  ">
            <Link
              to={"/"}
              className="px-1   flex flex-col  items-center justify-center  cursor-pointer  hover:border-b-purple-600 border-b-white border-b-2 duration-100 relative h-16  mb-1"
            >
              All Products
            </Link>
            {menu.map((item) => {
              return <MenuItem item={item} />;
            })}
          </ul>
          {console.log("pro open", proSetting)}

          <div className="flex h-full items-center  ">
            {userCon.user != null ? (
              <Link className="text-sm mr-6  font-bold " to={"/"}>
                Hello , {userCon.user.name}
              </Link>
            ) : null}
            <Link className={`h-full flex items-center`}>
              <svg
                fill="none"
                stroke="black"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className=" w-6 mr-6 h-full  hover:cursor-pointer  "
                id="pro"
                onClick={(e) => {
                  /* eslint-disable */
                  event.stopPropagation();
                  setProSetting(true);
                }}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                ></path>
              </svg>
              {transition((style, item) =>
                item ? (
                  <animated.div style={style}>
                    <AccountInfo
                      loggedoutmsg={setLoggedOut}
                      setOpenthis={setProSetting}
                      userInfo={userCon.user}
                    />
                  </animated.div>
                ) : null
              )}
            </Link>

            <Link to={"/cart"}>
              <div className="relative hover:cursor-pointer">
                <span className="h-[18px] w-[18px] inline-flex justify-center items-center right-0 left-3 bottom-3 text-center rounded-full text-xs font-bold  bg-purple-300 text-white absolute ">
                  {cart.cartSize}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="black"
                  className="w-[24px] h-[24px] right-6  "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </div>
            </Link>
          </div>

          {transitionl((style, item) =>
            item ? (
              <animated.div
                style={style}
                className={
                  "p-3 bg-green-300 w-[150px] b h-11 text-white  right-0 text-sm font-bold text-center top-32 fixed rounded-l-full"
                }
              >
                <span>Logged Out</span>
              </animated.div>
            ) : null
          )}
        </nav>
      </div>
    </>
  );
};
