import { Form, Formik } from "formik";
import { FormControl } from "@chakra-ui/react";
import * as Yup from "yup";
import StepperComponent from "../../components/user/Stepper";

const SetupAcc = () => {
  const initialState = {
    name: "",
    tags: [],
  };

  const userFormSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(25, "Name must be less than 25 characters"),
    tags: Yup.array().of(Yup.string()).length("Choose Three Interests"),
  });

  return (
    <Formik initialValues={initialState} validationSchema={userFormSchema}>
      <FormControl as={Form}>
        {/* <UsernameInput /> */}
        <StepperComponent />
      </FormControl>
    </Formik>
  );
};

export default SetupAcc;
