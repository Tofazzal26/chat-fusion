"use client";

import axios from "axios";
import { ChevronDown, CirclePlus, Clock, Link, Mic, Send } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
export default function Home() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);

  const formatText = (text) => {
    if (!text) return null;

    const lines = text
      .trim()
      .split("\n")
      .filter((line) => line.trim() !== "");

    const result = [];

    lines.forEach((line, index) => {
      const match = line.match(/^\*\*(\d+)\.\*\*\s?"([^"]+)"/);

      if (match) {
        const title = match[2].trim();
        const content = line.replace(match[0], "").trim();

        result.push({
          title,
          content,
        });
      } else {
        result.push({
          title: line.trim(),
          content: null,
        });
      }
    });

    return result;
  };

  const handleSubmit = async () => {
    if (question.trim() === "") {
      return toast.error("Write someting");
    }
    setLoading(true);
    try {
      const resp = await axios.post(`http://localhost:3000/api/chat`, {
        question,
      });
      setQuestion("");

      const formatData = formatText(
        resp?.data?.data?.choices[0]?.message?.content
      );

      const userQuestion = JSON.parse(resp?.config?.data);
      console.log(userQuestion);

      setResponse((prev) => [
        ...prev,
        { question: userQuestion.question, answer: formatData },
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  console.log(response);

  return (
    <div className="grid grid-rows-4 h-screen">
      <div className={`row-span-1 ${response.length > 0 ? "hidden" : ""}`}>
        <div className="mt-4 lg:mt-6">
          <h2 className="text-xl lg:text-5xl text-center">
            Hello There!👋 What can I help with?
          </h2>
          <p className="text-base lg:text-[22px] mt-2 text-center text-gray-700">
            Your personal AI assistant is ready to help—ask me anything,
            anytime.
          </p>
        </div>
      </div>
      <div
        className={`lg:px-0 px-2  ${
          response.length > 0 ? "row-span-3" : "row-span-2"
        } w-full lg:w-[1300px] mx-auto overflow-y-scroll`}
      >
        <div className="">
          {response?.map((item, index) => (
            <div key={index}>
              <div className="text-right">
                <button className="text-right bg-[#f1eefa] rounded-md px-4 py-2 my-2">
                  {item?.question}
                </button>
              </div>
              <div>
                {item?.answer?.map((item, index) => (
                  <motion.h2
                    key={index}
                    className="my-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    {item?.title}
                  </motion.h2>
                ))}
              </div>
            </div>
          ))}
        </div>
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
              className={`border-[1px] border-gray-200 rounded-md px-12 py-3 outline-none w-full ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              placeholder="Ask a question..."
              rows={3}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
            <span className="text-gray-600 absolute left-4 top-4">
              <Link size={18} />
            </span>
            <span className="text-gray-600 absolute right-12 top-4">
              <Mic size={18} />
            </span>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`text-gray-600 absolute right-4 top-4 hover:text-[#6f23fd] cursor-pointer ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
