import { Center, Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import DestinationCard from "../components/DestinationCard";
import { useDestinationStore } from "../store/destination";


const HomePage = () => {
	const { fetchDestinations, destinations } = useDestinationStore();

	useEffect(() => {
		fetchDestinations();
	}, [fetchDestinations]);
	console.log("destinations", destinations);

	return (
		<Container maxW='container.xl' py={12}>
			<VStack spacing={8}>
				<Text
					fontSize={"30"}
					fontWeight={"bold"}
					bgGradient={"linear(to-r, cyan.400, blue.500)"}
					bgClip={"text"}
					textAlign={"center"}
				>
					Current Destinations 🚀
				</Text>

				<SimpleGrid
					columns={{
						base: 1,
						md: 2,
						lg: 3,
					}}
					spacing={10}
					w={"full"}
				>
					{destinations.map((destination) => (
						<DestinationCard key={destination._id} destination={destination} />
					))}
				</SimpleGrid>

				{destinations.length === 0 && (
					<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
						No destinations found 😢{" "}
						<Link to={"/add"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Add a Destination
							</Text>
						</Link>
					</Text>
				)}
			</VStack>
		</Container>
	);
};
export default HomePage;