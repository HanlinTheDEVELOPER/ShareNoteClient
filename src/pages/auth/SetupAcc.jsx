import { useState } from "react";
import StepperComponent from "../../components/user/Stepper";
import { useMutation } from "@tanstack/react-query";
import { setupAccount } from "../../lib/Api/userApi";
import { useToast } from "@chakra-ui/react";
import { queryClient } from "../../main";
import { useUserStore } from "../../store/userStore";
import { useSearchParams, useNavigate } from "react-router-dom";

const SetupAcc = () => {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  if (user?.tags.length === 3) navigate(-1);
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const redirectTo = searchParams.get("state");
  const [body, setBody] = useState({
    name: "",
    tags: ["AI", "Anime", "Art"],
  });
  const { mutateAsync, isPending } = useMutation({
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
      <StepperComponent isPending={isPending} body={body} setBody={setBody} />
    </form>
  );
};

export default SetupAcc;
