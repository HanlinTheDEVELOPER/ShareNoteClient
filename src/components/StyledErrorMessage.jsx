/* eslint-disable react/prop-types */
import { ErrorMessage } from "formik";
const StyledErrorMessage = ({ name }) => {
  return (
    <div className="text-red-500 text-sm">
      <ErrorMessage name={name} />
    </div>
  );
};

export default StyledErrorMessage;
