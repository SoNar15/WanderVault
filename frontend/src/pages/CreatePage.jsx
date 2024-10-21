import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useDestinationStore } from "../store/destination";


const CreatePage = () => {
	const [newDestination, setNewDestination] = useState({
		name: "",
		description: "",
		image: "",
	});
	const toast = useToast();

	const { addDestination } = useDestinationStore();

	const handleAddDestination = async () => {
		const { success, message } = await addDestination(newDestination);
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				isClosable: true,
			});
		}
		setNewDestination({ name: "", description: "", image: "" });
	};

	return (
		<Container maxW={"container.sm"}>
			<VStack spacing={8}>
				<Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
					Add New Destination
				</Heading>

				<Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
					<VStack spacing={4}>
						<Input
							placeholder='Destination Name'
							name='name'
							value={newDestination.name}
							onChange={(e) => setNewDestination({ ...newDestination, name: e.target.value })}
						/>
						<Input
							placeholder='Description'
							name='description'
							value={newDestination.description}
							onChange={(e) => setNewDestination({ ...newDestination, description: e.target.value })}
						/>
						<Input
							placeholder='Image URL'
							name='image'
							value={newDestination.image}
							onChange={(e) => setNewDestination({ ...newDestination, image: e.target.value })}
						/>

						<Button colorScheme='blue' onClick={handleAddDestination} w='full'>
							Add Destination
						</Button>
					</VStack>
				</Box>
			</VStack>
		</Container>
	);
};
export default CreatePage;