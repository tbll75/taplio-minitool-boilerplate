import { useState, useEffect } from "react";
import { Box, Heading, Text, Button, Divider, Center, Flex, 
  Image,
  Checkbox,
  useDisclosure,
  Tooltip,
  useMediaQuery,
  Link,
  Stack,
} from "@chakra-ui/react";
import { FaTwitter } from "react-icons/fa";
import { signIn, useSession, signOut } from "next-auth/react";
import { Logo } from "components";
import { List } from "components/list";
import * as Analytics from "utils/analytics"
import numbro from "numbro";
import { ConfirmPopup } from "./popups/confirmPopup";
import toast from "react-hot-toast";

export function Hero() {
  const [hasFetched, setHasFetched] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refresh, refresher] = useState({});
  const { data: session } = useSession();

  const { isOpen: isOpenConfirmTweet, onOpen: onOpenConfirmTweet, onClose: onCloseConfirmTweet } = useDisclosure();

  const [isTooSmall] = useMediaQuery("(max-width: 800px)");
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
      setIsSmall(isTooSmall);
  }, [isTooSmall]);

  const saveUserToEmailList = async () => {
    try {
      const url = "https://us-central1-ez4cast.cloudfunctions.net/pony-add";

      if (session?.user?.email) {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: session?.user.email,
            source: "challenge",
          }),
        });
        await response.json();
      }


    } catch (e) {
      console.log("Error in fetching data: ", e.message);
    }
  };

  console.log(session?.user);

  return (
    <Center>
      <Box maxW="1000px" textAlign="center" paddingTop="36" paddingBottom="20" >

        <Flex flexDir={isSmall ? "column" : "row"} justifyContent="center" alignItems="center" >
          <Flex flexDir="column" p={10}>
            <Heading as="h1" fontSize={{ base: "4xl", md: "40px" }}>
              Linkedin Carousel Generator
            </Heading>
            <Flex direction="row" justifyContent="center" alignItems="center" mt="4">
              <Text fontSize="9px" mr="2">
                Brought to you by
              </Text>
              <Logo iconSize="4" fontSize="sm" />
              <Text fontSize="9px" ml="1">
                & <Link fontSize="14px" fontWeight="800" href="https://twitter.com/aaditsh" target="_blank">Aadit</Link>
              </Text>
            </Flex>
            <Text mt={20} fontSize="lg" fontWeight="medium">
              Add tweets or Reddit posts to generate a Linkedin Carousel
            </Text>
            <Text pt={5} color="muted" fontSize="sm">
              Publish it and get crazy engagement
            </Text>
          </Flex>
          <Image src="/images/concept.png" w="380px" />
        </Flex>
        <Box paddingTop="10" paddingBottom="0">
          <Box mt={5}>
            <List />
          </Box>
        </Box>
      </Box>
    </Center>
  );
}
