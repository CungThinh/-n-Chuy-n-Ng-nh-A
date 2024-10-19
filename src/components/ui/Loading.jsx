import { ClipLoader } from 'react-spinners';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <ClipLoader color="#f97316" size={50} />
    </div>
  );
};

export default LoadingSpinner;