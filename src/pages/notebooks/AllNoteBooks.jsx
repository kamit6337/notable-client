import { Icons } from "../../assets/Icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userInitialState } from "../../redux/slice/initialUserDataSlice";
import { toggleCreateNewNotebook } from "../../redux/slice/toggleSlice";
import { useForm } from "react-hook-form";
import NotebookStack from "./NotebookStack";
import { Helmet } from "react-helmet";

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
      <Helmet>
        <title>Notebooks</title>
        <meta name="discription" content="All Notebooks related to user" />
      </Helmet>
      <section className="w-full h-full flex flex-col px-6 tablet:px-2">
        {/* MARK: HEADER */}
        <header className="flex flex-col justify-between h-40 tablet:h-32 pt-10 tablet:p-4 pb-4 border-b border-gray-300 ">
          <div className="flex justify-between items-center">
            <p className="text-2xl  tracking-wide">Notebooks</p>
            <div className="border border-gray-400 rounded-lg flex items-center py-1 px-2">
              <input
                {...register("search")}
                type="text"
                onChange={handleSearch}
                placeholder="Find Notebook"
                className="rounded-lg"
                autoComplete="off"
                spellCheck="false"
                autoCorrect="off"
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
        <div className="flex justify-between items-center bg-gray-100 text-gray-500 h-10 tablet:text-sm">
          <p className="flex-1 py-2 px-4">Title</p>
          <p className="all_notebooks_list">Created At</p>
          <p className="all_notebooks_list">Updated At</p>
          <p className="all_notebooks_list text-end">Options</p>
        </div>

        {/* MARK: NOTESBOOKS WITH STACK */}
        {showFullNotebooks ? (
          <div
            className="overflow-y-auto text-slate-800"
            style={{ height: "calc(100% - 250px)" }}
          >
            <NotebookStack notebooks={notebooks} />
          </div>
        ) : (
          <div
            className="overflow-y-auto text-slate-800"
            style={{ height: "calc(100% - 250px)" }}
          >
            <NotebookStack notebooks={searchedNotebook} />
          </div>
        )}
      </section>
    </>
  );
};

export default AllNoteBooks;
