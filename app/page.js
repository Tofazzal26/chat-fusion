"use client";

import { ChevronDown, CirclePlus, Clock, Link, Mic, Send } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [question, setQueston] = useState("");

  const handleSubmit = (event) => {
    if (question.trim() === "") {
      return alert("Enter Value");
    }
    console.log(question, "value");
    setQueston("");
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="grid grid-rows-4">
      <div className="row-span-1">
        <div className="mt-4 lg:mt-10">
          <h2 className="text-xl lg:text-5xl text-center">
            Hello There!👋 What can I help with?
          </h2>
          <p className="text-base lg:text-[22px] mt-2 text-center text-gray-700">
            Your personal AI assistant is ready to help—ask me anything,
            anytime.
          </p>
        </div>
      </div>
      <div className="row-span-2 lg:row-span-2 lg:w-[1300px] mx-auto">
        <h2>Hello</h2>
      </div>
      <div className="row-span-1 w-full lg:w-[1300px] mx-auto">
        <div className="border-[1px] border-gray-200 rounded-xl p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-gray-600">
              <Image src="/logo.png" width={20} height={20} alt="logo" />
              <h2>ChatFusion</h2>
              <ChevronDown size={20} />
            </div>
            <div className="text-gray-600 flex items-center gap-2">
              <CirclePlus size={20} />
              <Clock size={20} />
            </div>
          </div>
          <div className="mt-3 relative">
            <textarea
              className="border-[1px] border-gray-200 rounded-md px-12 py-3 outline-none w-full"
              placeholder="Ask a question..."
              rows={4}
              value={question}
              onChange={(e) => setQueston(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <span className="text-gray-600 absolute left-4 top-4">
              <Link size={18} />
            </span>
            <span className="text-gray-600 absolute right-12 top-4">
              <Mic size={18} />
            </span>
            <button
              onClick={handleSubmit}
              className="text-gray-600 absolute right-4 top-4 cursor-pointer"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
