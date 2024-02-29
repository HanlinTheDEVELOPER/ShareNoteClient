import { Input, Box } from "@chakra-ui/react";
import { Field } from "formik";
import StyledErrorMessage from "../common/StyledErrorMessage";
const UsernameInput = () => {
  return (
    <Box alignContent="center">
      <StyledErrorMessage name="name" />
      <Field
        as={Input}
        borderColor="brand.900"
        name="name"
        w={{ base: "100%", sm: "50%" }}
        placeholder="Enter  Username"
      />
    </Box>
  );
};

export default UsernameInput;
