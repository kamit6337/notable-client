import { useSelector } from "react-redux";
import { toggleState } from "../redux/slice/toggleSlice";
import CreateNewTag from "../components/CreateNewTag";
import DeleteForm from "../components/DeleteForm";
import NewNotebookForm from "../components/NewNotebookForm";
import SettingFormPage from "../components/SettingForm";
import SearchForm from "../components/SearchForm";

const GlobalForm = () => {
  const {
    createNewNotebook,
    createNewTag,
    deleteForm,
    settingForm,
    searchForm,
  } = useSelector(toggleState);

  if (searchForm.bool) {
    return <SearchForm />;
  }

  if (settingForm.bool) {
    return <SettingFormPage />;
  }

  if (createNewNotebook.bool) {
    return (
      <NewNotebookForm
        update={createNewNotebook.update}
        name={createNewNotebook.name}
        id={createNewNotebook.id}
      />
    );
  }

  if (createNewTag.bool) {
    return (
      <CreateNewTag
        update={createNewTag.update}
        name={createNewTag.name}
        id={createNewTag.id}
      />
    );
  }

  if (deleteForm.bool) {
    return <DeleteForm data={deleteForm.data} tag={deleteForm.tag} />;
  }
};

export default GlobalForm;
