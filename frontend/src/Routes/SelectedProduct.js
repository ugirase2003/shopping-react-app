import axios from "axios";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
    RemoveSelectedProducts,
    selectedProducts,
} from "../redux/actions/productAction";
import Rating from "../components/subComp/Rating";
import { useTransition, animated } from "@react-spring/web";
import { Cart_Context } from "../components/Context/CartSizeContext";
import { UserContext } from "../components/Context/UserContext";
import GoToTop from "../components/subComp/GoToTop";

const SelectedProduct = () => {
    // design for product which is clicked
    const userCon = useContext(UserContext);
    const cart_cont = useContext(Cart_Context);
    const [loader, setLoader] = useState(false);
    const [respMsg, setrespMsg] = useState(false);
    const [loginMsg, setloginMsg] = useState(false);
    const transition = useTransition(respMsg, {
        from: { y: -100, opacity: 0 },
        enter: { y: 0, opacity: 1 },
        leave: { y: -100, opacity: 0 },
        config: { tension: 150, friction: 20 },
    });

    const transition_l = useTransition(loginMsg, {
        from: { x: -150 },
        enter: { x: 0 },
        leave: { x: -200 },
        config: { tension: 130, friction: 20 },
    });

    const addToCart = async (cartItem) => {
        setLoader(true);
        if (userCon.user != null) {
            const userId = userCon.user._id;
            console.log("userId", userId);
            const res = await axios
                .post(process.env.REACT_APP_BASE_URL+"/insert/" + userId, {
                    ...cartItem,
                    quan: 1,
                })
                .catch((err) => console.log("Erro oop", err));
            if (res.status === 201) {
                cart_cont.setCartSize(res.data.size);
                setLoader(false);
                setrespMsg(true);
                setInterval(() => setrespMsg(false), 2000);
            } else if (res.status === 401 || res.status === 403) {
                console.log("Token invalid login again");
            } else {
                console.log("Something went wrong");
            }
        } else {
            setLoader(false);
            setloginMsg(true);
            setInterval(() => setloginMsg(false), 5000);
        }
    };

    const { productid } = useParams();

    const dispatch = useDispatch();

    const product = useSelector((state) => {
        return state.product;
    });
    const fetchProduct = async () => {
        const res = await axios
            .get(process.env.REACT_APP_BASE_URL+"/productView/" + productid)
            .catch((err) => {
                console.log("Erro", err);
            });
        dispatch(selectedProducts(res.data));
        console.log("fetching completed");
    };

    console.log(product);

    useEffect(() => {
        if (productid && productid !== "") {
            fetchProduct();
        }
        return () => {
            console.log("returned fun is called");
            dispatch(RemoveSelectedProducts());
        };
    }, [productid]);

    return (
        <div className="relative  p-5 w-full  md:grid  md:grid-cols-3  sm:flex-row items-center sm:items-start justify-around border-2 text-md flex flex-col">
            {transition_l((style, item) =>
                item ? (
                    <animated.div
                        className=" bg-purple-400 shadow-lg  w-[200px] p-5 text-white font-bold  flex justify-center items-center fixed mt-2 rounded-r-full top-40  left-0  z-50  "
                        style={style}
                    >
                        <Link to={"/login"} className="text-sm ml-2">
                            Click Here to Login
                        </Link>
                    </animated.div>
                ) : (
                    ""
                )
            )}

            {Object.keys(product).length === 0 ? (
                <div>Loading...</div>
            ) : (
                <>
                    <div className="col-span-2 grid lg:grid-cols-2 grid-cols-1  gap-4 ">
                        {product.img.map((e) => {
                            return (
                                <img
                                    src={e}
                                    className="object-contain p-2 max-h-[500px] m-auto   "
                                />
                            );
                        })}
                    </div>

                    <div className="p-5 w-full   shadow-md rounded-md min-h-[500px] flex flex-col justify-around ">
                        <div>
                            <p className="font-bold text-xl">{product.brand}</p>
                            <p className="font-thin text-lg text-gray-500 ">
                                {product.title}
                            </p>
                            <Rating ppl_quan={"1.2k"} rating={4.5} />

                            <div className="flex flex-row items-center mt-4 w-full border-t pt-2 ">
                                <p className="font-bold  text-lg">₹{product.off_price}</p>
                                <p className="font-thin  text-lg  ml-6  ">
                                    {" "}
                                    <strike>₹{product.o_price}</strike>{" "}
                                </p>
                            </div>
                            <p className="text-green-600 mt-2 font-bold font-sans">
                                inclusive all taxes
                            </p>

                            <div></div>

                            <div className="flex lg:flex-row flex-col">
                                <button
                                    class="bg-purple-400 flex-[2] lg:mr-4 max-w- hover:bg-purple-700 mt-3 w-full text-white font-bold py-2 px-4 rounded flex justify-center  "
                                    onClick={() => {
                                        const { category, subCat, product_detail, ...cartItem } =
                                            product;
                                        addToCart(cartItem);
                                    }}
                                >
                                    {!loader ? (
                                        <>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="white"
                                                className="w-6 h-6 mr-4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                                />
                                            </svg>
                                            Add to Bag
                                        </>
                                    ) : (
                                        <div className="flex w-full justify-center items-center">
                                            <div
                                                class="animate-spin inline-block w-5 h-5 border-[3px] border-current border-t-transparent text-white-600 rounded-full "
                                                role="status"
                                                aria-label="loading"
                                            ></div>
                                            <span class="text-xs ml-2">Adding...</span>
                                        </div>
                                    )}
                                </button>
                                <button class="border hover:border-black lg:ml-5 mt-3 w-full flex justify-center flex-[1] font-bold py-2 px-4 rounded text-black">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6 mr-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                        />
                                    </svg>
                                    Whishlist
                                </button>
                            </div>
                        </div>

                        {transition((style, item) =>
                            item ? (
                                <animated.div
                                    className=" shadow-lg  bg-white p-3 text-purple-400 font-bold  flex justify-center items-center fixed mt-2 rounded-md top-20  right-0 z-50"
                                    style={style}
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="1.5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        ></path>
                                    </svg>
                                    <span className="text-sm ml-2">Item Added</span>
                                </animated.div>
                            ) : (
                                ""
                            )
                        )}

                        <div>
                            <p className="font-bold mt-2 text-sm">PRODUCT DETAILS</p>
                            <p className="mt-2 text-gray-500 text-sm">
                                {product.product_detail.desc}
                            </p>
                            <p className="font-bold mt-2 text-sm ">Material</p>
                            <p className="text-gray-500 mt-2 text-sm">
                                {product.product_detail.material}
                            </p>
                            <p className="font-bold mt-2 text-sm">Specification</p>
                            <div className="grid grid-cols-2 gap-2  ">
                                <div>
                                    <p className="text-gray-500 text-sm mt-3 ">Sleeves</p>
                                    <p className="border-b-2 border-b-gray-200 ">
                                        {product.product_detail.spec.sleeves}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm mt-3 ">Fit</p>
                                    <p className=" border-b-2 border-b-gray-200 ">
                                        {product.product_detail.spec.fit}Regular
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm mt-3 ">Neck</p>
                                    <p className="border-b-2 border-b-gray-200">
                                        {product.product_detail.spec.neck}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm mt-3 ">Type</p>
                                    <p className="border-b-2border-b-gray-200">
                                        {product.product_detail.spec.type}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm mt-3 ">Length</p>
                                    <p className="border-b-2 border-b-gray-200 ">
                                        {" "}
                                        {product.product_detail.spec.length}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            {" "}
                            <p className="mt-5">{product.description} </p>
                        </div>
                    </div>
                </>
            )}
            <GoToTop/>
        </div>
    );
};

export default SelectedProduct;
