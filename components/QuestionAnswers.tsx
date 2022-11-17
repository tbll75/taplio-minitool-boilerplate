import { Box, Heading, Text, Center,
  Button,
  Divider,
  Flex,
  Link,
} from "@chakra-ui/react";
import { signIn, useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { FaTwitter } from "react-icons/fa";
import * as Analytics from "utils/analytics"
import {useTaplioUrl} from "utils/useTaplioUrl";

export function QuestionAnswers() {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  const [refresh, refresher] = useState({});
  const url = useTaplioUrl();
  
  return (
    <Box maxW={{ base: "300", sm: "450", md: "650", lg: "900" }} margin="auto">

      <Center>
        <Divider width="40" mt="12" mb="20" />
      </Center>
      {getQuestions(url).map(({ ques, ans, id }) => (
        <Box key={id} mb="16">
          <Heading as="h2" fontSize="2xl" mb="8">
            {ques}
          </Heading>
          <Text fontSize="lg" fontWeight="400" whiteSpace="pre-wrap">
            {ans}
          </Text>
        </Box>
      ))}
      <Flex direction={{ base: "column-reverse", md: "column" }} alignItems="center" marginBottom="8" mt={20}>
        <Text fontWeight="300" fontSize="xs" mb="3" mt="3">
          The all-in-one Linkedin growth tool
        </Text>
        <Button
          colorScheme="linkedin"
          fontSize="lg"
          size="md"
          paddingX="8"
          width="72"
          as={"a"}
          target="_blank"
          href={url} 
          onClick={() => {
            Analytics.log("hit_taplio_link", {source: "challenge"});
          }}
        >
          Schedule with Taplio
        </Button>
      </Flex>
    </Box>
  );
}

const getQuestions = (url) => {
  return [
    {
      id: "0",
      ques: "What are Linkedin carousel posts?",
      ans: `The carousel format on Linkedin is when you upload a set of slides that people can navigate, similar to a PowerPoint presentation. In order to create such a posts, you need to create a PDF document and upload it in your post. Linkedin will then interpret each page as a different slide of your presentation.`,
    },
    {
      id: "1",
      ques: "Why should I care about LinkedIn carousels?",
      ans: `LinkedIn rewards publishers that keep users on the platform with extra visibility. And needless to say that carousel are rather catchy long-form content that will do just that.
  
  Carousels are also one of the most popular content formats on LinkedIn right now, generating a high level of engagement.
  
  With the 600M+ users LinkedIn has, we think it’s a good idea if you can leverage part of that audience to your advantage.`,
    },
    {
      id: "2",
      ques: "Is this tool free?",
      ans: `Yes! This tool is entirely free, no catch.`,
    },
    {
      id: "3",
      ques: "How does it work?",
      ans: `All you need to do is import the various “slides” you want for your final carousel.
  
  Those can be either tweets, Reddit posts or image URLs. Just copy/paste those URLs into each field at the top, and press “add new” to add an image.
  
  When you’re done, hit “generate carousel” and wait a couple minutes until the “download carousel” button is available.`,
    },
    {
      id: "4",
      ques: "Where can I find content to create my carousel? ",
      ans: <Text>If your post was successful on Twitter, it is very likely it will be successful on Linkedin. You can find some inspiration to nail down your tweets first, with our <Link textDecoration="underline" href="http://tweethunter.io/tweets" target="_blank">Tweet Collections</Link>, a library of tweets sorted on many topics to help you get traction fast.</Text>,
    },
    {
      id: "5",
      ques: "What tool should I use to publish on LinkedIn?",
      ans: <Text>You can use LinkedIn to publish your content directly on the platform. That’s fine! What you won’t get with that is scheduling, automation and content inspiration to help you post professionally and drive results. All of which <Link textDecoration="underline" href={url} target="_blank">Taplio</Link> (which we have built) can do for you.</Text>,
    },
  ];
}