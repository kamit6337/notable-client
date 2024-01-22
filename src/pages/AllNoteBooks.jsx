import { Icons } from "../assets/Icons";

import changeDate from "../utils/javaScript/changeDate";
import UseInitialFetch from "../hooks/useInitialFetch";
import { useState } from "react";
import NewNotebookForm from "../components/NewNotebookForm";
import { useNavigate } from "react-router-dom";

const AllNoteBooks = () => {
  const [toggleNewNotebook, setNewNotebookName] = useState(false);
  const navigate = useNavigate();

  const {
    notebooks: { data, refetch },
  } = UseInitialFetch();

  const handleNewNotebook = (bool) => {
    setNewNotebookName(bool);
  };

  const refetchNotebooks = () => {
    refetch();
  };

  return (
    <>
      <section className="w-full h-full flex flex-col px-6 py-10">
        {/* WORK: HEADER */}
        <header className="flex flex-col justify-between h-28 border-b border-gray-300 py-1">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-semibold tracking-wide">Notebooks</p>
            <div className="border border-gray-400 rounded-lg flex items-center py-1 px-2">
              <input
                type="text"
                placeholder="Find Notebook"
                className="rounded-lg"
              />
              <Icons.search className="text-xl" />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p>{data?.data?.length} Notebooks</p>
            <div
              className="py-1 px-3 bg-green-400 rounded-xl text-green-800 font-semibold cursor-pointer"
              onClick={() => setNewNotebookName(true)}
            >
              New Notebook
            </div>
          </div>
        </header>

        {/* WORK: CREATE NOTEBOOK LIST */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center bg-gray-100 ">
            <p className="flex-1">Title</p>
            <p className="w-44">Created At</p>
            <p className="w-44">Updated At</p>
            <p className="w-40 text-end">Options</p>
          </div>

          {/* WORK: NOTESBOOKS WITH STACK */}
          <div>
            {data?.data?.length > 0 ? (
              data.data.map((notebook, i) => {
                const {
                  id,
                  stackId,
                  stackTitle,
                  title,
                  createdAt,
                  updatedAt,
                  primary,
                  shortcut,
                } = notebook;

                return (
                  <div key={i}>
                    <div className="flex justify-between items-center bg-gray-100">
                      <div
                        className="flex-1 flex items-center"
                        onClick={() => navigate(`/notebook?id=${id}`)}
                      >
                        <Icons.rightArrow className="text-lg" />
                        <p className="">{title}</p>
                      </div>
                      <p className="w-44">{changeDate(createdAt, true)}</p>
                      <p className="w-44">{changeDate(updatedAt, true)}</p>
                      <div className="w-40 flex justify-end items-center relative h-full">
                        <Icons.options />
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>
                <p>No notebook available</p>
              </div>
            )}
          </div>

          {/* WORK: NOTESBOOKS WITHOUT STACK */}
          {/* <div>
            <NotebookList list={data?.notebooks} />
          </div> */}
        </div>
      </section>

      {/* WORK: FORM TO CREATE NEW NOTEBOOK */}
      <NewNotebookForm
        toggleNewNotebook={toggleNewNotebook}
        setToggle={handleNewNotebook}
        refetchNotebooks={refetchNotebooks}
      />
    </>
  );
};

export default AllNoteBooks;
