import { Alert, AlertIcon, AlertProps } from "@chakra-ui/react";
import { MotionDiv } from "./MotionDiv";

interface AlertMotionProps {
  message: string;
  props?: AlertProps;
}

export const AlertMotion = ({ message, props }: AlertMotionProps) => {
  return (
    <MotionDiv>
      <Alert {...props} className="rounded-xl">
        <AlertIcon />
        <p className="text-base font-medium">{message}</p>
      </Alert>
    </MotionDiv>
  );
};
