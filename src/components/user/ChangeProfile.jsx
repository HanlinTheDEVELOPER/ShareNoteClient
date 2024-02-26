import { IconCheck, IconPhotoUp, IconX } from "@tabler/icons-react";
import { Button, IconButton, Box, Flex } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { changeProfileImage } from "../../lib/userApi";

const ChangeProfile = () => {
  const inputRef = useRef(null);
  const [inputFile, setInputFile] = useState(null);
  const [file, setFile] = useState(null);

  const { mutate, isError, isPending, isSuccess } = useMutation({
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

  const onSaveImage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    mutate(formData);
  };

  return (
    <form
      className="profile_image_container"
      onSubmit={onSaveImage}
      encType="multipart/form-data"
    >
      {inputFile ? (
        <Box className="absolute top-0 left-0 w-full h-full rounded-full  flex justify-center items-center">
          <img className="w-full h-full rounded-full" src={inputFile} />
          <Flex gap={2} position="absolute">
            <IconButton
              icon={<IconCheck />}
              isLoading={false}
              onClick={onSaveImage}
              type="submit"
            />
            <IconButton
              type="button"
              onClick={onCancelChange}
              icon={<IconX />}
              isDisabled={false}
            />
          </Flex>
        </Box>
      ) : (
        <Box className="profile_image_input absolute top-0 left-0 w-full h-full rounded-full flex justify-center items-center backdrop-blur">
          <Button type="button">
            Upload Image
            <IconPhotoUp />
          </Button>
          <input
            ref={(el) => (inputRef.current = el)}
            type="file"
            accept="image/*"
            name="profile_image_input"
            className="w-full h-full absolute z-10 rounded-full opacity-0"
            onChange={onImageChange}
          />
        </Box>
      )}
    </form>
  );
};

export default ChangeProfile;
