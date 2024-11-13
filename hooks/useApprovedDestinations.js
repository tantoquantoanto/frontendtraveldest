import { useState, useEffect } from "react";
import useSession from "./useSession";

export const useApprovedDestinations = () => {
    const [approvedDestinations, setApprovedDestinations] = useState([]);
    const [approvedPage, setApprovedPage] = useState(1);
    const [approvedPageSize, setApprovedPageSize] = useState(12);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalApprovedPages, setTotalApprovedPages] = useState(1);
    

    const token = localStorage.getItem("Authorization");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const getApprovedDestinationsFromApi = async () => {
        setLoading(true);
        setError(null); 
        try {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/destinations?page=${approvedPage}&pageSize=${approvedPageSize}`,
                { headers }
            );

            if (!response.ok) {
                throw new Error("Sorry, something went wrong");
            }

            const data = await response.json();
            setApprovedDestinations(data.destinations);
            setTotalApprovedPages(data.totalPages)
        } catch (error) {
            setError(error.message || "Failed to fetch destinations");
        } finally {
            setLoading(false);
        }
    };

    
    useEffect(() => {
        getApprovedDestinationsFromApi();
    }, [approvedPage, approvedPageSize, token]);


    const resetApprovedDestinations = () => setApprovedDestinations([]);

    const searchApprovedDestinationsByName = async (name) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/destinations/name/${name}?page=${approvedPage}&pageSize=${approvedPageSize}`,
                { headers }
            );
    
            if (!response.ok) {
                throw new Error("Sorry, something went wrong while fetching destinations");
            }
    
            const data = await response.json();
    
            if (data && data.destinations.length > 0) {
                setApprovedDestinations(data.destinations);
                setTotalApprovedPages(data.totalPages);
            } else {
                setApprovedDestinations([]); 
                setTotalApprovedPages(1);    
                console.log("No destinations found with the given name");
            }
        } catch (error) {
            console.error("Failed to fetch destinations:", error.message || error);
        }
    };
    

    
    return {
        approvedDestinations,
        setApprovedDestinations,
        approvedPage,
        setApprovedPage,
        approvedPageSize,
        setApprovedPageSize,
        loading,
        error,
        totalApprovedPages,
        searchApprovedDestinationsByName,
        resetApprovedDestinations
    };
};
