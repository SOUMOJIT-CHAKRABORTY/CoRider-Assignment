import {
  AbsoluteCenter,
  Avatar,
  Box,
  Center,
  Container,
  Divider,
  Flex,
  Text,
  WrapItem,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { chatMessage } from "../types/types";
import axios from "axios";

const MessageSec: React.FC = () => {
  const [chats, setChats] = useState<chatMessage[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMoreChats, setHasMoreChats] = useState<boolean>(true);

  const PAGE_SIZE = 10;

  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://qa.corider.in/assignment/chat?page=${page}`
      );

      const data = response.data;

      if (data && data.chats) {
        const newChat: chatMessage[] = data.chats || [];

        setChats((prev) => (page === 0 ? newChat : [...prev, ...newChat]));

        const totalChatMessages = (page + 1) * PAGE_SIZE;
        setHasMoreChats(newChat.length === PAGE_SIZE);
      }
    } catch {
      console.log("Error fetching chats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(pageNumber);
  }, [pageNumber]);

  // const handleLoadMore = () => {
  //   console.log(pageNumber);
  //   setPageNumber((prev) => prev + 1);
  // };

  return (
    <InfiniteScroll
      dataLength={chats.length}
      next={() => {
        console.log(pageNumber);
        setPageNumber((prev) => prev + 1);
      }}
      hasMore={hasMoreChats}
      loader={
        <Center>
          <h4>Loading...</h4>
        </Center>
      }
    >
      <Box position="relative" padding="10">
        <Divider />
        <AbsoluteCenter textColor={"gray.500"} bg={"#FAF9F4"} px="4">
          <Text>20th Jul 2023</Text>
        </AbsoluteCenter>
      </Box>
      {chats.length > 0 ? (
        chats.map((chat) => {
          return (
            <Box key={chat.id}>
              <Container>
                {!chat.sender.self ? (
                  <Flex>
                    <WrapItem>
                      <Avatar src={chat.sender.image} boxSize={7} />
                    </WrapItem>
                    <Box
                      borderBottomRadius="20px"
                      borderTopRightRadius="20px"
                      borderTopLeftRadius="0px"
                      fontFamily="Mulish"
                      textAlign="left"
                      maxW="80%"
                      padding="5px"
                      marginTop="5px"
                      marginLeft="5px"
                      bg="#ffffff"
                      shadow="lg"
                    >
                      <Container paddingLeft="7px" paddingRight="0">
                        <Text fontWeight="500" fontSize="14px" color="#606060">
                          {chat.message}
                        </Text>
                      </Container>
                    </Box>
                  </Flex>
                ) : (
                  <Flex>
                    <Avatar visibility="hidden" boxSize={10}>
                      lol
                    </Avatar>
                    <Box
                      borderTopRadius="20px"
                      borderBottomRightRadius="0px"
                      borderBottomLeftRadius="20px"
                      right="0"
                      textAlign="left"
                      paddingLeft="0"
                      paddingRight="0"
                      fontFamily="Mulish"
                      padding="5px"
                      marginTop="5px"
                      marginRight="5px"
                      bg={"#1C63D5"}
                      shadow="lg"
                      maxW={"84%"}
                      marginLeft="40px"
                    >
                      <Container paddingLeft="7px" paddingRight="0">
                        <Text
                          fontWeight="500"
                          fontSize="14px"
                          textAlign="left"
                          color="#ffffff"
                        >
                          {chat.message}
                        </Text>
                      </Container>
                    </Box>
                  </Flex>
                )}
              </Container>
              <br />
              <br />
            </Box>
          );
        })
      ) : (
        <Center>No chat message to display</Center>
      )}
    </InfiniteScroll>
  );
};

export default MessageSec;
