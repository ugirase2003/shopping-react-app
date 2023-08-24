import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";

const Cart_Item = ({
  setSelectedItem,
  selectedItemsPar,
  renderBool,
  setRender,
  product,
  reFetch,
  emptyCart,
  size,
}) => {
  const userId = useContext(UserContext).user._id;

  //delete modal for cart ----
  // this modal will pop up whenever user want to remove an item from cart
  const Del = ({ item_id, setDel, del }) => {
    const [loader, setLoader] = useState(false);

    const removeItem = async (item_id) => {
      setLoader(true);
      console.log(item_id);
      try {
        console.log("heyy");
        await axios.delete(
          process.env.REACT_APP_BASE_URL+"/delete/" + item_id + "/" + userId
        );
        setLoader(false);

        let isExist;

        selectedItems.some((e, index) => {
          if (e._id === product._id) {
            selectedItems.splice(index, 1);
            setSelectedItem(selectedItems);
            isExist = true;
            setRender(!renderBool);
            return true;
          }
        });

        reFetch.setRefetch(!reFetch.refetch);
        if (size === 1) {
          console.log("reached");
          setSelectedItem([]);
          emptyCart.setEmptyCart(!emptyCart.emptyCart);
        }

        setDel(false);
      } catch (err) {
        setDel(false);
        console.log("Request Failed", err);
      }
    };

    return (
      <div
        className={`w-[90%] sm:max-w-[400px] shadow-lg p-4 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white z-30 flex justify-between flex-col  rounded-sm transition duration-300  ${
          del ? "visible opacity-100 scale-100" : "invisible opacity-0 scale-0"
        }`}
      >
        <div className="flex border-b-2 pb-2 ">
          <img
            src="https://m.media-amazon.com/images/I/61EJAApLYFL._UX569_.jpg"
            className="w-20 h-20"
          ></img>
          <div className="flex flex-col ">
            <span className=" text-[14px] mt-2 font-bold text-gray-800 ">
              Remove from Bag?
            </span>
            {!loader ? (
              <span className=" text-[13px] ">
                Are you sure you want to remove this item from bag?
              </span>
            ) : (
              <div className="flex  m-auto">
                <div
                  class="animate-spin inline-block w-5 h-5 border-[3px] border-current border-t-transparent text-purple-600 rounded-full mt-2 mr-3"
                  role="status"
                  aria-label="loading"
                ></div>
                <span class="text-xs mt-auto">Removing...</span>
              </div>
            )}
            <p></p>
          </div>
        </div>

        <div className="grid grid-cols-2 mt-2 w-fit m-auto">
          <button
            className="text-[12px]  px-4  rounded-sm font-bold text-gray-500"
            onClick={() => removeItem(item_id)}
          >
            REMOVE
          </button>
          <button
            className="font-bold text-md  px-4  rounded-sm  text-purple-600  border-l-2 text-[12px]"
            onClick={() => {
              setDel(false);
            }}
          >
            CANCEL
          </button>
        </div>
      </div>
    );
  };
  // ---------delete modal for cart end----------

  
  const [del, setDel] = useState(false);
  const selectedItems = selectedItemsPar;
  const selectItems = (product) => {
    let isExist;

    selectedItems.some((e, index) => {
      if (e._id === product._id) {

        selectedItems.splice(index, 1);
        setSelectedItem(selectedItems);
        isExist = true;
        setRender(!renderBool);
        return true;
      } else {
        isExist = false;
      }
    });

    if (!isExist) {
      console.log("not found");
      selectedItems.push(product);
      setSelectedItem(selectedItems);
      setRender(!renderBool);
    }
    console.log(selectedItemsPar);
  };

  return (
    <div className="  border p-2 border-gray-300 mt-4 relative ">
      <Del
        item_id={product._id}
        setDel={setDel}
        del={del}
        reFetch={reFetch}
        emptyCart={emptyCart}
        size={size}
      />
      {del ? (
        <div
          className="bg-black/80 fixed top-0  left-0 w-[100vw] h-[100vh] z-20"
          onClick={() => setDel(false)}
        ></div>
      ) : null}
      <div className="flex flex-row w-full  relative ">
        <input
          type="checkbox"
          className="absolute border rounded-sm hover:cursor-pointer border-gray-700 w-4 h-4  accent-purple-700  "
          onChange={() => {
            selectItems(product);
          }}
        ></input>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 absolute right-0 cursor-pointer hover:bg-gray-200 rounded-sm"
          onClick={() => setDel(true)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>

        <img
          src="https://m.media-amazon.com/images/I/61EJAApLYFL._UX569_.jpg "
          className="object-contain sm:w-[150px] h-[150px] bg-black w-[150px]  "
        />

        <div className="h-[150px]  ml-5 flex flex-col justify-between text-sm  ">
          <p>₹{product.o_price}</p>
          <p>{product.brand}</p>
          <p>{product.title}</p>
          <div className="flex flex-start font-bold ">
            <p>Qty :</p>
            <p className="bg-slate-100 flex  rounded-sm flex-row min-w-[100px] justify-between  mx-5">
              <p className="text-gray-400 px-3 cursor-pointer hover:bg-slate-300">
                +
              </p>
              <p>{product.quan}</p>
              <p className="text-gray-400 px-3 cursor-pointer hover:bg-slate-300">
                -
              </p>
            </p>
          </div>
          <p className="font-bold text-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-3 inline relative mr-1 bottom-[1px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
              />
            </svg>
            14 days <p className="font-thin inline-block">return available</p>
          </p>
          <p className="text-xs italic">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-4 inline-block mr-1 relative bottom-[1px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>
            EXPRESS Delivery
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart_Item;
