import React from "react";

const SupportList = ({ data }) => {
  const { supports, supporters } = data;
  const totalSupporters = supporters?.length;
  return (
    <div>
      <h1>
        {supports} supports by {totalSupporters} users.
      </h1>
      {JSON.stringify(supporters)}
    </div>
  );
};

export default SupportList;
