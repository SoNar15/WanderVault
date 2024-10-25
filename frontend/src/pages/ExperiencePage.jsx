import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Container,
    Heading,
    SimpleGrid,
    VStack,
    Input,
    Text,
    useToast
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useDestinationStore } from "../store/destination"; // Ensure this store is properly set up
import ExperienceCard from "../components/experienceCard";

const ExperiencePage = () => {
    const { id } = useParams(); // Get the destination ID from the URL
    const { fetchExperiences, addExperience } = useDestinationStore(); // Fetch and add experiences
    const [newExperience, setNewExperience] = useState({ title: "", description: "" });
    const [experiences, setExperiences] = useState([]);
    const toast = useToast();

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchExperiences(id); // Fetch experiences based on the ID
            setExperiences(data); // Store experiences in state
        };
        fetchData();
    }, [fetchExperiences, id]);

    const handleAddExperience = async () => {
        const response = await addExperience(id, newExperience); // Add a new experience
        if (response.success) {
            toast({
                title: "Experience Added",
                description: response.message,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setNewExperience({ title: "", description: "" }); // Reset the form
        } else {
            toast({
                title: "Error",
                description: response.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box
            bg="linear-gradient(79deg, #7439db, #C66FBC 48%, #F7944D)"
            py={12}
        >
            <Container maxW="container.xl">
                <VStack spacing={8}>
                    <Heading fontSize="2xl" color="white">
                        Experiences for Destination
                    </Heading>

                    {/* Experience Form */}
                    <Box w="full" bg="white" p={5} rounded="lg" boxShadow="lg">
                        <VStack spacing={4} align="start">
                            <Input
                                placeholder="Title"
                                value={newExperience.title}
                                onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
                            />
                            <Input
                                placeholder="Description"
                                value={newExperience.description}
                                onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                            />
                            <Button colorScheme="blue" onClick={handleAddExperience}>
                                Add Experience
                            </Button>
                        </VStack>
                    </Box>

                    {/* Display Experiences */}
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} w="full">
                        {experiences.map((experience) => (
                            <ExperienceCard key={experience._id} experience={experience} />
                        ))}
                    </SimpleGrid>

                    {/* No Experiences Message */}
                    {experiences.length === 0 && (
                        <Text fontSize="xl" textAlign="center" fontWeight="bold" color="white">
                            No experiences found 😢
                        </Text>
                    )}
                </VStack>
            </Container>
        </Box>
    );
};

export default ExperiencePage;
