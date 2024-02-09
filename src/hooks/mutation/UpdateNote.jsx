import { useMutation } from "@tanstack/react-query";
import { patchToBackend } from "../../utils/api/userApi";

const UpdateNote = (id) => {
  const mutation = useMutation({
    mutationKey: ["note", id],
    mutationFn: (body) => patchToBackend("/notes", { ...body }),
  });

  return mutation;
};

export default UpdateNote;
