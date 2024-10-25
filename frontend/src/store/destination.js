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

	fetchExperiences: async (destinationId) => {
        const res = await fetch(`/api/destinations/${destinationId}/experiences`);
        const data = await res.json();
        set((state) => ({
            destinations: state.destinations.map((destination) =>
                destination._id === destinationId ? { ...destination, experiences: data.data } : destination
            ),
        }));
    },

    // Add a new experience to a specific destination
    addExperience: async (destinationId, newExperience) => {
        if (!newExperience.title || !newExperience.description) {
            return { success: false, message: "Please fill in all fields." };
        }
        const res = await fetch(`/api/destinations/${destinationId}/experiences`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newExperience),
        });
        const data = await res.json();
        set((state) => ({
            destinations: state.destinations.map((destination) =>
                destination._id === destinationId
                    ? { ...destination, experiences: [...destination.experiences, data.data.experiences] }
                    : destination
            ),
        }));
        return { success: true, message: "Experience added successfully" };
    },

    // Delete an experience from a destination
    deleteExperience: async (destinationId, expId) => {
        const res = await fetch(`/api/destinations/${destinationId}/experiences/${expId}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        set((state) => ({
            destinations: state.destinations.map((destination) =>
                destination._id === destinationId
                    ? { ...destination, experiences: destination.experiences.filter((exp) => exp._id !== expId) }
                    : destination
            ),
        }));
        return { success: true, message: "Experience deleted successfully" };
    },
}));