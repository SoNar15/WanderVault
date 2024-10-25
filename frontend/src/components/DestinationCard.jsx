import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Heading,
    HStack,
    IconButton,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useColorModeValue,
    useDisclosure,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDestinationStore } from "../store/destination";
import { useNavigate } from "react-router-dom"; 
const DestinationCard = ({ destination }) => {
    const [updatedDestination, setUpdatedDestination] = useState(destination);
    const [newExperience, setNewExperience] = useState({ title: "", description: "" });
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const { deleteDestination, updateDestination, addExperience } = useDestinationStore();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isExpOpen, onOpen: onExpOpen, onClose: onExpClose } = useDisclosure();
    
    const navigate = useNavigate(); // Initialize useNavigate

    // Handle delete destination
    const handleDeleteDestination = async (pid) => {
        const { success, message } = await deleteDestination(pid);
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Success",
                description: "Destination Deleted",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleUpdateDestination = async (pid, updatedDestination) => {
        const { success, message } = await updateDestination(pid, updatedDestination);
        onClose();
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Success",
                description: "Destination updated successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    // Handle add experience
    const handleAddExperience = async (destinationId, newExperience) => {
        const { success, message } = await addExperience(destinationId, newExperience);
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } else {
            setNewExperience({ title: "", description: "" });
            onExpClose();
            toast({
                title: "Success",
                description: "Experience added successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    // New function to handle redirect to ExperiencePage
    const handleNavigateToExperiences = () => {
		navigate(`/${destination._id}/experiences`);
	};
	

    return (
        <Box
            shadow="lg"
            rounded="lg"
            overflow="hidden"
            transition="all 0.3s"
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            bg={bg}
        >
            {/* Make the image clickable */}
            <Box 
                onClick={handleNavigateToExperiences} 
                cursor="pointer" 
                role="button" 
                tabIndex={0}
            >
                <Image 
                    src={destination.image}  // Assuming destination.image contains the image URL
                    alt={destination.name}  // Descriptive alt text
                    h={48}  // Adjust height as needed
                    w="full"  // Make the image span the full width
                    objectFit="cover"  // Ensure it maintains aspect ratio
                />
        </Box>

            <Box p={4}>
                <Heading as="h3" size="md" mb={2}>
                    {destination.name}
                </Heading>

                <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
                    {destination.description}
                </Text>

                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue" />
                    <IconButton
                        icon={<DeleteIcon />}
                        onClick={() => handleDeleteDestination(destination._id)}
                        colorScheme="red"
                    />
                    <Button onClick={onExpOpen} colorScheme="green">
                        Add Experience
                    </Button>
                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Destination</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder="Destination Name"
                                name="name"
                                value={updatedDestination.name}
                                onChange={(e) =>
                                    setUpdatedDestination({ ...updatedDestination, name: e.target.value })
                                }
                            />
                            <Input
                                placeholder="Description"
                                name="description"
                                value={updatedDestination.description}
                                onChange={(e) =>
                                    setUpdatedDestination({ ...updatedDestination, description: e.target.value })
                                }
                            />
                            <Input
                                placeholder="Image URL"
                                name="image"
                                value={updatedDestination.image}
                                onChange={(e) =>
                                    setUpdatedDestination({ ...updatedDestination, image: e.target.value })
                                }
                            />
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={() => handleUpdateDestination(destination._id, updatedDestination)}
                        >
                            Update
                        </Button>
                        <Button variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Modal for Adding Experience */}
            <Modal isOpen={isExpOpen} onClose={onExpClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Experience</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder="Experience Title"
                                name="title"
                                value={newExperience.title}
                                onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
                            />
                            <Input
                                placeholder="Experience Description"
                                name="description"
                                value={newExperience.description}
                                onChange={(e) =>
                                    setNewExperience({ ...newExperience, description: e.target.value })
                                }
                            />
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="green"
                            mr={3}
                            onClick={() => handleAddExperience(destination._id, newExperience)}
                        >
                            Add
                        </Button>
                        <Button variant="ghost" onClick={onExpClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default DestinationCard;
