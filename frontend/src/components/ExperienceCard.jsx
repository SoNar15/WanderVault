import { DeleteIcon } from "@chakra-ui/icons";
import {
	Box,
	Heading,
	HStack,
	IconButton,
	Text,
	useToast,
} from "@chakra-ui/react";
import { useDestinationStore } from "../store/destination";

const ExperienceCard = ({ experience, destinationId }) => {
	const { deleteExperience } = useDestinationStore();
	const toast = useToast();

	const handleDeleteExperience = async (expId) => {
		const { success, message } = await deleteExperience(destinationId, expId);
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
				description: "Experience Deleted",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	return (
		<Box
			shadow="lg"
			rounded="lg"
			overflow="hidden"
			transition="all 0.3s"
			_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
			bg="offwhite"
		>
			<Box p={4}>
				<Heading as="h4" size="md" mb={2}>
					{experience.title}
				</Heading>

				<Text mb={4}>{experience.description}</Text>

				<HStack spacing={2}>
					<IconButton
						icon={<DeleteIcon />}
						onClick={() => handleDeleteExperience(experience._id)}
						colorScheme="red"
					/>
				</HStack>
			</Box>
		</Box>
	);
};

export default ExperienceCard;
