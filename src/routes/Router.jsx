import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Notes from "../pages/AllNotes";
import CheckLogin from "../pages/CheckLogin";
import Notebooks from "../pages/AllNoteBooks";
import SingleNotebook from "../pages/SingleNotebook";
import Tags from "../pages/AllTags";
import ShowError from "../pages/ShowError";
import TagNotes from "../pages/TagNotes";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />

        {/* NOTE: NOTEBOOK RELATED ROUTES */}
        <Route path="notebooks" element={<Notebooks />} />
        <Route path="notebook" element={<SingleNotebook />} />

        {/* NOTE: NOTES RELATED ROUTES */}
        <Route path="notes" element={<Notes />} />

        {/* NOTE: TAGS RELATED ROUTES */}
        <Route path="tags" element={<Tags />} />
        <Route path="tag" element={<TagNotes />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/login/check" element={<CheckLogin />} />
      <Route path="/error" element={<ShowError />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
