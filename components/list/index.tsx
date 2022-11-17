import { useState, useEffect, useRef, useCallback } from "react";
import {
    Box, Button,
    Text,
    useBreakpointValue,
    Flex,
    Link,
    useMediaQuery,
    Avatar,
    Badge,
    Center,
    chakra,
    HStack,
    Stack,
    OrderedList,
    ListItem as OrderedListItem,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Tag,
    Menu,
    Icon,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Switch,
    Divider,
    GridItem,
    Image,
    Grid,
    IconButton,
} from "@chakra-ui/react";
import { Reorder } from 'framer-motion';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiDownload } from "react-icons/bi";
import { Item } from "./item";
import toast from "react-hot-toast";
import { totalmem } from "os";
import ReactCanvasConfetti from "react-canvas-confetti";
import { ChevronDownIcon } from "@chakra-ui/icons";
import * as Analytics from "utils/analytics"
import { saveAs } from 'file-saver';
import {useTaplioUrl} from "utils/useTaplioUrl";

const ListParent = chakra(Reorder.Group);
const ListItem = chakra(Reorder.Item);

export const issues = [
    {
      id: 1,
      tweetUrl: "",
      type: "tweet"
    },
    {
      id: 2,
      tweetUrl: "",
      type: "tweet"
    },
];

const canvasStyles = {
    position: "fixed",
    pointerEvents: "none",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0
};

