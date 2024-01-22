import Cookies from "js-cookie";
import { getAuthFromBackend } from "../utils/api/authApi";
import { QueryCache, useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import UseInitialFetch from "../hooks/useInitialFetch";
import { postToBackend } from "../utils/api/userApi";

const SideNavbar = () => {
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["auth"],
    queryFn: () => getAuthFromBackend("/login/success"),
  });

  const [searchParams] = useSearchParams();
  const notebookId = searchParams.get("id");

  const { notebooks, notes } = UseInitialFetch();
  const queryCache = new QueryCache();

  const handleLogout = async () => {
    try {
      await getAuthFromBackend("/logout");
      Cookies.remove("_at", { secure: true, path: "/", sameSite: true }); // removed!
      queryCache.clear();
      window.location.reload();
    } catch (error) {
      console.log("Error in logout");
    }
  };

  const handleNoteCreation = async () => {
    let notebook;
    if (!notebookId) {
      notebook = notebooks?.data?.data?.find(
        (notebook) => notebook.primary === true
      );
    } else {
      notebook = notebooks?.data?.data?.find(
        (notebook) => notebook.id === notebookId
      );
    }

    try {
      await postToBackend("/notes", {
        id: notebook.id,
        name: notebook.title,
      });
      notes.refetch();
      navigate(`/notebook?id=${notebook.id}`);
    } catch (error) {
      console.log("Error in create note", error);
    }
  };

  return (
    <section className="text-sm bg-black/90 text-white/90 w-full h-full">
      <div className="flex p-2 justify-start gap-1 items-center">
        <div className="w-8 rounded-full">
          <img
            src={data?.photo}
            alt="profiel"
            loading="lazy"
            className="w-full rounded-full object-cover"
          />
        </div>
        <p>{data?.name?.split(" ")[0]}</p>
        <p className="cursor-pointer" onClick={handleLogout}>
          Logout
        </p>
        <p>Options</p>
      </div>
      <p className="p-2 px-4 m-3 rounded-2xl bg-slate-700 cursor-pointer">
        Search
      </p>
      <p
        className="p-2 px-4 m-3 rounded-2xl bg-green-700 cursor-pointer"
        onClick={handleNoteCreation}
      >
        Note
      </p>
      <div className="mt-6 px-5">
        <p className="p-2 cursor-pointer ">
          <Link to={`/`}>Home</Link>
        </p>
        <p className="p-2 cursor-pointer">Shortcuts</p>
      </div>

      <div className="mt-4 px-5">
        <p className="p-2 cursor-pointer">
          <Link to={`/notebooks`}>Notebooks</Link>
        </p>
        <p className="p-2 cursor-pointer">
          <Link to={`/notes`}>Notes</Link>
        </p>
        <p className="p-2 cursor-pointer">
          <Link to={`/tags`}>Tags</Link>
        </p>
      </div>
    </section>
  );
};

export default SideNavbar;
