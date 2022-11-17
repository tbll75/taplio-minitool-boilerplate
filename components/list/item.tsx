import { useState, useEffect } from "react";
import {
    Flex,
    Center,
    chakra,
    IconButton,
    Icon,
    Input,
    Checkbox,
} from "@chakra-ui/react";

import { Reorder } from 'framer-motion';
import { FiTrash2 } from "react-icons/fi";
import { MdDragIndicator } from "react-icons/md";
import toast from "react-hot-toast";

const ListItem = chakra(Reorder.Item);

export function Item({issue, deleteItem}) {

    const [isTweet, setIsTweet] = useState(false);
    const [isThread, setIsThread] = useState(false);

    return (
        <ListItem
            key={issue.id}
            value={issue.id}
            // bg="bg-surface"
            bg="white"
            p="4"
            boxShadow={'sm'}
            position="relative"
            borderRadius="lg"
            cursor="grab"
            whileTap={{ cursor: 'grabbing', scale: 1.1 }}
        >
            <Flex >
                {/* <Text fontSize="sm" fontWeight="medium" color="emphasized">
                    {issue.title}
                </Text>
                <HStack justify="space-between">
                    <Badge colorScheme={issue.type === 'Feature' ? 'green' : 'red'} size="sm">
                        {issue.type}
                    </Badge>
                    <HStack spacing="3">
                        <Text fontSize="xs" color="subtle" fontWeight="medium">
                            CHA-{issue.id}
                        </Text>
                        <Avatar
                            src={issue.author.avatarUrl}
                            name={issue.author.name}
                            boxSize="6"
                        />
                    </HStack>
                </HStack> */}
                <Center mr={2}>
                    <Icon as={MdDragIndicator} fontSize="1.6rem" color="gray.400" />
                </Center>
                {/* <HiMenu fontSize="2rem" color="gray.400" /> */}
                <Input 
                    placeholder="tweet, reddit post or image url"
                    onChange={(e) => {
                        issue.tweetUrl = e.target.value;
                        if (e.target.value?.includes("gif")) {
                            toast.error("GIFs are not supported");
                        }
                        else if (e.target.value?.includes("mp4")) {
                            toast.error("Videos are not supported");
                        }

                        if (e.target.value?.includes("twitter.com" && "status")) {
                            setIsTweet(true);
                        }
                    }}  
                />
                <IconButton
                    ml={2}
                    color="gray.400"
                    icon={<FiTrash2 fontSize="1.25rem" />}
                    variant="ghost"
                    aria-label="Delete member"
                    onClick={() => deleteItem(issue.id)}
                />
            </Flex>
            {
                isTweet && (
                    <Flex w="100%" pl={10} mt={3}>
                        <Checkbox
                            fontWeight="medium"
                            size="sm"
                            isChecked={isThread}
                            onChange={(e) => {
                                setIsThread(!isThread);
                                issue.isThread = !isThread;
                            }}
                        >
                            is thread?
                        </Checkbox>
                    </Flex>
                )
            }
        </ListItem>
    );
}
