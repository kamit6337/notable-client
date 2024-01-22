/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Icons } from "../../assets/Icons";

const SideIcon = ({ Icon, title, showDownArrow = false, link = null }) => {
  return (
    <Link to={link}>
      <div className="p-[6px] flex items-center gap-3 hover:bg-slate-600 rounded-2xl cursor-pointer">
        <div className="w-3">
          {showDownArrow && <Icons.downArrow className="text-xs" />}
        </div>
        <div className="flex items-center gap-[6px]">
          <div className="text-lg">{Icon}</div>
          <p className="text-sm">{title}</p>
        </div>
      </div>
    </Link>
  );
};

export default SideIcon;
