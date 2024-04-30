/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useUserStore } from "../../store/userStore";
import { useSearchParams } from "react-router-dom";

import {
  Flex,
  GridItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useMediaQuery,
} from "@chakra-ui/react";
import TagsCustomizeModel from "../user/TagsCustomizeModel";
import Tab from "./Tab";

const TabMenu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tag");
  const [isLargeScreen] = useMediaQuery("(min-width: 768px)");

  const user = useUserStore((state) => state.user);
  const [tabs, setTabs] = useState(null);
  useEffect(() => {
    user &&
      setTabs([
        {
          title: "Recommends",
          active:
            activeTab === "Recommends" || activeTab === null ? true : false,
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
    <>
      <Flex justify={{ base: "end", sm: "none", md: "center" }} mt={2} p={"4"}>
        {user?.tags?.length === 3 ? (
          isLargeScreen ? (
            <Flex
              justify="center"
              gap={6}
              w="fit"
              display={{ base: "none", sm: "none", md: "flex" }}
            >
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
            <Menu position="relative">
              <MenuButton
                display={{ base: "block", sm: "block", md: "none" }}
                borderColor="brand.900"
                borderWidth={1}
                p={2}
                pr="16px"
                borderRadius={12}
                _active={{
                  bg: "brand.900",
                }}
              >
                Category
              </MenuButton>
              <MenuList>
                {tabs?.map((tab) => (
                  <MenuItem key={tab.title}>
                    <Tab
                      title={tab.title}
                      active={tab.active}
                      handleClick={() => handleClick(tab.title)}
                    />
                  </MenuItem>
                ))}
                <MenuItem display="flex" justifyContent="center">
                  <GridItem w="fit" alignSelf={"center"}>
                    <TagsCustomizeModel />
                  </GridItem>
                </MenuItem>
              </MenuList>
            </Menu>
          )
        ) : (
          <div>Please Login To Customize Feed</div>
        )}
      </Flex>
    </>
  );
};

export default TabMenu;
