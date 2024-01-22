/* eslint-disable react/prop-types */
const LoadingState = ({ heightScreen = true }) => {
  return (
    <div
      className="w-full flex justify-center items-center"
      style={{ height: `${heightScreen ? "100vh" : "100%"}` }}
    >
      <div className="loading" />
    </div>
  );
};

export default LoadingState;
