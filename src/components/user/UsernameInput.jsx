/* eslint-disable react/prop-types */
import { Box, Input } from "@chakra-ui/react";

const UsernameInput = ({ name, setBody }) => {
  const onChange = (e) =>
    setBody((prev) => ({ ...prev, name: e.target.value }));

  return (
    <Box alignContent="center">
      <Input
        as={Input}
        borderColor="brand.900"
        name="name"
        value={name}
        onChange={onChange}
        w={{ base: "100%", sm: "50%" }}
        placeholder="Enter  Username"
      />
    </Box>
  );
};

export default UsernameInput;
