import { Button, Flex, Heading, IconButton, Image, Input, InputGroup, InputLeftElement, InputRightElement, Spinner, Text, useToast } from "@chakra-ui/react";
import { MdAlternateEmail } from "react-icons/md";
import { TbLogin2, TbPassword } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState, ChangeEvent } from "react";
import { useAuth } from "../hooks/useAuth";
import logoTenpo from '../assets/logo_tenpo.png';

const Login = () => {
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const toast = useToast();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [formData, setFormData] = useState<{ correo: string; password: string }>({
        correo: "",
        password: "",
    });
    const [error, setError] = useState<string>("");

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateField = (field: string, value: string, minLength: number, maxLength: number, regex?: RegExp): boolean => {
        if (value.trim() === "") {
            toast({
                title: "Error",
                description: `El campo ${field} es requerido.`,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            setIsLoading(false);
            return false;
        }

        const length = value.trim().length;

        if (length < minLength || length > maxLength) {
            toast({
                title: "Error",
                description: `${field} debe tener entre ${minLength} y ${maxLength} caracteres.`,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            setIsLoading(false);
            return false;
        }

        if (regex && !regex.test(value)) {
            toast({
                title: "Error",
                description: `El campo ${field} no es válido.`,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            setIsLoading(false);
            return false;
        }

        return true;
    };

    const iniciarSesion = async () => {
        setIsLoading(true);
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!validateField("correo electrónico", formData.correo, 6, 100, emailRegex)) return;
        if (!validateField("contraseña", formData.password, 6, 20)) return;

        try {
            const resultado = await login(formData.correo, formData.password);
            setIsLoading(false);

            if (resultado) {
                navigate("/home");
            } else {
                toast({
                    title: "Error",
                    description: "Correo o contraseña incorrectos.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Flex bg="radial-gradient(circle 800px at 50% 500px, #1e1e1e,rgb(26, 97, 48))" w="100%" minH="100vh" h="100%" direction="column" justifyContent="center" align="center">
            <Flex w="90%" h="100%" direction="column" align="center" gap="30px">
                <Flex w="100%" direction="column" align="center" gap="10px">
                <Image src={logoTenpo} alt="Logo" w="200px" h="auto" />
                </ Flex>
                <Flex p={["10px", "10px", "20px"]} w={["100%", "100%", "40%"]} maxW="400px" direction="column" align="center" justifyContent="center" gap="10px" mb="20px" borderRadius="5px" border="1px solid rgba(255, 255, 255, 0.2)"
                    bg="rgba(255, 255, 255, 0.1)" backdropFilter="blur(10px)" boxShadow="0 8px 32px rgba(0, 0, 0, 0.37)">
                    <Heading color="semi_white.100" size="lg">Iniciar sesión</Heading>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <MdAlternateEmail color="#fff" />
                        </InputLeftElement>
                        <Input value={formData.correo} onChange={handleInputChange} type="email" placeholder="Correo electrónico" color="#fff" name="correo" _placeholder={{ color: "semi_white.600" }} />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <TbPassword color="#fff" />
                        </InputLeftElement>
                        <Input
                            value={formData.password} onChange={handleInputChange}
                            type={showPassword ? "text" : "password"}
                            placeholder="***********"
                            color="#fff"
                            name="password"
                            _placeholder={{ color: "semi_white.600" }}
                        />
                        <InputRightElement>
                            <IconButton
                                bg="transparent"
                                _hover={{ bg: "transparent" }}
                                _active={{ bg: "transparent" }}
                                color="semi_white.600"
                                size="sm"
                                onClick={() => setShowPassword((prev) => !prev)}
                                icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                                aria-label="Toggle password visibility"
                            />
                        </InputRightElement>
                    </InputGroup>
                    <Button mt="5px" bg="primary.100" color="#1e1e1e" w="100%"
                        leftIcon={isLoading ? <Spinner size="sm" color="white" /> : <TbLogin2 />}
                        fontWeight="bold"
                        _hover={{ bg: "primary.200", color: "semi_white.200" }}
                        _active={{ bg: "#1e1e1e", color: "primary.100" }}
                        onClick={iniciarSesion}
                    >
                        {isLoading ? "" : "Iniciar sesión"}
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Login;