"use client";
import { Code, Headphones, Image, Link, Plus, X, Youtube } from "lucide-react";
import React, { useState } from "react";

const WritePostPage = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="w-full h-170 flex  bg-white">
     <div className="flex mt-15 ml-50 ">
        <div
          className={
            open ? "rounded-full ml-10 bg-neutral-200 size-10 border hover:text-neutral-800 cursor-pointer border-neutral-700 flex items-center justify-center"
              : "rounded-full ml-10   size-10 border hover:text-neutral-800 cursor-pointer border-neutral-700 flex items-center justify-center"
          }
        >
          {open ? (
            <X
              className="text-neutral-600  hover:text-neutral-800 size-8 font-light transition-transform duration-200 ease-in-out"
              onClick={() => setOpen(false)}
            />
          ) : (
            <Plus
              className="text-neutral-600  hover:text-neutral-800 size-8 font-light transition-transform duration-200 ease-in-out"
              onClick={() => setOpen(true)}
            />
          )}
        </div>

        {/* Expandable Tool Menu */}
        <div
          className={`flex flex-col mt-12 -ml-10 transition-all duration-300 ease-in-out ${open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
        >
          <div
            className="rounded-full hover:border-green-800 hover:border-2 mb-2 size-10 cursor-pointer border-green-700 border px-2 py-2"
            title="Add an Image"
          >
            <Image className="text-green-600 font-extralight size-5 mt-px ml-px" />
          </div>

          <div
            className="rounded-full hover:border-green-800 hover:border-2 mb-2 size-10 cursor-pointer border-green-700 border px-2 py-2"
            title="Add a Video"
          >
            <Youtube className="text-green-600 font-light size-6" />
          </div>

          <div
            className="rounded-full hover:border-green-800 hover:border-2 mb-2 size-10 cursor-pointer border-green-700 border px-2 py-2"
            title="Add a Code Block"
          >
            <Code className="text-green-600 font-extralight size-5 mt-px ml-px" />
          </div>

          <div
            className="rounded-full hover:border-green-800 hover:border-2 mb-2 size-10 cursor-pointer border-green-700 border px-2 py-2"
            title="Add Audio"
          >
            <Headphones className="text-green-600 font-extralight size-5 mt-px ml-px" />
          </div>
        </div>
      </div>

      
      {/* Title Input */}
      <div className="justify-start items-start  mt-12 ml-5 flex w-250 bg-neutral-50 rounded-md">
        <input
          type="text"
          placeholder="Title"
          className="text-black text-3xl w-full outline-none ml-3"
        />
      </div>




      {/* Floating Add Button */}
     
    </div>
  );
};

export default WritePostPage;
