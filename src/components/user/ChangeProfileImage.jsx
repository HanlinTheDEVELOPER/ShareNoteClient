import { Box, Flex, IconButton, useToast } from "@chakra-ui/react";
import { IconCheck, IconPhotoUp, IconX } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import useLogout from "../../hooks/useLogout";
import useSetUser from "../../hooks/useSetUser";
import { changeProfileImage } from "../../lib/userApi";
import { queryClient } from "../../main";

const ChangeProfile = () => {
  const inputRef = useRef(null);
  const [inputFile, setInputFile] = useState(null);
  const [file, setFile] = useState(null);
  const [setUserFn] = useSetUser();
  const toast = useToast();
  const [logout] = useLogout();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["user"],
    mutationFn: (data) => changeProfileImage(data),
  });

  const onImageChange = () => {
    if (inputRef?.current?.files && inputRef?.current?.files[0]) {
      setInputFile(URL.createObjectURL(inputRef?.current?.files[0]));
      setFile(inputRef?.current?.files[0]);
    }
  };

  const onCancelChange = () => {
    setInputFile(null);
    setFile(null);
  };

  const onSaveImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      await mutateAsync(formData);
      setFile(null);
      setInputFile(null);
      queryClient.prefetchQuery({
        queryKey: ["user"],
        queryFn: setUserFn,
      });
      toast({
        description: "Update Profile Picture Success!",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      console.log(error.response.data.statusCode);
      if (
        error.response.data.statusCode === 401 ||
        error.response.data.statusCode === 403
      ) {
        logout();
      }
      toast({
        description: "Update Profile Picture Failed!",
        status: "error",
        isClosable: true,
      });
      setFile(null);
      setInputFile(null);
    }
  };

  return (
    <form
      className="absolute top-0 w-full h-full"
      onSubmit={onSaveImage}
      encType="multipart/form-data"
    >
      {inputFile ? (
        <Box className="absolute top-0 left-0 w-full h-full rounded-4  flex justify-center items-center">
          <img className="w-full h-full rounded-[12px]" src={inputFile} />
          <Flex gap={2} position="absolute">
            <IconButton
              icon={<IconCheck />}
              isLoading={isPending}
              onClick={onSaveImage}
              color="brand.900"
              type="submit"
            />
            <IconButton
              type="button"
              onClick={onCancelChange}
              color="brand.900"
              icon={<IconX />}
              isDisabled={isPending}
            />
          </Flex>
        </Box>
      ) : (
        <Box className=" absolute w-4 h-4 bottom-[0%] right-[0%] rounded-full flex justify-center items-center">
          <IconButton
            borderBlock="solid"
            borderWidth="1px"
            borderColor="brand.900"
            color="brand.900"
            icon={<IconPhotoUp />}
          />
          <input
            ref={(el) => (inputRef.current = el)}
            type="file"
            accept="image/*"
            name="profile_image_input"
            className="absolute h-full w-full z-10 top-0 opacity-0"
            onChange={onImageChange}
          />
        </Box>
      )}
    </form>
  );
};

export default ChangeProfile;
