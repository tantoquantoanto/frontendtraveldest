import { useEffect, useState } from "react";
import { Container, Row, Spinner, Alert, Button } from "react-bootstrap";
import UserCard from "./UserCard";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { useNavigate } from "react-router-dom";
import useSession from "../../hooks/useSession";

const HomeMain = () => {
  const [usersData, setUsersData] = useState([]);
  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const [isUsersError, setIsUsersError] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const session = useSession();
  const token = session ? session.token : null;
  const getUsersFromApi = async () => {
    setIsUsersLoading(true);
    try {
      const response = await fetch(
       `${import.meta.env.VITE_SERVER_BASE_URL}/users?page=${page}&pageSize=${pageSize}`, 
  {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }
      );
      const data = await response.json();
      setUsersData(data.users);
      setTotalPages(data.totalPages);
    } catch (error) {
      setIsUsersError(true);
    } finally {
      setIsUsersLoading(false);
    }
  };

  useEffect(() => {
    getUsersFromApi();
  }, [page, pageSize]);

  return (
    <>
      <Container className="py-4">
        {isUsersLoading && (
          <Row className="justify-content-center">
            <Spinner animation="border" />
          </Row>
        )}

        {isUsersError && (
          <Alert variant="danger">
            Something went wrong while fetching the users.
          </Alert>
        )}

        <Row>
          {!isUsersLoading &&
            !isUsersError &&
            usersData.map((userData) => (
              <UserCard
                key={userData._id}
                img={userData.img}
                name={userData.name}
                surname={userData.surname}
                email={userData.email}
                gender={userData.gender}
                id={userData._id}
              />
            ))}
          <Button
            variant="primary"
            onClick={() => navigate("/create-new-users")}
          >
            INSERT NEW USER
          </Button>
        </Row>

        {/* Pagination */}
        <Row className="mt-4 justify-content-center">
          <ResponsivePagination
            current={page}
            total={totalPages}
            onPageChange={setPage}
          />
        </Row>
      </Container>
    </>
  );
};

export default HomeMain;
