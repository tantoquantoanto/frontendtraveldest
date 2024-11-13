import { useState, useEffect } from "react";
import useSession from "./useSession";

export const useNotApprovedDestinations = () => {
    const [notApprovedDestinations, setNotApprovedDestinations] = useState([]);
    const [notApprovedPage, setNotApprovedPage] = useState(1);
    const [notApprovedPageSize, setNotApprovedPageSize] = useState(12);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalNotApprovedPages, setTotalNotApprovedPages] = useState(1);
    

    const token = localStorage.getItem("Authorization");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const getNotApprovedDestinationsFromApi = async () => {
        setLoading(true);
        setError(null); 
        try {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/destinations/notapproved/?page=${notApprovedPage}&pageSize=${notApprovedPageSize}`,
                { headers }
            );

            if (!response.ok) {
                throw new Error("Sorry, something went wrong");
            }

            const data = await response.json();
            setNotApprovedDestinations(data.destinations);
            setTotalNotApprovedPages(data.totalPages)
        } catch (error) {
            setError(error.message || "Failed to fetch destinations");
        } finally {
            setLoading(false);
        }
    };

    
    useEffect(() => {
        getNotApprovedDestinationsFromApi();
    }, [notApprovedPage, notApprovedPageSize, token]);

    const resetNotApprovedDestinations = () => setNotApprovedDestinations([]);

    const searchNotApprovedDestinationsByName = async (name) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/destinations/name/${name}?page=${notApprovedPage}&pageSize=${notApprovedPageSize}`,
                { headers }
            );
    
            if (!response.ok) {
                throw new Error("Sorry, something went wrong while fetching destinations");
            }
    
            const data = await response.json();
    
            if (data && data.destinations.length > 0) {
                setNotApprovedDestinations(data.destinations);
                setTotalNotApprovedPages(data.totalPages);
            } else {
                setNotApprovedDestinations([]); 
                setTotalNotApprovedPages(1);    
                console.log("No destinations found with the given name");
            }
        } catch (error) {
            console.error("Failed to fetch destinations:", error.message || error);
        }
    };
    


    
    return {
        notApprovedDestinations,
        setNotApprovedDestinations,
        notApprovedPage,
        setNotApprovedPage,
        notApprovedPageSize,
        setNotApprovedPageSize,
        loading,
        error,
        totalNotApprovedPages,
        searchNotApprovedDestinationsByName,
        resetNotApprovedDestinations,
        getNotApprovedDestinationsFromApi
    };
};
