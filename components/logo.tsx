import { Stack, Link, Heading, Box, Text } from "@chakra-ui/react";
import * as Analytics from "utils/analytics";
import {useTaplioUrl} from "utils/useTaplioUrl";

interface Props {
  fontSize?: string;
  iconSize?: string;
}

export function Logo({ fontSize = "xl", iconSize = "6" }: Props) {

  const url = useTaplioUrl();

  return (
    <Stack isInline alignItems="center" justifyContent="center">
      <Heading fontSize="14px" whiteSpace="nowrap">
        <Link href={url} taget="_blank">Taplio</Link>
      </Heading>
    </Stack>
  );
}
