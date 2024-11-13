import { useState, useEffect } from "react";
import useSession from "./useSession";

export const useAllDestinations = () => {
    const [allDestinations, setAllDestinations] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    

    const token = localStorage.getItem("Authorization");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const getAllDestinationsFromApi = async () => {
        setLoading(true);
        setError(null); 
        try {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/destinations?page=${page}&pageSize=${pageSize}`,
                { headers }
            );

            if (!response.ok) {
                throw new Error("Sorry, something went wrong");
            }

            const data = await response.json();
            setAllDestinations(data.destinations);
            setTotalPages(data.totalPages)
        } catch (error) {
            setError(error.message || "Failed to fetch destinations");
        } finally {
            setLoading(false);
        }
    };

    
    useEffect(() => {
        getAllDestinationsFromApi();
    }, [page, pageSize, token]);

    

    
    return {
        allDestinations,
        setAllDestinations,
        page,
        setPage,
        pageSize,
        setPageSize,
        loading,
        error,
        totalPages,
        getAllDestinationsFromApi,
    };
};
