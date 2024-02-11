import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import NotFound from "../pages/NotFound";
import Notes from "../pages/notes/AllNotes";
import CheckLogin from "../pages/auth/CheckLogin";
import Notebooks from "../pages/notebooks/AllNoteBooks";
import SingleNotebook from "../pages/notebookNotes/SingleNotebook";
import ShowError from "../pages/auth/ShowError";
import ForgotPasswordPage from "../pages/auth/ForgotPassword";
import TagNotes from "../pages/tagNotes/TagNotes";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />

        {/* NOTE: NOTEBOOK RELATED ROUTES */}
        <Route path="notebooks" element={<Notebooks />} />
        <Route path="notebooks/:id" element={<SingleNotebook />} />

        {/* NOTE: NOTES RELATED ROUTES */}
        <Route path="notes" element={<Notes />} />

        {/* NOTE: TAGS RELATED ROUTES */}
        <Route path="tags/:id" element={<TagNotes />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
      <Route path="/login/check" element={<CheckLogin />} />
      <Route path="/error" element={<ShowError />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
