"use client";
import {
  FilePenLine,
  History,
  MessageCircleCode,
  MessageSquareMore,
  Package,
  ShieldCheck,
  Webhook,
} from "lucide-react";
import SidebarStyle from "./SidebarStyle/SidebarStyle.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="bg-[#f7f5ff] p-6 h-[93vh]">
      <div>
        <button className="border-[1px] w-full mt-6 text-center justify-center rounded-lg border-[#deccff] flex text-[#6f23fd] items-center cursor-pointer gap-2 py-2 text-base">
          <FilePenLine size={20} /> New Chat
        </button>
        <div>
          <h2 className="text-sm my-4 text-gray-800">Engagement</h2>
          <div>
            <Link href="/history">
              <button
                className={`flex items-center gap-2 w-full text-gray-800 px-3 py-3 rounded-md cursor-pointer ${SidebarStyle.buttonHover}`}
              >
                <History size={20} /> History
              </button>
            </Link>

            <Link href="/">
              <button
                className={`flex items-center gap-2 w-full text-gray-800 px-3 py-3 rounded-md cursor-pointer my-2 ${
                  SidebarStyle.buttonHover
                } ${pathname === "/" ? "bg-[#e9e0ff]" : ""}`}
              >
                <MessageCircleCode size={20} /> Chat
              </button>
            </Link>
            <Link href="/store">
              <button
                className={`flex items-center gap-2 w-full text-gray-800 px-3 py-3 rounded-md cursor-pointer ${
                  SidebarStyle.buttonHover
                } ${pathname === "/store" ? "bg-[#e9e0ff]" : ""}`}
              >
                <Package size={20} /> Store
              </button>
            </Link>
          </div>
        </div>
        <div>
          <h2 className="text-sm my-4 text-gray-800">Help & Support</h2>
          <div className="space-y-2">
            <button
              className={`flex items-center gap-2 w-full text-gray-800 px-3 py-3 rounded-md cursor-pointer ${SidebarStyle.buttonHover}`}
            >
              <MessageSquareMore size={20} /> Support
            </button>
            <button
              className={`flex items-center gap-2 w-full text-gray-800 px-3 py-3 rounded-md cursor-pointer ${SidebarStyle.buttonHover}`}
            >
              <ShieldCheck size={20} /> Subscriptions
            </button>
            <button
              className={`flex items-center gap-2 w-full text-gray-800 px-3 py-3 rounded-md cursor-pointer ${SidebarStyle.buttonHover}`}
            >
              <Webhook size={20} /> Api Platform
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
