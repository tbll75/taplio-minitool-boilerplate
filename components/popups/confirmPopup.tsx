import {
    Box,
    Center,
    Stack,
    Text,
    Link,
} from "@chakra-ui/layout";
import {
    Switch,
    useColorModeValue as mode,
    Tooltip,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalBody,
    ModalContent,
    FormControl,
    Input,
    ModalCloseButton,
    FormLabel,
    ModalFooter,
    Img,
    Button,
} from "@chakra-ui/react";
import React, { useEffect, memo } from "react";
import { signIn, useSession, signOut } from "next-auth/react";

export const ConfirmPopup = ({ isOpen, onClose, title, body, callback, placeholder,
    cta="Confirm",
    ctaProps={},
}) => {

    const initialRef = React.useRef<HTMLInputElement>(null);
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = React.useState(false);
    const [text, setText] = React.useState("");

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            closeOnOverlayClick={false}
            //@ts-ignore
            initialFocusRef={initialRef}
            size="md"
        >
            <ModalOverlay />
            <ModalContent color="black">
                <ModalHeader>
                    <Box display="flex" justifyContent="space-between">
                        <Text>{title}</Text>
                    </Box>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody >
                    {
                        Array.isArray(body) ? (
                            body.map((item, index) => (
                                <Text key={index} mb={4}>
                                    {item}
                                </Text>
                            ))
                        ) : (
                            body
                        )
                    }
                    <Input placeholder={placeholder} mt={2} onChange={(e) => {setText(e.target.value)}} /> 
                </ModalBody>

                <ModalFooter p={3}>
                    {/* <Button onClick={skipPopup} mr={3}>Skip</Button> */}
                    <Button 
                        isLoading={isLoading}
                        onClick={async () => {
                            setIsLoading(true);
                            callback && await callback(text);
                            onClose();
                            setIsLoading(false);
                        }}
                        colorScheme="blue" 
                        {...ctaProps}
                    >
                        {cta}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
