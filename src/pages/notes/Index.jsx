import { useState } from "react";
import TabMenu from "../../components/common/TabMenu";
import FetchNotes from "../../components/notes/FetchNotes";

const Index = () => {
  const [activeTab, setActiveTab] = useState();

  return (
    <div>
      <TabMenu setActiveTab={setActiveTab} />
      <FetchNotes activeTab={activeTab ? activeTab : "all"} />
    </div>
  );
};

export default Index;
