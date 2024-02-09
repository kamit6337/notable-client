import { Icons } from "../../assets/Icons";
import changeDate from "../../utils/javaScript/changeDate";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userInitialState } from "../../redux/slice/initialUserDataSlice";
import {
  toggleCreateNewNotebook,
  toggleDeleteForm,
} from "../../redux/slice/toggleSlice";

const AllNoteBooks = () => {
  const dispatch = useDispatch();
  const { notebooks } = useSelector(userInitialState);
  const [index, setIndex] = useState(null);

  return (
    <>
      <section className="w-full h-full flex flex-col px-6 py-10">
        {/* MARK: HEADER */}
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
            <p>{notebooks.length} Notebooks</p>
            <div
              className="py-1 px-3 bg-green-400 rounded-xl text-green-800 font-semibold cursor-pointer"
              onClick={() => dispatch(toggleCreateNewNotebook({ bool: true }))}
            >
              New Notebook
            </div>
          </div>
        </header>

        {/* MARK: CREATE NOTEBOOK LIST */}
        <div className="flex flex-col px-4">
          <div className="flex justify-between items-center">
            <p className="flex-1 py-2 font-semibold tracking-wide">Title</p>
            <p className="w-44 py-2 font-semibold tracking-wide">Created At</p>
            <p className="w-44 py-2 font-semibold tracking-wide">Updated At</p>
            <p className="w-40 py-2 font-semibold tracking-wide text-end">
              Options
            </p>
          </div>

          {/* MARK: NOTESBOOKS WITH STACK */}
          <div>
            {notebooks.length > 0 ? (
              notebooks.map((notebook, i) => {
                const { _id, title, createdAt, updatedAt, primary } = notebook;

                return (
                  <div key={i}>
                    <div className="flex justify-between items-center">
                      <div className="flex-1 flex items-center">
                        {/* <Icons.rightArrow className="text-lg" /> */}
                        <p className=" py-1 cursor-pointer">
                          <Link to={`/notebooks/${_id}`}>{title}</Link>
                        </p>
                      </div>
                      <p className="w-44 py-1 text-sm">
                        {changeDate(createdAt, true)}
                      </p>
                      <p className="w-44 py-1 text-sm">
                        {changeDate(updatedAt, true)}
                      </p>
                      <div
                        className="w-40 py-1 flex justify-end items-center relative h-full"
                        onMouseLeave={() => setIndex(null)}
                      >
                        <p
                          className="h-full  cursor-pointer"
                          onMouseEnter={() => setIndex(i)}
                        >
                          <Icons.options />
                        </p>
                        {index === i && (
                          <div className="absolute z-10 top-full  right-0 border bg-gray-50 whitespace-nowrap rounded-lg">
                            {!primary && (
                              <p
                                className="border-b p-3 cursor-pointer hover:bg-gray-200 hover:rounded-t-lg"
                                // onClick={() => deleteNotebook(_id)}
                                onClick={() => {
                                  dispatch(
                                    toggleDeleteForm({
                                      bool: true,
                                      data: { _id, title },
                                    })
                                  );
                                }}
                              >
                                Delete Notebook
                              </p>
                            )}

                            <p
                              className="p-3 cursor-pointer hover:bg-gray-200 hover:rounded-b-lg"
                              onClick={() =>
                                dispatch(
                                  toggleCreateNewNotebook({
                                    bool: true,
                                    update: true,
                                    name: title,
                                    id: _id,
                                  })
                                )
                              }
                            >
                              Update Notebook
                            </p>
                          </div>
                        )}
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

          {/* MARK: NOTESBOOKS WITHOUT STACK */}
          {/* <div>
            <NotebookList list={data?.notebooks} />
          </div> */}
        </div>
      </section>
    </>
  );
};

export default AllNoteBooks;
