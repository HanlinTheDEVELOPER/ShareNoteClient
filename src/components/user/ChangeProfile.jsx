import { IconCheck, IconPhotoUp, IconX } from "@tabler/icons-react";
import { Button, IconButton, Box, Flex } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { changeProfileImage } from "../../lib/userApi";
import { queryClient } from "../../main";
import { useUserStore } from "../../store/userStore";

const ChangeProfile = () => {
  const inputRef = useRef(null);
  const [inputFile, setInputFile] = useState(null);
  const [file, setFile] = useState(null);
  const setUser = useUserStore((state) => state.setUser);

  const { mutateAsync, isError, isPending, isSuccess } = useMutation({
    mutationKey: ["user"],
    mutationFn: (data) => changeProfileImage(data),
  });
  console.log(isError, isPending, isSuccess);

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
        queryFn: setUser,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="" onSubmit={onSaveImage} encType="multipart/form-data">
      {inputFile ? (
        <Box className="absolute top-0 left-0 w-full h-full rounded-full  flex justify-center items-center">
          <img className="w-full h-full rounded-full" src={inputFile} />
          <Flex gap={2} position="absolute">
            <IconButton
              icon={<IconCheck />}
              isLoading={isPending}
              onClick={onSaveImage}
              type="submit"
            />
            <IconButton
              type="button"
              onClick={onCancelChange}
              icon={<IconX />}
              isDisabled={isPending}
            />
          </Flex>
        </Box>
      ) : (
        <Box className=" absolute w-4 h-4 bottom-[13%] right-[13%] rounded-full flex justify-center items-center">
          <IconButton
            borderBlock="solid"
            borderWidth="1px"
            borderColor="brand.900"
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
