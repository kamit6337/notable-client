import { Icons } from "../assets/Icons";

const SideNotesBar = () => {
  return (
    <div className="w-60 bg-gray-50 h-full  flex flex-col">
      <div className="flex gap-1 items-center py-4  px-5">
        <Icons.notesSolid className="text-2xl" />
        <p className="text-xl">Notes</p>
      </div>
      <div className="px-6 text-sm text-gray-700">30 Notes</div>
      <div className="w-full h-[1px] my-4 bg-gray-500" />
    </div>
  );
};

export default SideNotesBar;