export function List() {

    const [isGenerating, setIsGenerating] = useState(false);
    const [theme, setTheme] = useState("dim");
    const [showEngagement, setShowEngagement] = useState(true);
    const [showDetails, setShowDetails] = useState(true);
    const [items, setItems] = useState(issues);
    const [order, setOrder] = useState(() => items.map((issue) => issue.id));
    
    const [pdf, setPdf] = useState("");
    const [images, setImages] = useState([]);
    // const [pdf, setPdf] = useState("https://ez4cast.s3.eu-west-1.amazonaws.com/pdfFromImages/result.pdf");
    
    const url = useTaplioUrl();

    const refAnimationInstance = useRef(null);

    const generate = async () => {

        // console.log("generate", items);

        let filteredItems = items.filter((issue) => issue.tweetUrl);
        if (!filteredItems?.length) {
            toast.error("Add at least 1 item to generate a carousel");
            return;
        }

        // console.log({filteredItems});

        // order them
        let orderedItems = order.map((item) => filteredItems.find((value) => value.id === item)).filter(x => x?.tweetUrl);
        // console.log({orderedItems});

        setIsGenerating(true);

        const res = await fetch("https://us-central1-ez4cast.cloudfunctions.net/linkedinCarousell-generate", {
            method: "POST",
            headers: new Headers({ "Content-Type": "application/json" }),
            credentials: "same-origin",
            body: JSON.stringify({
                items: orderedItems,
                params: {
                    tweetScreenshotParams: {
                        themeId: theme,
                        displayLikes: showEngagement,
                        displayReplies: showEngagement,
                        displayRetweets: showEngagement,
                        displayTime: showDetails,
                        displaySource: showDetails,
                    }
                }
            }),
        });

        let json = await res.json();
        // console.log("json", json);

        if (json.success && json.pdf) {
            // window.open(json.pdf);
            setPdf(json.pdf);
            setImages(json.images);
            fire();
        }
        else {
            toast.error(json?.error ?? "Failed to generate PDF");
        }


        setIsGenerating(false);

    }

    const deleteItem = (id) => {
        let match = items.find((issue) => issue.id === id);
        if (match) {
            setItems(items.filter((issue) => issue.id !== id));
            setOrder(order.filter((o) => o !== id));
        }
    }

    const addItem = () => {

        // console.log({order});
        // console.log({items});

        let newId = Math.max(...items.map(x => x.id)) + 1 ?? 1;
        let newItem = {
            id: newId,
            tweetUrl: "",
            type: "tweet"
        };

        let newArray = [...items, newItem];
        // console.log({newArray});

        setItems(newArray);
        // setOrder(() => newArray.map((issue) => issue.id));

        // let newOders = order.filter((item) => newArray.find((value) => value.id === item)) as any;
        // if (!newOders.includes(newId)) 
        //     newOders.push(newId);
        // newOders.push(newId);
        // console.log({newOders});
        setOrder([...order, newId]);
    }

    // console.log(items);


    const getInstance = useCallback((instance) => {
        refAnimationInstance.current = instance;
    }, []);

    const makeShot = useCallback((particleRatio, opts) => {
        //@ts-ignore
        refAnimationInstance.current && refAnimationInstance.current({
            ...opts,
            origin: { y: 0.7 },
            particleCount: Math.floor(200 * particleRatio)
        });
    }, []);
    
    const fire = useCallback(() => {
        makeShot(0.25, {
          spread: 26,
          startVelocity: 55
        });
    
        makeShot(0.2, {
          spread: 60
        });
    
        makeShot(0.35, {
          spread: 100,
          decay: 0.91,
          scalar: 0.8
        });
    
        makeShot(0.1, {
          spread: 120,
          startVelocity: 25,
          decay: 0.92,
          scalar: 1.2
        });
    
        makeShot(0.1, {
          spread: 120,
          startVelocity: 45
        });
    }, [makeShot]);
    

    useEffect(() => {

    }, []);

    return (
        <Center maxW="md" mx="auto" py={{ base: '4', md: '8' }}>
            <Stack spacing="10" flex="1">
                {/* <Stack spacing="1">
                    <Text fontSize="lg" fontWeight="medium">
                        Add tweets or Reddit posts to generate a Linkedin Carousel
                    </Text>
                    <Text pt={5} color="muted" fontSize="sm">
                        Publish it and get crazy engagement
                    </Text>
                </Stack> */}
                <ListParent values={order} onReorder={setOrder} listStyleType="none">
                    <Stack spacing="3" width="full">
                        {order
                            .map((item) => items.find((value) => value.id === item))
                            .map((issue) =>
                                issue ? (
                                    <Item key={issue.id} issue={issue} deleteItem={deleteItem} />
                                ) : null,
                            )}
                    </Stack>
                </ListParent>
                <Box>
                    <Button
                        leftIcon={<AiOutlinePlusCircle />} 
                        variant="outline"
                        onClick={addItem}
                    >
                        Add new
                    </Button>
                </Box>
                <Center w="100%">
                    <Accordion allowToggle mt={5} maxW="300px" w="100%">
                        <AccordionItem border="0" >
                            <AccordionButton>
                                <Box flex='1' textAlign='left' fontWeight="600">
                                    Advanced Options <Text as="span" fontSize="xs" ml={2} fontWeight="400">(tweets only)</Text>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel pb={4}>
                                <Flex mt={2} w="100%" alignItems="center" justifyContent="space-between">
                                    <Text>Theme</Text>
                                    <Menu>
                                        <MenuButton variant="outline" as={Button} rightIcon={<ChevronDownIcon />}>
                                            {theme}
                                        </MenuButton>
                                        <MenuList>
                                            {
                                                [
                                                    {id: "default"},
                                                    {id: "dim"},
                                                    {id: "lights out"},
                                                    {id: "blue gray"},
                                                    {id: "teal"},
                                                ].map((t) => (
                                                    <MenuItem onClick={(e) => setTheme(t.id)}>{t.id}</MenuItem>
                                                ))
                                            }
                                        </MenuList>
                                    </Menu>
                                </Flex>
                                <Divider my={4} />
                                <Flex w="100%" alignItems="center" justifyContent="space-between">
                                    <Text>Show engagement</Text>
                                    <Switch
                                        colorScheme="gray"  
                                        id="switcher"
                                        isChecked={showEngagement}
                                        onChange={() => setShowEngagement(!showEngagement)}
                                    />
                                </Flex>
                                <Divider my={4} />
                                <Flex w="100%" alignItems="center" justifyContent="space-between">
                                    <Text>Show details (date...)</Text>
                                    <Switch
                                        colorScheme="gray"  
                                        id="switcher"
                                        isChecked={showDetails}
                                        onChange={() => setShowDetails(!showDetails)}
                                    />
                                </Flex>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </Center>
                <Box w="100%">
                    <Button
                        isLoading={isGenerating}
                        // isDisabled={!items.some(x => x.tweetUrl)}
                        w="200px"
                        // mt={10}
                        onClick={generate}
                        colorScheme="linkedin"
                    >
                        Generate Carousel
                    </Button>
                    {
                        isGenerating && (
                            <Text mt={4} fontSize="sm"><i>Can take up to 1 minute to generate</i></Text>
                        )
                    }
                </Box>
                {
                    pdf && (
                        <Flex w="100%" flexDir="column" justifyContent="center" alignItems="center">
                            <Button
                                w="200px"
                                mt={10}
                                as="a"
                                href={pdf}
                                download="carousel.pdf"
                                colorScheme="whatsapp"
                            >
                                Download Carousel
                            </Button>

                            <Text mt={10} fontWeight="600">How to publish your Carousel?</Text>
                            <OrderedList mt={5} textAlign="left">
                                <OrderedListItem>Go on <Link href="https://linkedin.com">linkedin.com</Link></OrderedListItem>
                                <OrderedListItem>Hit "start a post"</OrderedListItem>
                                <OrderedListItem>Look for the "add a document" icon and hit it</OrderedListItem>
                                <OrderedListItem>Name your document and publish it</OrderedListItem>
                                <OrderedListItem>Bonus: Tag @Taplio to be showcased on <Link ml={0} href={url} taget="_blank">taplio.com</Link></OrderedListItem>
                            </OrderedList>

                            {
                                images.length > 0 && (
                                    <Flex flexDir="column" mt={10}>
                                        <Text fontWeight={600}>Or download images independently</Text>
                                        <Grid
                                            mt={5}
                                            templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
                                            gap={{ base: "4", md: "10" }}
                                            mx="0"
                                        >
                                            {
                                                images.map((image, index) => (
                                                    <GridItem key={index} display="flex" flexDir="column" alignItems="center" justifyContent="center" position="relative">
                                                        <Image  w="150px" h="150px" src={image} rounded="lg" objectFit="cover" />
                                                        <Button w="150px" variant="outline" mt={2} size="sm" onClick={() => {saveAs(image, `image${index}.jpg`);}}>Download</Button>
                                                        {/* <Box position="absolute" bottom={10} right={10} >
                                                            <IconButton icon={<Icon as={BiDownload} />} aria-label="download" as="a" href={image} download={image} />
                                                        </Box> */}
                                                    </GridItem>
                                                ))
                                            }
                                        </Grid>
                                    </Flex>
                                )
                            }

                            <Text fontWeight="300" fontSize="xs" mb="3" mt="20">
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
                    )
                }
            </Stack>
            {
                //@ts-ignore
                <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
            }
        </Center>
    );
}
