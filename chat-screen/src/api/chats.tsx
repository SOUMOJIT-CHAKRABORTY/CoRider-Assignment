import { AbsoluteCenter, Box, Divider, Flex, Spinner } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import MessageBar from "../components/MessageBar";
import MessageSec from "../components/MessageSec";
import RoomHeader from "../components/RoomHeader";
import Navbar from "../components/Navbar";
import { apiData } from "../types/types";

const GetChats: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [apiRes, setApiRes] = useState<apiData>({
    from: "",
    message: "",
    name: "",
    status: "",
    to: "",
  });
  const fetchChats = async () => {
    try {
      const response = await axios.get(
        "https://qa.corider.in/assignment/chat?page=0"
      );

      const data = response.data;
      setApiRes({
        ...data,
      });
      if (data) {
        setLoading(false);
      }
    } catch {
      console.log("Error fetching Data");
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <Box
      style={{
        padding: "10px",
        paddingLeft: "0px",
        height: "100vh",
        boxSizing: "border-box",
        fontFamily: "Mulish",
      }}
      background="#FAF9F4"
    >
      <Navbar apiRes={apiRes} />
      <RoomHeader apiRes={apiRes} />
      <Divider colorScheme="blackAlpha" />
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
        style={{
          overflowY: "auto",
          height: "calc(100% - 230px)",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <MessageSec />
      </Flex>
      <MessageBar />
    </Box>
  );
};

export default GetChats;
