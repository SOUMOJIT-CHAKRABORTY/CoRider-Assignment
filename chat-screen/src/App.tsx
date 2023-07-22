import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./chakra-themes";
import GetChats from "./api/chats";

export const App = () => (
  <ChakraProvider theme={theme}>
    <GetChats />
  </ChakraProvider>
);
