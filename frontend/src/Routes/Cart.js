import React, { useContext, useEffect, useState } from "react";
import Cart_Item from "../components/subComp/Cart_Item";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAllCartProducts } from "../redux/actions/productAction";
import empty_cart from "../components/assets/img/empty_cart.jpg";
import { useTransition, animated } from "@react-spring/web";
import { Cart_Context } from "../components/Context/CartSizeContext";
import { UserContext } from "../components/Context/UserContext";
import {  useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const userCont = useContext(UserContext);
  const [emptyCart, setEmptyCart] = useState(false);
  const cart = useContext(Cart_Context);
  const transition = useTransition(emptyCart, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const [refetch, setRefetch] = useState(false);

  const products = useSelector((state) => state.setAllCartProduct.products);
  const dispatch = useDispatch();
  const fetchCart = async () => {
    const userId = userCont.user != null ? userCont.user._id : null;


    // fetching data corresponding to user id
    if (userId != null) {
      let res = await axios
        .get(process.env.REACT_APP_BASE_URL+"/user/cart/allItems/" + userId, {
          withCredentials: true,
        })
        .catch((err) => {
          console.log("error while fetching data", err);
        });

      if (res.status === 200) {
        console.log(res.data);
        if (res.data.length === 0) setEmptyCart(true);
        dispatch(setAllCartProducts(res.data));
      } else if (res.status === 401 || res.status === 403) {
        navigate("/login");
      } else if (res.status === 204) setEmptyCart(true);
      else console.log("Internal Server Error");
    } else navigate("/login");
  };

  useEffect(() => {
    if (userCont.user != null) {
      fetchCart();
    } else navigate("/login");
  }, [refetch]);

  cart.setCartSize(products.length);
  let final_price = 0;
  let total = 0;
  let discount = 0;
  let convenience = 0;
  const [showMore, setShowMore] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  selectedItems.map((p) => {
    total = total + p.o_price * p.quan;
    discount = discount + p.off_price * p.quan;
  });
  final_price = total - discount;
  final_price > 0 ? (convenience = 10) : (convenience = 0);

  const [rednerBool, setRender] = useState(false);

  console.log(selectedItems);
  return (
    <div className="  top-20 sm:max-w-[1000px]   overflow-hidden m-auto sm:grid SM:grid-cols-10">
      {/* grid item 1 */}
      <div className="col-start-1 col-end-7 p-2 ">
        {/* address section */}
        <div className="flex border text-sm justify-between border-gray-300 p-5">
          <div>
            <p>
              Deliver to:
              <p className="font-bold inline-block">Ujjwal Girase, 424002</p>
            </p>
            <p className="text-xs">
              23 Dynandeep Colony Near mohan complex , Valvadi Dhule{" "}
            </p>
          </div>
          <button className="p-2 font-bold text-xs text-purple-700 border hover:bg-purple-100 border-purple-700  ">
            CHANGE ADDRESS
          </button>
        </div>

{/* render the give cart list */}
        {products.length != 0
          ? products.map((product) => (
              <Cart_Item
                setSelectedItem={setSelectedItems}
                selectedItemsPar={selectedItems}
                renderBool={rednerBool}
                setRender={setRender}
                product={product}
                reFetch={{ refetch, setRefetch }}
                size={products.length}
                emptyCart={{ emptyCart, setEmptyCart }}
              />
            ))
          : null}

        {transition((style, item) =>
          item ? (
            <animated.div
              style={style}
              className="max-w-[400px] w-[90%] m-auto mt-2  "
            >
              <p className="text-center font-bold text-purple-800">
                Oops!! Your Cart is Empty
              </p>
              <img className="object-contain  duration-300" src={empty_cart} />
            </animated.div>
          ) : (
            ""
          )
        )}
      </div>
      {/* grid item 2 */}
      <div className=" col-start-7 col-end-10 p-2 duration-200 transition-all">
        {/* offer sec */}
        <div
          className={`text-sm  px-1 py-[9px] border-gray-300 border   ${
            !showMore ? "h-[78px] overflow-hidden" : "h-auto"
          }`}
        >
          <p className="font-bold">Available Offer</p>

          <p className="inline-block p-[2px]">
            5% Unlimted Cashback on Axis Bank Card.
          </p>

          {/*u can render multiple offers*/}
          {showMore ? (
            <p className="p-[2px]">10% Cashback on Sbi Card.</p>
          ) : null}

          <p
            className="text-purple-700 text-xs cursor-pointer font-bold "
            onClick={() => setShowMore(!showMore)}
          >
            {!showMore ? "Show More" : "Show Less"}{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 inline-block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </p>
        </div>

        {/* pricing details */}
        <div>
          <p className="text-xs flex justify-between mt-2 font-bold text-gray-700">
            PRICE DETAILS ({products.length} items)
          </p>

          <div className="text-xs flex justify-between mt-2 text-gray-700">
            <p>Total MRP</p>
            <p>₹{total}</p>
          </div>

          <div className="text-xs flex justify-between mt-2 text-gray-700">
            <p>Discount on MRP</p>
            <p className="text-green-500">-₹{discount}</p>
          </div>

          <div className="text-xs flex justify-between mt-2 text-gray-700">
            <p>Coupon Discount</p>
            <p className="text-purple-700">Apply Coupon</p>
          </div>

          <div className="text-xs flex justify-between mt-2 text-gray-700">
            <p>
              Convenience Fee{" "}
              <p className="inline-block font-bold text-purple-700 ml-1">
                Know More
              </p>
            </p>

            <div className="flex">
              {convenience === 0 ? null : (
                <p className="relative w-fit ">
                  <p className="bg-black h-[1px] w-full absolute top-2"></p>₹99
                </p>
              )}
              <p className="ml-2">₹{convenience}</p>
            </div>
          </div>

          <div className="text-sm font-bold flex justify-between mt-4 py-5 border-t   border-gray-300  text-gray-700">
            <p>Total Amount</p>
            <p>₹{final_price + convenience}</p>
          </div>
          <button className="bg-purple-700 hover:bg-purple-800 text-sm  p-3 text-white font-bold w-full">
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
