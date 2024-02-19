import { useDispatch } from "react-redux";
import { toggleSettingForm } from "../redux/slice/toggleSlice";
import { Icons } from "../assets/Icons";
import { useState } from "react";
import ProfileUpdateFOrm from "./ProfileUpdateFOrm";
import ChangePrimaryNotebook from "./ChangePrimaryNotebook";

const accountOptionsList = [
  {
    id: 2,
    title: "Change Primary Book",
    icon: <Icons.notebooks />,
  },
  {
    id: 1,
    title: "Profile",
    icon: <Icons.profile />,
  },
];

const SettingFormPage = () => {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(1);

  const handleClose = () => {
    dispatch(toggleSettingForm({ bool: false }));
  };

  return (
    <section className="backdrop-blur-sm absolute z-40 top-0 left-0 w-full h-screen flex justify-center items-center">
      <main className="w-[800px] h-[450px] rounded-md bg-white border-2 ">
        <div className="h-16 flex justify-between items-center  px-8 text-xl">
          <p>Settings</p>
          <p className="cursor-pointer" onClick={handleClose}>
            <Icons.cancel />
          </p>
        </div>
        <div className="w-full h-[2px] p-0  bg-gray-200" />
        <section className=" flex" style={{ height: "calc(100% - 66px)" }}>
          <div className="py-6 w-48">
            {accountOptionsList.map((obj, i) => {
              const { id, title, icon } = obj;

              return (
                <div
                  key={i}
                  className={`${
                    index === id && "bg-gray-200"
                  }  w-full px-6 text-sm hover:bg-gray-100 py-2 flex cursor-pointer  gap-2`}
                  onClick={() => setIndex(id)}
                >
                  <p className="text-xl">{icon}</p>
                  <p>{title}</p>
                </div>
              );
            })}
          </div>
          <div className="h-full w-[1px] bg-gray-200" />
          <main className="flex-1 p-8 overflow-y-scroll">
            {index === 1 && <ProfileUpdateFOrm handleClose={handleClose} />}
            {index === 2 && <ChangePrimaryNotebook handleClose={handleClose} />}
          </main>
        </section>
      </main>
    </section>
  );
};

export default SettingFormPage;
