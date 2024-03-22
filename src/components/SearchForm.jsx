import { useForm } from "react-hook-form";
import { Icons } from "../assets/Icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userInitialState } from "../redux/slice/initialUserDataSlice";
import { Link } from "react-router-dom";
import { toggleSearchForm } from "../redux/slice/toggleSlice";

const SearchForm = () => {
  const dispatch = useDispatch();
  const { notebooks, notes } = useSelector(userInitialState);
  const [searchedList, setSearchedList] = useState([]);

  const { register, setFocus } = useForm({
    defaultValues: {
      search: "",
    },
  });

  useEffect(() => {
    setFocus("search");
  }, [setFocus]);

  const handleSearch = (e) => {
    const { value } = e.target;
    if (!value) {
      setSearchedList([]);
      return;
    }
    const combinedArray = [...notebooks, ...notes];
    const filter = combinedArray.filter((obj) =>
      obj.title.toLowerCase().includes(value.toLowerCase())
    );
    setSearchedList(filter);
  };

  const handleCancel = () => {
    dispatch(toggleSearchForm({ bool: false }));
  };

  return (
    <div className="absolute z-50 w-full h-screen top-0 left-0 backdrop-blur-sm">
      <div className="h-96 w-96 bg-white border-2 relative top-16 left-2 rounded-md">
        <div className="flex justify-between items-center px-5 h-14">
          <p>Search</p>
          <p className="cursor-pointer" onClick={handleCancel}>
            <Icons.cancel />
          </p>
        </div>
        <div className="w-full h-[2px] bg-gray-200" />
        <div className="px-3 rounded-md h-12 flex items-center">
          <input
            {...register("search")}
            type="text"
            onChange={handleSearch}
            placeholder="Search Notebooks or Notes"
            className="rounded-md w-full border py-1 px-3"
            spellCheck="false"
            autoComplete="off"
          />
        </div>

        <div className={`overflow-y-auto mt-2`} style={{ maxHeight: "250px" }}>
          {searchedList.length > 0 &&
            searchedList.map((obj, i) => {
              const { _id, title, notebook } = obj;

              if (!notebook) {
                return (
                  <Link key={i} to={`/notebooks/${_id}`} onClick={handleCancel}>
                    <div className="p-2 px-4 flex  gap-1 hover:bg-gray-100">
                      <p className="mt-[3px]">
                        <Icons.notebooks />
                      </p>
                      <p className="">{title}</p>
                    </div>
                  </Link>
                );
              }

              return (
                <Link key={i} to={`/notes/${_id}`} onClick={handleCancel}>
                  <div className="p-2 px-4 flex  gap-1  hover:bg-gray-100">
                    <p className="mt-[3px]">
                      <Icons.notesSolid />
                    </p>
                    <p>{title}</p>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
