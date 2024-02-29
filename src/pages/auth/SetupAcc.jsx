import { useState } from "react";
import StepperComponent from "../../components/user/Stepper";

const SetupAcc = () => {
  const [body, setBody] = useState({
    name: "",
    tags: ["AI", "Anime", "Art"],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(body);
  };

  return (
    <form onSubmit={handleSubmit} method="POST">
      <StepperComponent body={body} setBody={setBody} />
    </form>
  );
};

export default SetupAcc;
