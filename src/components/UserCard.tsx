// components/UserCard.tsx
import { Box, Flex, Image, Text, VStack } from '@chakra-ui/react';

interface UserCardProps {
  name: string;
  email: string;
  picture: string;
}

const UserCard = ({ name, email, picture }: UserCardProps) => {
  return (
    <Flex w="100%" maxW="400px" direction="column" align="center" bg="rgba(255, 255, 255, 0.1)" borderRadius="10px" p="20px">
      <Image
        src={picture}
        alt={name}
        borderRadius="full"
        boxSize="150px"
        mb="10px"
      />
      <VStack spacing="5px">
        <Text fontSize="xl" fontWeight="bold" color="#f7f7f7">
          {name}
        </Text>
        <Text fontSize="md" color="gray.100">
          {email}
        </Text>
      </VStack>
    </Flex>
  );
};

export default UserCard;
