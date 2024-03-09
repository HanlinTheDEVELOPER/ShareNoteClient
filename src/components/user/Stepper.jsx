/* eslint-disable react/prop-types */
import { Box } from "@chakra-ui/layout";
import { Button, Flex } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import UserInterestInput from "./UserInterestInput";
import UsernameInput from "./UsernameInput";

const Stepper = ({ isPending, body, setBody }) => {
  const steps = [
    {
      label: "Choose a username to display!",
      content: <UsernameInput name={body.name} setBody={setBody} />,
    },
    {
      label: "Which fields are you interest in?",
      content: <UserInterestInput tags={body.tags} setBody={setBody} />,
    },
  ];

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
            <Box
              sx={{
                p: { base: 0, sm: 8 },
                pr: { base: 4, sm: 0 },
                m: { base: 2, sm: 4 },
                rounded: "md",
              }}
            >
              {content}
            </Box>
          </Step>
        ))}
      </Steps>
      <Flex justify=" center" gap={4}>
        {hasCompletedAllSteps ? (
          <Button type="button" size="sm" onClick={reset}>
            Reset
          </Button>
        ) : (
          <>
            <Button
              type="button"
              isDisabled={activeStep === 0}
              onClick={prevStep}
              size="sm"
              bg="brand.900"
            >
              Prev
            </Button>
            {isLastStep ? (
              <Button
                isDisabled={body?.tags?.length !== 3}
                size="sm"
                type="submit"
                bg="brand.900"
                isLoading={isPending}
              >
                Save
              </Button>
            ) : (
              <Button
                as={Box}
                isDisabled={body.name.length < 2}
                size="sm"
                onClick={nextStep}
                bg="brand.900"
              >
                Next
              </Button>
            )}
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Stepper;
