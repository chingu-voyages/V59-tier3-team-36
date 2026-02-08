import { FaHome, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const today = new Date();
  const dateString = today.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  });

  const linkStyle = ({ isActive }) =>
    `px-2 md:px-3 py-1 md:py-1.5 rounded-md transition-colors duration-200 font-semibold text-sm md:text-base mx-1 md:mx-0 ${
      isActive
        ? "bg-green-600 text-white"
        : "bg-white text-black hover:bg-green-100"
    }`;

  return (
    <nav className="bg-white  shadow-md">
      <div className="max-w-12xl mx-auto px-4">
        <div className="flex flex-col items-center md:flex-row md:justify-between md:items-center h-auto md:h-16 py-2 md:py-0">
          <div className="flex flex-col items-center">
            <div className="w-full text-center mx-auto px-2">
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-black text-center break-words max-w-xs sm:max-w-md md:max-w-full mx-auto">
              AI Interview Question Generator
            </div>
</div>
            <div className="text-xs text-black mt-1 md:mt-0 text-center">{dateString}</div>
          </div>

          {/* Always visible menu, responsive size */}
          <div className="flex space-x-2 md:space-x-6 mt-2 md:mt-0">
            <NavLink to="/" className={linkStyle}><FaHome className="inline mr-1 md:mr-2 -mt-1" />
              Home
            </NavLink>
            <NavLink to="/roles" className={linkStyle}><FaUser className="inline mr-1 md:mr-2 -mt-1" />
              Roles
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}