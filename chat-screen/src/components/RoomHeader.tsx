import { Avatar, Flex, Icon, Spacer, Stack, Text } from "@chakra-ui/react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import React from "react";
import { apiData } from "../types/types";

type Props = {
  apiRes: apiData;
};

const RoomHeader: React.FC<Props> = ({ apiRes }: Props) => {
  return (
    <Flex
      alignItems="center"
      paddingLeft="20px"
      paddingRight="20px"
      marginBottom="10px"
    >
      <Avatar marginRight="15px" />
      <Stack>
        <Text
          fontWeight="600"
          fontFamily="Mulish"
          fontSize="md"
          textColor="#606060"
          letterSpacing="1px"
          margin="0"
        >
          From{" "}
          <span
            style={{
              color: "#141E0D",
              fontFamily: "Mulish",
              fontWeight: "700",
              fontSize: "18px",
            }}
          >
            {apiRes.from}
          </span>
        </Text>
        <Text
          fontWeight="600"
          textColor="#606060"
          fontSize="md"
          letterSpacing="1px"
          margin="0"
        >
          To{" "}
          <span
            style={{ color: "#141E0D", fontWeight: "700", fontSize: "18px" }}
          >
            {apiRes.to}
          </span>
        </Text>
      </Stack>
      <Spacer />
      <Icon as={BiDotsVerticalRounded} marginLeft={0} boxSize={6} />
    </Flex>
  );
};

export default RoomHeader;
