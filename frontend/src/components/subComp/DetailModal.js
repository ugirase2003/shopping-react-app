import React from "react";


const DetailModal = ({ item }) => {
  console.log("clicked");
  document.body.style.overflow = "hidden";
  return (
    <div className="bg-black/70 w-full h-screen z-50 top-0 left-0 fixed">
      <div className="w-[400px]  bg-slate-200 h-[80vh] m-auto  relative top-[14vh] overflow-auto">
        <div className="h-[80%] w-full">
          <img src={item.img} className="w-full h-full   object-contain  " />
        </div>

        <div className="p-3">
          <p className="font-semibold">{item.brand}</p>
          <p className="text-gray-600 ">{item.name}</p>
          <div className="w-full flex justify-between pr-2 flex-col md:flex-row flex-wrap">
            <span className="font-bold">{item.price + " Rs."}</span>{" "}
            <span>{"Quantity: " + item.minQuan}</span>
            <p>{item.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
