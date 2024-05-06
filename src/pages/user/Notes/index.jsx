import {
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";

const NoteTabs = () => {
  return (
    <Tabs isFitted variant="enclosed" borderTop="2px solid white" size="40px">
      <TabList mb="1em">
        <Tab>One</Tab>
        <Tab>Two</Tab>
      </TabList>
      <TabIndicator
        bg="brand.900"
        h={23}
        mt="-20"
        zIndex={-2}
        borderBottomRadius={5}
      />
      <TabPanels>
        <TabPanel>
          <p>one!</p>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default NoteTabs;
