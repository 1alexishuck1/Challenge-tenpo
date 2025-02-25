import { Flex, Box, Spacer, IconButton, Image } from "@chakra-ui/react";
import { TbLogin } from "react-icons/tb";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logoTenpo from '../assets/logo_tenpo.png';

const Header: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Flex position={"fixed"} top="0" zIndex="1" bg="#1e1e1e" w="100%" h="70px" align="center" direction="row" p={4}>
      <Box>
        <Image src={logoTenpo} alt="Logo" w="125px" h="auto" />
      </Box>
      <Spacer />
      <Box>
        <IconButton
          icon={<TbLogin />}
          aria-label="Cerrar sesión"
          bg="red.400"
          color="semi_white.100"
          fontSize="24px"
          transform="rotate(180deg)"
          _hover={{
            bg: "red.400",
            color: "semi_white.200",
          }}
          _active={{
            bg: "semi_white.100",
            color: "red.400",
          }}
          onClick={handleLogout}
        />
      </Box>
    </Flex>
  );
};

export default Header;
