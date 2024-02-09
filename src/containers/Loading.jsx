/* eslint-disable react/prop-types */
const Loading = ({ hScreen = true, small = false }) => {
  return (
    <div
      className={`${
        hScreen ? "h-screen" : "h-full"
      } w-full  flex justify-center items-center`}
    >
      <div className={`${small ? "small_loading" : "loading"}`} />
    </div>
  );
};

export default Loading;
