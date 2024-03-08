import { useState } from "react";
import StepperComponent from "../../components/user/Stepper";
import { useMutation } from "@tanstack/react-query";
import { setupAccount } from "../../lib/userApi";
import { useToast } from "@chakra-ui/react";
import { queryClient } from "../../main";
import { useUserStore } from "../../store/userStore";
import { useSearchParams, useNavigate } from "react-router-dom";

const SetupAcc = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const redirectTo = searchParams.get("state");
  const navigate = useNavigate();
  const [body, setBody] = useState({
    name: "",
    tags: ["AI", "Anime", "Art"],
  });
  const { mutateAsync, isError, isPending, isSuccess } = useMutation({
    mutationKey: ["user"],
    mutationFn: (data) => setupAccount(data),
  });

  const setUser = useUserStore((state) => state.setUser);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await mutateAsync(body);
      queryClient.prefetchQuery({
        queryKey: ["user"],
        queryFn: setUser,
      });
      toast({
        description: "Set up account completed!",
        status: "success",
        isClosable: true,
      });
      navigate(redirectTo);
    } catch (error) {
      console.log(error);
      toast({
        description: "Set up account Failed!",
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} method="POST">
      <StepperComponent body={body} setBody={setBody} />
    </form>
  );
};

export default SetupAcc;
