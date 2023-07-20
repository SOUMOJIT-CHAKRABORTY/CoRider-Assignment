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
  );
};

export default RoomHeader;