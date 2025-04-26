import { useDispatch } from "react-redux";
import { toggleSettingForm } from "../redux/slice/toggleSlice";
import { Icons } from "../assets/Icons";
import { useState } from "react";
import ChangePrimaryNotebook from "./ChangePrimaryNotebook";
import UserProfileUpdateForm from "./UserProfileUpdateForm";

const accountOptionsList = [
  {
    id: 1,
    title: "Change Primary Book",
    icon: <Icons.notebooks />,
  },
  {
    id: 2,
    title: "Profile",
    icon: <Icons.profile />,
  },
];

const SettingFormPage = () => {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(2);

  const handleClose = () => {
    dispatch(toggleSettingForm({ bool: false }));
  };

  return (
    <section className="backdrop-blur-sm absolute z-40 top-0 left-0 w-full h-screen flex justify-center items-center">
      <main className="setting_form rounded-md bg-white border-2 ">
        {/* MARK: HEADER */}
        <div className="h-16 flex justify-between items-center  px-8 text-xl">
          <p>Settings</p>
          <p className="cursor-pointer" onClick={handleClose}>
            <Icons.cancel />
          </p>
        </div>
        <div className="w-full h-[2px] p-0  bg-gray-200" />

        {/* MARK: BELOW HEADER */}
        <section className=" flex" style={{ height: "calc(100% - 66px)" }}>
          {/* MARK: SIDEBAR */}

          <div className="py-6 w-48 tablet:w-40">
            {accountOptionsList.map((obj, i) => {
              const { id, title, icon } = obj;

              return (
                <div
                  key={i}
                  className={`${
                    index === id && "bg-gray-200"
                  }  w-full px-6 tablet:px-2 text-sm hover:bg-gray-100 py-2 flex cursor-pointer  gap-2`}
                  onClick={() => setIndex(id)}
                >
                  <p className="text-xl">{icon}</p>
                  <p className="tablet:text-xs">{title}</p>
                </div>
              );
            })}
          </div>
          <div className="h-full w-[1px] bg-gray-200" />

          {/* MARK: SIDEBAR FORM */}

          <main className="flex-1 px-8 py-5">
            {index === 1 && <ChangePrimaryNotebook handleClose={handleClose} />}
            {index === 2 && <UserProfileUpdateForm handleClose={handleClose} />}
          </main>
        </section>
      </main>
    </section>
  );
};

export default SettingFormPage;
