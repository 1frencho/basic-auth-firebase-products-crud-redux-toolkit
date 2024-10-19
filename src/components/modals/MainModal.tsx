import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

interface MainModal {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
  closeText?: string;
  size?:
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "full";
}
function MainModal({
  isOpen,
  onClose,
  title,
  content,
  closeText = "Close",
  size = "lg",
}: MainModal) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={size}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{content}</ModalBody>
          <ModalFooter>
            <button className="myPrimaryBtn" onClick={onClose}>
              {closeText}
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default MainModal;
