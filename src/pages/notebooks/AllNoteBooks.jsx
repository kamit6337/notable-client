import { Icons } from "../../assets/Icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userInitialState } from "../../redux/slice/initialUserDataSlice";
import { toggleCreateNewNotebook } from "../../redux/slice/toggleSlice";
import { useForm } from "react-hook-form";
import NotebookStack from "./NotebookStack";

const AllNoteBooks = () => {
  const dispatch = useDispatch();
  const { notebooks } = useSelector(userInitialState);
  const [showFullNotebooks, setShowFullNotebooks] = useState(true);
  const [searchedNotebook, setSearchNotebook] = useState([]);

  const { register } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const handleSearch = (e) => {
    const { value } = e.target;

    if (!value) {
      setShowFullNotebooks(true);
      setSearchNotebook([]);

      return;
    }

    const filter = notebooks.filter((notebook) =>
      notebook.title.toLowerCase().includes(value.toLowerCase())
    );

    setSearchNotebook(filter);
    setShowFullNotebooks(false);
  };

  return (
    <>
      <section className="w-full h-full flex flex-col px-6 py-10">
        {/* MARK: HEADER */}
        <header className="flex flex-col justify-between h-28 border-b border-gray-300 py-1">
          <div className="flex justify-between items-center">
            <p className="text-2xl  tracking-wide">Notebooks</p>
            <div className="border border-gray-400 rounded-lg flex items-center py-1 px-2">
              <input
                {...register("search")}
                type="text"
                onChange={handleSearch}
                placeholder="Find Notebook"
                className="rounded-lg"
              />
              <Icons.search className="text-xl" />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p>
              {showFullNotebooks ? notebooks.length : searchedNotebook.length}{" "}
              Notebooks
            </p>
            <div
              className="py-1 px-3 bg-green-400 rounded-md text-green-800 font-semibold cursor-pointer"
              onClick={() => dispatch(toggleCreateNewNotebook({ bool: true }))}
            >
              New Notebook
            </div>
          </div>
        </header>

        {/* MARK: CREATE NOTEBOOK LIST */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center bg-gray-100 text-gray-500">
            <p className="flex-1 py-2 px-4">Title</p>
            <p className="w-44 py-2 px-4">Created At</p>
            <p className="w-44 py-2 px-4">Updated At</p>
            <p className="w-40 py-2 px-4 text-end">Options</p>
          </div>

          {/* MARK: NOTESBOOKS WITH STACK */}
          <div className="text-slate-800">
            {showFullNotebooks ? (
              <NotebookStack notebooks={notebooks} />
            ) : (
              <NotebookStack notebooks={searchedNotebook} />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default AllNoteBooks;
