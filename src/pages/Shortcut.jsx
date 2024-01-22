import { useSelector } from "react-redux";
import { shortcutsInitialState } from "../redux/slice/initialUserDataSlice";
import LoadingState from "../containers/LoadingState";
import ShowErrorMsg from "../containers/GlobalErrorMsg";

const Shortcut = () => {
  const { isLoading, isError, errMsg, data } = useSelector(
    shortcutsInitialState
  );

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return <>{errMsg ? <ShowErrorMsg errMsg={errMsg} /> : <ShowErrorMsg />}</>;
  }

  console.log("Shortcut data", data);

  return <div>Shortcut</div>;
};

export default Shortcut;
