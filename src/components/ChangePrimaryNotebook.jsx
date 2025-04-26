/* eslint-disable react/prop-types */
import { useMemo, useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { patchToBackend } from "../utils/api/userApi";
import Toastify from "../lib/Toastify";
import UseNotebooksQuery from "../hooks/query/UseNotebooksQuery";
import { useQueryClient } from "@tanstack/react-query";

const ChangePrimaryNotebook = ({ handleClose }) => {
  const queryClient = useQueryClient();
  const { data: notebooks } = UseNotebooksQuery();
  const [notebookId, setNotebookId] = useState(null);
  const { showErrorMessage } = Toastify();

  const filterNotebooks = useMemo(() => {
    const filter = notebooks.filter((notebook) => !notebook.primary);
    return filter;
  }, [notebooks]);

  const primaryNotebook = useMemo(() => {
    return notebooks.find((notebook) => notebook.primary);
  }, [notebooks]);

  const handleSelect = (e) => {
    const { value } = e.target;
    setNotebookId(value);
  };

  const handleChangePrimaryNotebook = async () => {
    try {
      await patchToBackend("/primary", {
        id: primaryNotebook._id,
        changedId: notebookId,
      });

      const checkStatus = queryClient.getQueryState(["notebooks"]);

      if (checkStatus.status === "success") {
        queryClient.setQueryData(["notebooks"], (prev = []) => {
          return prev.map((notebook) => {
            if (notebook._id === primaryNotebook._id) {
              return { ...notebook, primary: false };
            }

            if (notebook._id === notebookId) {
              return { ...notebook, primary: true };
            }

            return notebook;
          });
        });
      }

      handleClose();
    } catch (error) {
      showErrorMessage({ message: error.message || "Something went wrong" });
    }
  };

  return (
    <>
      <div>
        <div className="flex gap-2">
          <p>Current Primary Notebook : </p>
          <p className="font-semibold tracking-wide">{primaryNotebook.title}</p>
        </div>

        <div className="mt-10">
          <p className="mb-2 font-semibold tracking-wide">
            Change Primary Notebook
          </p>

          <FormControl fullWidth>
            <Select
              value={notebookId}
              onChange={handleSelect}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em>Select Notebook</em>
              </MenuItem>
              {filterNotebooks.map((notebook, i) => {
                const { _id, title } = notebook;

                return (
                  <MenuItem key={i} value={_id}>
                    {title}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div
          className="py-2 px-4 text-white w-max cursor-pointer rounded-sm mt-10 ml-auto bg-my_light_green_dark"
          onClick={handleChangePrimaryNotebook}
        >
          Change
        </div>
      </div>
    </>
  );
};

export default ChangePrimaryNotebook;
