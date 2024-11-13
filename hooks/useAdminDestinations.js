import { useState, useEffect } from 'react';
import useSession from './useSession';

export const useAdminDestinations = (page = 1, pageSize = 12) => {
  const [destinations, setDestinations] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const session = useSession();
  const [adminPage, setAdminPage] = useState(1)

  useEffect(() => {
    const fetchDestinations = async () => {
      if (session?.role !== 'admin') return; // Solo per admin

      try {
        setLoading(true);
        const response = await fetch(`/destinations?page=${adminPage}&pageSize=${pageSize}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("Authorization")}` },
        });
        if (!response.ok) throw new Error('Errore nel caricamento delle destinazioni');

        const data = await response.json();
        setDestinations(data.destinations);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError(err.message || 'Errore durante il caricamento delle destinazioni');
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, [page, pageSize, session]);

  return { destinations, totalPages, loading, error };
};
