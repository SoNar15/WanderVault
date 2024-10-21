import { create } from "zustand";


export const useDestinationStore = create((set) => ({
	destinations: [],
	setDestinations: (destinations) => set({ destinations }),
	
	addDestination: async (newDestination) => {
		if (!newDestination.name || !newDestination.image || !newDestination.description) {
			return { success: false, message: "Please fill in all fields." };
		}
		const res = await fetch("/api/destinations", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newDestination),
		});
		const data = await res.json(); 
		// Extrating data
		
		set((state) => ({ destinations: [...state.destinations, data.data] }));
		return { success: true, message: "Destination added successfully" };
	},
	fetchDestinations: async () => {
		const res = await fetch("/api/destinations");
		const data = await res.json();
		set({ destinations: data.data });
	},
	deleteDestination: async (pid) => {
		const res = await fetch(`/api/destinations/${pid}`, {
			method: "DELETE",
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({ destinations: state.destinations.filter((destination) => destination._id !== pid) }));
		return { success: true, message: data.message };
	},
	updateDestination: async (pid, updatedDestination) => {
		const res = await fetch(`/api/destinations/${pid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedDestination),
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({
			destinations: state.destinations.map((destination) => (destination._id === pid ? data.data : destination)),
		}));

		return { success: true, message: data.message };
	},
}));