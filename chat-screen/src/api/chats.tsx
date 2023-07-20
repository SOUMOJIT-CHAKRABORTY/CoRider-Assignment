import { AbsoluteCenter, Box, Divider, Flex, Spinner } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import MessageBar from "../components/MessageBar";
import MessageSec from "../components/MessageSec";
import RoomHeader from "../components/RoomHeader";
import Navbar from "../components/Navbar";
import { apiData, chatMessage } from "../types/types";

const GetChats: React.FC = () => {
  const [chats, setChats] = useState<chatMessage[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [apiRes, setApiRes] = useState<apiData>({
    from: "",
    message: "",
    name: "",
    status: "",
    to: "",
  });
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
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [pageNumber]);

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
      <Navbar apiRes={apiRes} />
      <RoomHeader apiRes={apiRes} />
      <Divider />
      {loading && (
        <AbsoluteCenter>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </AbsoluteCenter>
      )}
      <Flex
        direction="column-reverse"
        style={{ overflowY: "auto", height: "calc(100% - 198px)" }}
      >
        <MessageSec
          chats={chats}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      </Flex>
      <MessageBar />
    </Box>
  );
};

export default GetChats;
