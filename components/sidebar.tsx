import { Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
  return (
    <aside className="shadow-md bg-primary text-white w-full h-full">
      <div className="p-4">
        <div className="flex items-center space-x-2">
          <Image
            src="/icon.png"
            alt="TailAdmin Logo"
            width={32}
            height={32}
            className="rounded-full invert"
          />
          <h1 className="text-xl font-bold">SD MVP</h1>
        </div>
      </div>
      <nav className="mt-10">
        <ul>
          <li>
            <Link
              href="/calendar"
              className="flex items-center space-x-3 p-3 hover:bg-gray-700 hover:shadow-md rounded-lg transition-colors duration-200 ml-3 mr-3"
            >
              <Calendar className="w-5 h-5" />
              <span>Calendar</span>
            </Link>
          </li>
          <li>
            <Link
              href="/calendar"
              className="flex items-center space-x-3 p-3 hover:bg-gray-700 hover:shadow-md rounded-lg transition-colors duration-200 ml-3 mr-3"
            >
              <Calendar className="w-5 h-5" />
              <span>Calendar</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
