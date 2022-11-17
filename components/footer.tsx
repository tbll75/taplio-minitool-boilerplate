import { useState, useEffect } from "react";
import { Box, Button, Text, useBreakpointValue, Flex, Link,
  useMediaQuery,
} from "@chakra-ui/react";
import { Logo } from "./logo";
import * as Analytics from "utils/analytics";

export function Footer() {
  const iconSize = useBreakpointValue({ base: "3", md: "6" });
  const fontSize = useBreakpointValue({ base: "xs", md: "xl" });

  const [isTooSmall] = useMediaQuery("(max-width: 800px)");
  const [isSmall, setIsSmall] = useState(false);
  useEffect(() => {
      setIsSmall(isTooSmall);
  }, [isTooSmall]);

  return (
    <Box maxW="1200" width="80%" margin="auto" marginBottom={{ base: "10", md: "16" }} marginTop="24">
      {/* <Flex direction={{ base: "column-reverse", md: "column" }} alignItems="center" marginBottom="8">
        <Text fontWeight="300" fontSize="xs" mb="3" mt="3">
          The all-in-one Twitter growth tool
        </Text>
        <Button
          backgroundColor="#1f1f1f"
          _hover={{ backgroundColor: "#171923", textDecoration: "none" }}
          boxShadow="light-lg"
          _active={{ backgroundColor: "#171923" }}
          fontSize="lg"
          size="md"
          paddingX="8"
          width="72"
          as={Link}
          target="_blank"
          href="https://tweethunter.io/?utm_source=challenge"
          onClick={() => {
            Analytics.log("hit_tweethunter_link", {source: "challenge"});
          }}
        >
          Grab Tweet Hunter for free
        </Button>
      </Flex> */}
      <Flex flexDir={isSmall ? "column" : "row"} justifyContent="space-between" mt={20}>
        <Box marginTop={{ base: "24", md: "0" }}>
          <Logo fontSize={fontSize} iconSize={iconSize} />
        </Box>
        {/* <Text fontWeight="600" mt={isSmall ? 10 : 0}>
          When signing up, you agree to our <Link href="https://tweethunter.notion.site/Twitter-Growth-Contest-by-Tweet-Hunter-0fb60dc52b5944639443e6003403ed39" isExternal textDecoration="underline">Terms and Conditions</Link>
        </Text> */}
        <Text fontWeight="600" mt={isSmall ? 10 : 0}>
          Built by <Link href="https://twitter.com/tibo_maker" target="_blank">@tibo_maker</Link> and <Link href="https://twitter.com/aaditsh" target="_blank">@aaditsh</Link>
        </Text>
      </Flex>
      {/* <Box
          position="fixed" bottom={5} left="50%" transform="translateX(-50%)"
          zIndex="10"
      >   
          <div dangerouslySetInnerHTML={{ __html: `<a href="https://www.producthunt.com/posts/twitter-growth-challenge-2022?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-twitter-growth-challenge-2022" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=325796&theme=light" alt="Twitter Growth Challenge 2022 - Get results. Grow an audience. Get prizes. | Product Hunt" style="width: 180px; height: 40px;" width="180" height="40" /></a>` }} />
      </Box> */}

      {/* <Box
          position="fixed" bottom={5} left="50%" transform="translateX(-50%)"
          zIndex="10"
      >   
          <div dangerouslySetInnerHTML={{ __html: `<a href="https://www.producthunt.com/posts/linkedin-carousel-generator?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-linkedin&#0045;carousel&#0045;generator" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=358387&theme=light" alt="LinkedIn&#0032;Carousel&#0032;Generator - Create&#0032;LinkedIn&#0032;carousels&#0032;easily&#0032;and&#0032;for&#0032;free&#0046; | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>` }} />
      </Box> */}
    </Box>
  );
}
