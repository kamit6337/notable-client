/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import {
  changeThePrimaryNotebook,
  userInitialState,
} from "../redux/slice/initialUserDataSlice";
import { useMemo, useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { patchToBackend } from "../utils/api/userApi";
import Toastify from "../lib/Toastify";

const ChangePrimaryNotebook = ({ handleClose }) => {
  const dispatch = useDispatch();
  const { primaryNotebook, notebooks } = useSelector(userInitialState);
  const [value, setvalue] = useState("");
  const { ToastContainer, showErrorMessage } = Toastify();

  const filterNotebooks = useMemo(() => {
    const filter = notebooks.filter(
      (notebook) => notebook._id !== primaryNotebook._id
    );
    return filter;
  }, [primaryNotebook, notebooks]);

  const handleSelect = (e) => {
    const { value } = e.target;
    setvalue(value);
  };

  const handleChangePrimaryNotebook = async () => {
    try {
      const patch = await patchToBackend("/primary", {
        id: primaryNotebook._id,
        changedId: value,
      });

      console.log("patch", patch);

      handleClose();

      dispatch(
        changeThePrimaryNotebook({
          id: primaryNotebook._id,
          changedId: value,
        })
      );
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
              value={value}
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
      <ToastContainer />
    </>
  );
};

export default ChangePrimaryNotebook;
