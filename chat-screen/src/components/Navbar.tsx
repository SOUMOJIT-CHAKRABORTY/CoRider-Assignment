import { ArrowBackIcon, EditIcon } from "@chakra-ui/icons";
import { Flex, Heading, Spacer } from "@chakra-ui/react";
import React from "react";
import { apiData } from "../types/types";

type Props = {
  apiRes: apiData;
};

const Navbar: React.FC<Props> = ({ apiRes }: Props) => {
  return (
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
  );
};

export default Navbar;
