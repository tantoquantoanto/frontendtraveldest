import { useState } from "react";

export const useSingleDestination = () => {
    const [singleDestination, setSingleDestination] = useState(null);
    const token = localStorage.getItem("Authorization");
    const headers = token ? { Authorizazion : `Bearer ${token}`} : {};
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const getSingleDestination = async (destinationId) => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/destinations/${destinationId}`,
                {token}
            );
            if (!response.ok) {
                console.log("Sorry, something went wrong with fetching the singleDestination")
            }
            const data = await response.json();
            setSingleDestination(data.destination)

        } catch (error) {
            console.error("Error fetching single destination:", error);
            setError(True);
        } finally {
            setLoading(false);
        }
    };
    return {singleDestination, setSingleDestination, error, loading, setLoading, setError, getSingleDestination};
}