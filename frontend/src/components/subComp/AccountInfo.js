import React, { useContext,  } from "react";
import { AiOutlineEdit, AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { Cart_Context } from "../Context/CartSizeContext";


// user account info which will popup after clicking on profile icon
const AccountInfo = ({ userInfo, setOpenthis, loggedoutmsg }) => {

    const userCont = useContext(UserContext);
    const cartSize = useContext(Cart_Context);

    // logout function
    const logout = () => {
        userCont.setUser(null);
        localStorage.clear();
        cartSize.setCartSize(0);
    };

    return (
        <div className="fixed">
            {userInfo != null ? (
                <div className="flex flex-col text-xs min-h-[300px] border bg-white min-w-[200px]  shadow-sm right-1 fixed top-24 p-6 justify-around ">
                    <p className="font-bold text-sm border-b-2 border-gray-300 pb-2">
                        <span>Welcome , </span>
                        {userInfo.name}
                    </p>
                    <p className="flex  w-full ">
                        <AiOutlinePhone size={16} className="rotate-90 mr-2" />
                        {userInfo.phone}
                    </p>
                    <p className="flex  w-full ">
                        <AiOutlineMail size={16} className="mr-2" />
                        {userInfo.email}
                    </p>
                    <Link
                        className=" border-b  text-xs font-semibold  w-full mx-auto flex     text-purple-700 border-white hover:font-extrabold duration-75"
                        to={"/user/editProfile"}
                    >
                        <AiOutlineEdit size={16} className="mr-2" />
                        Edit Profile
                    </Link>
                    <Link
                        to={"/"}
                        className="bg-white border font-bold p-3 text-center w-full text-purple-600 border-white hover:border-purple-700 uppercase"
                        onClick={() => {
                            logout();
                            setOpenthis(false);
                            loggedoutmsg(true);
                            setInterval(() => loggedoutmsg(false), 5000);
                        }}
                    >
                        logout
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col text-xs min-h-[150px] border bg-white min-w-[200px]  shadow-sm right-1 fixed top-24 p-6 justify-around ">
                    <p className="font-bold  ">
                        <span>Welcome , </span>
                    </p>
                    <p className="flex  w-full border-b-2 border-gray-300 pb-2 text-gray-500 font-semibold">
                        To access or create Account
                    </p>

                    <Link
                        to={"/register"}
                        onClick={() => setOpenthis(false)}
                        className="bg-white border font-bold p-3 w-full text-purple-600 border-white hover:border-purple-700 uppercase"
                    >
                        register / login
                    </Link>
                </div>
            )}
        </div>
    );
};

export default AccountInfo;
