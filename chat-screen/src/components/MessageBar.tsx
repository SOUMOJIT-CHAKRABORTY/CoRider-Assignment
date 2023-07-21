import { AttachmentIcon } from "@chakra-ui/icons";
import {
  Center,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineSend } from "react-icons/ai";
import { AiFillCamera } from "react-icons/ai";
import { AiOutlineFileDone } from "react-icons/ai";
import { FaVideo } from "react-icons/fa";

const MessageBar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAttachmentClick = () => {
    isOpen ? onClose() : onOpen();
  };

  return (
    <Center
      style={{
        position: "fixed",
        bottom: "50px",
        width: "100%",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      <InputGroup maxW={{ base: "100%", md: "50%" }} border="white">
        <Input
          placeholder="message"
          size="md"
          background="#ffffff"
          textColor="#B7B7B7"
          fontWeight="base"
          fontSize="14px"
          letterSpacing="1px"
        />
        <InputRightElement marginRight="10px">
          <Popover placement="top" onClose={onClose} onOpen={onOpen}>
            <PopoverTrigger>
              <AttachmentIcon
                marginRight="8px"
                onClick={handleAttachmentClick}
              />
            </PopoverTrigger>
            <PopoverContent borderRadius="40px" bg="#008000" width="120px">
              <PopoverArrow bg={"#008000"} />
              <PopoverBody>
                <Flex
                  gap="5px"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Icon as={AiFillCamera} boxSize={6} />
                  <Icon as={FaVideo} boxSize={6} />
                  <Icon as={AiOutlineFileDone} boxSize={6} />
                </Flex>
              </PopoverBody>
            </PopoverContent>
          </Popover>
          <Icon as={AiOutlineSend} marginRight="10px" />
        </InputRightElement>
      </InputGroup>
    </Center>
  );
};

export default MessageBar;
