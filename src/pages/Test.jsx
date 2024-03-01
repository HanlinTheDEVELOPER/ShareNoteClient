import ProtectedButton from "../components/common/ProtectedButton";

const Test = () => {
  return (
    <div>
      <ProtectedButton fn={() => alert("ok")}>Hello</ProtectedButton>
    </div>
  );
};

export default Test;
