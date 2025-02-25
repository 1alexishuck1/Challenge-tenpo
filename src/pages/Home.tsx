import { useEffect, useState } from 'react';
import { Box, Button, Divider, Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import UserCard from '../components/UserCard';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

interface User {
  name: {
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
  };
}

const Home = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalUsers, setTotalUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://randomuser.me/api/?results=50&page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUsers(response.data.results);
        setTotalUsers((prev) => [...prev, ...response.data.results]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, token, navigate]);

  const nextPage = () => {
    setPage((prev) => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <Flex
      bg="radial-gradient(circle 500px at 50% 200px, #3e3e3e, transparent)"
      w="100%"
      h="100%"
      direction="column"
      justifyContent="center"
      align="center"
      mt="70px"
    >
      <Header />

      <Flex w="90%" direction="column" gap="15px" mt="10px" mb="30px">
        {loading ? (
          <Flex
            w="100%"
            h="100vh"
            justify="center"
            align="center"
          >
            <Spinner color="white" size="lg" />
          </Flex>
        ) : (
          <>
            <Text fontSize="2xl" fontWeight="bold">Generador random de personas</Text>
            <Flex w="100%" justify="space-around" wrap="wrap" gap="20px">
              {users.map((user, index) => (
                <UserCard
                  key={index}
                  name={`${user.name.first} ${user.name.last}`}
                  email={user.email}
                  picture={user.picture.large}
                />
              ))}
            </Flex>
          </>
        )}

        {!loading && (
          <Flex justify="space-between" w="100%" mt="20px" align="center">
            <Button 
                onClick={prevPage} 
                isDisabled={page === 1} 
                bg="primary.100" 
                color="#1e1e1e"
                leftIcon={<AiOutlineArrowLeft />}
            >
                Anterior
            </Button>
            
            <Text fontSize="lg" color="white">{page}</Text>
            
            <Button 
                onClick={nextPage} 
                bg="primary.100" 
                color="#1e1e1e"
                rightIcon={<AiOutlineArrowRight />}
            >
                Siguiente
            </Button>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default Home;
