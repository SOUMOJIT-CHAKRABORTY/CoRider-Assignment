import {
  Avatar,
  Box,
  Card,
  CardBody,
  Center,
  Container,
  Flex,
  Text,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { chatMessage } from "../types/types";

type Props = {
  chats: Array<chatMessage>;
  pageNumber: number;
  setPageNumber: (val: number) => void;
};

const MessageSec: React.FC<Props> = ({
  chats,
  pageNumber,
  setPageNumber,
}: Props) => {
  const handleLoadMore = () => {
    setPageNumber(pageNumber + 1);
  };

  return (
    <InfiniteScroll
      dataLength={chats.length}
      next={handleLoadMore}
      hasMore={true}
      loader={
        <Center>
          <h4>Loading...</h4>
        </Center>
      }
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
        <Center>No chat message to display</Center>
      )}
    </InfiniteScroll>
  );
};

export default MessageSec;
