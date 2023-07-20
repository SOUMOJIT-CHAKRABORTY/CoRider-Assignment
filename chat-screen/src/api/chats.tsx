import {
  AbsoluteCenter,
  Avatar,
  Box,
  Card,
  CardBody,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Spacer,
  Stack,
  Text,
  WrapItem,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { AttachmentIcon, EditIcon, ArrowBackIcon } from "@chakra-ui/icons";

import { BiDotsVerticalRounded } from "react-icons/bi";
import { AiOutlineSend } from "react-icons/ai";
import { AiFillCamera } from "react-icons/ai";
import { AiOutlineFileDone } from "react-icons/ai";
import { FaVideo } from "react-icons/fa";

import InfiniteScroll from "react-infinite-scroll-component";

interface apiData {
  from: string;
  message: string;
  name: string;
  status: string;
  to: string;
}

interface chatMessage {
  id: number;
  sender: {
    image: string;
    is_kyc_verified: boolean;
    self: boolean;
    user_id: string;
  };
  message: string;
  timestamp: string;
}

const GetChats = () => {
  const [chats, setChats] = useState<chatMessage[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [apiRes, setApiRes] = useState<apiData>({
    from: "",
    message: "",
    name: "",
    status: "",
    to: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fetchChats = async () => {
    const response = await axios.get(
      "https://qa.corider.in/assignment/chat?page=0"
    );

    const data = response.data;
    setApiRes({
      ...data,
    });
    if (data && data.chats) {
      const newChat: chatMessage[] = data.chats || [];

      setChats((prev) => [...prev, ...newChat]);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [pageNumber]);

  const handleLoadMore = () => {
    setPageNumber((prev) => prev + 1);
  };

  const handleAttachmentClick = () => {
    isOpen ? onClose() : onOpen();
  };

  return (
    <Box
      style={{
        padding: "10px",
        paddingLeft: "0px",
        height: "100vh",
        boxSizing: "border-box",
      }}
      background="#FAF9F4"
    >
      <Flex
        marginBottom="8px"
        alignItems="center"
        paddingLeft="20px"
        paddingRight="20px"
      >
        <ArrowBackIcon boxSize={6} marginRight="10px" />
        <Heading as="h2" size="lg" fontWeight="medium">
          {apiRes.name}
        </Heading>
        <Spacer />
        <EditIcon marginLeft="0px" boxSize={5} />
      </Flex>
      <Flex
        alignItems="center"
        paddingLeft="20px"
        paddingRight="20px"
        marginBottom="10px"
      >
        <Avatar marginRight="15px" />
        <Stack>
          <Text fontWeight="light" fontSize="md" letterSpacing="1px">
            from{" "}
            <span style={{ fontWeight: "bold", fontSize: "18px" }}>
              {apiRes.from}
            </span>
          </Text>
          <Text fontWeight="light" fontSize="md" letterSpacing="1px">
            to{" "}
            <span style={{ fontWeight: "bold", fontSize: "18px" }}>
              {apiRes.to}
            </span>
          </Text>
        </Stack>
        <Spacer />
        <Icon as={BiDotsVerticalRounded} marginLeft={0} boxSize={6} />
      </Flex>
      <Divider />
      <Flex
        direction="column-reverse"
        style={{ overflowY: "auto", height: "calc(100% - 198px)" }}
      >
        <InfiniteScroll
          dataLength={chats.length}
          next={handleLoadMore}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {chats.length > 0 ? (
            chats.reverse().map((chat) => {
              return (
                <Box key={chat.id}>
                  <Container>
                    {!chat.sender.self ? (
                      <Flex>
                        <WrapItem>
                          <Avatar src={chat.sender.image} boxSize={8} />
                        </WrapItem>
                        <Card
                          borderBottomRadius="20px"
                          borderTopRightRadius="20px"
                          borderTopLeftRadius="0px"
                          marginTop="15px"
                          marginLeft="5px"
                        >
                          <CardBody>
                            <Text
                              fontWeight="light"
                              fontSize="14px"
                              fontFamily="verdana"
                              color="#606060"
                            >
                              {chat.message}
                            </Text>
                          </CardBody>
                        </Card>
                      </Flex>
                    ) : (
                      <Flex>
                        <Card
                          borderTopRadius="20px"
                          borderBottomRightRadius="0px"
                          borderBottomLeftRadius="20px"
                          marginTop="15px"
                          marginRight="5px"
                        >
                          <CardBody>
                            <Text
                              fontWeight="light"
                              fontSize="14px"
                              fontFamily="verdana"
                              color="#606060"
                            >
                              {chat.message}
                            </Text>
                          </CardBody>
                        </Card>
                      </Flex>
                    )}
                  </Container>
                  <br />
                  <br />
                </Box>
              );
            })
          ) : (
            <p>No chat message to display</p>
          )}
        </InfiniteScroll>
      </Flex>
      <Center
        style={{
          position: "fixed",
          bottom: "50px",
          width: "100%",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <InputGroup maxW={{ base: "100%", md: "50%" }}>
          <Input
            placeholder="message"
            size="md"
            background="#ffffff"
            color="#B7B7B7"
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
    </Box>
  );
};

export default GetChats;
