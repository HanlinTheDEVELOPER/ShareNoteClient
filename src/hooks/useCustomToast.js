import { useToast } from "@chakra-ui/react";

export const useCustomToast = () => {
  const toast = useToast();
  const successToast = (msg) => {
    toast({
      title: msg,
      status: "success",
      duration: 1000,
    });
  };
  const errorToast = (msg) => {
    toast({
      title: msg,
      status: "error",
      duration: 1000,
    });
  };
  // i would forget index and which one come first so i use object which is ref by name
  return { successToast, errorToast };
};
