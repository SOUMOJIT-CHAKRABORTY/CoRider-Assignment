import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import GetChats from "./api/Chats";

export const App = () => (
  <ChakraProvider theme={theme}>
    <GetChats />
  </ChakraProvider>
);
