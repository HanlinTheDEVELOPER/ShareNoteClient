import { useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import { useModalStore } from "../store/modalStore";

const Test = () => {
  const setIsLoginModalOpen = useModalStore(
    (state) => state.setIsLoginModalOpen
  );

  return <div>Test</div>;
};

export default Test;
