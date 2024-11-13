import { useState } from "react";
import { useSingleDestination } from "./useSingleDestination";

export const useUpdateDestination = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { getSingleDestination } = useSingleDestination(); // Assumendo che getSingleDestination esista in useSingleDestination

    const updateSingleDestination = async (destinationId, updatedData) => {
        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem("Authorization");

            const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/destinations/update/${destinationId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(updatedData)
            });

            if (!response.ok) {
                throw new Error("Failed to update destination");
            }

            const data = await response.json();

            await getSingleDestination(destinationId); // Aggiorna i dettagli della destinazione
            return data.destination;

        } catch (error) {
            console.error("Update failed:", error);
            setError(error.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { updateSingleDestination, loading, error };
};
