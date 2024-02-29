import { Box } from "@chakra-ui/layout";
import { Button, Flex } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import UsernameInput from "./UsernameInput";
import UserInterestInput from "./UserInterestInput";
import { IconNumber1, IconNumber2 } from "@tabler/icons-react";

const steps = [
  {
    label: "Choose a username to display!",
    content: <UsernameInput />,
    icon: <IconNumber1 />,
  },
  {
    label: "Which fields are you interest in?",
    content: <UserInterestInput />,
    icon: <IconNumber2 />,
  },
];

const Stepper = () => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const isLastStep = activeStep === steps.length - 1;
  const hasCompletedAllSteps = activeStep === steps.length;
  return (
    <Flex
      flexDir="column"
      width="100%"
      p={{ base: 4, sm: 0 }}
      my={{ base: 4, sm: 8 }}
    >
      <Steps
        variant="circles"
        orientation="vertical"
        trackColor="brand.900"
        activeStep={activeStep}
      >
        {steps.map(({ label, content }) => (
          <Step bg="brand.900" label={label} key={label}>
            <Box sx={{ p: 8, mt: 4, rounded: "md" }}>{content}</Box>
          </Step>
        ))}
      </Steps>
      <Flex justify=" center" gap={4}>
        {hasCompletedAllSteps ? (
          <Button size="sm" onClick={reset}>
            Reset
          </Button>
        ) : (
          <>
            <Button
              isDisabled={activeStep === 0}
              onClick={prevStep}
              size="sm"
              bg="brand.900"
            >
              Prev
            </Button>
            <Button size="sm" onClick={nextStep} bg="brand.900">
              {isLastStep ? "Finish" : "Next"}
            </Button>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Stepper;
