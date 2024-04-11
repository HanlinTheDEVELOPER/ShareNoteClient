/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useUserStore } from "../../store/userStore";
import { useSearchParams } from "react-router-dom";

import { Flex, GridItem } from "@chakra-ui/react";
import TagsCustomizeModel from "../user/TagsCustomizeModel";
import Tab from "./Tab";

const TabMenu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tag");

  const user = useUserStore((state) => state.user);
  const [tabs, setTabs] = useState(null);
  useEffect(() => {
    user &&
      setTabs([
        {
          title: "Recommends",
          active: activeTab === "Recommends" ? true : false,
        },
        {
          title: "Following",
          active: activeTab === "Following" ? true : false,
        },
        ...user.tags.map((tag) => ({
          title: tag,
          active: activeTab === tag ? true : false,
        })),
      ]);
    user?.tags
      ? setSearchParams({ tag: activeTab ? activeTab : "Recommends" })
      : setSearchParams({});
  }, [user]);

  const handleClick = (tab) => {
    setSearchParams({ tag: tab });

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
        <div>Please Login To Customize Feed</div>
      )}
    </Flex>
  );
};

export default TabMenu;
