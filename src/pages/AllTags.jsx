import { useSelector } from "react-redux";
import { tagsInitialState } from "../redux/slice/initialUserDataSlice";
import LoadingState from "../containers/LoadingState";
import ShowErrorMsg from "../containers/GlobalErrorMsg";

const AllTags = () => {
  const { isLoading, isError, errMsg, data } = useSelector(tagsInitialState);

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return <>{errMsg ? <ShowErrorMsg errMsg={errMsg} /> : <ShowErrorMsg />}</>;
  }

  console.log("tags data", data);

  return <div>AllTags</div>;
};

export default AllTags;
