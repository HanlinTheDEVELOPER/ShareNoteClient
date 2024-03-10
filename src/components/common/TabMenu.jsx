/* eslint-disable react/prop-types */
import { Flex, GridItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useUserStore } from "../../store/userStore";
import TagsCustomizeModel from "../user/TagsCustomizeModel";
import Tab from "./Tab";

const TabMenu = ({ setActiveTab }) => {
  const user = useUserStore((state) => state.user);
  const [tabs, setTabs] = useState(null);
  useEffect(() => {
    user &&
      setTabs([
        { title: "Recommends", active: true },
        { title: "Following", active: false },
        ...user.tags.map((tag) => ({ title: tag, active: false })),
      ]);
    user?.tags ? setActiveTab("Recommends") : setActiveTab("all");
  }, [user]);

  const handleClick = (tab) => {
    setActiveTab(tab);
    setTabs((prev) =>
      prev.map((prev) =>
        prev.title === tab
          ? { ...prev, active: true }
          : { ...prev, active: false }
      )
    );
  };
  return (
    <Flex justify="center" mt={2}>
      {user?.tags?.length === 3 ? (
        <Flex justify="center" gap={6} w="fit">
          {tabs?.map((tab) => (
            <Tab
              key={tab.title}
              title={tab.title}
              active={tab.active}
              handleClick={() => handleClick(tab.title)}
            />
          ))}
          <GridItem w="fit">
            <TagsCustomizeModel />
          </GridItem>
        </Flex>
      ) : (
        <div>login</div>
      )}
    </Flex>
  );
};

export default TabMenu;
