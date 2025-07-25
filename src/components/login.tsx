import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Box, Button, Input, Text, VStack, chakra, Field, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { CustomLink } from "./customLink";

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();

  const navigate = useNavigate();
  const [form, setForm] = useState<LoginFormInputs>({ email: "", password: "" });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await axios.post("http://localhost:5000/login", data);

      const token = response.data.access_token;
      const role = response.data.role?.toLowerCase();
      const name = response.data.name;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("name", name);
      localStorage.setItem("email", response.data.email);

      toast.success("Login successful!");

      if (role === "farmer") {
        navigate("/farmer");
      } else if (role === "distributor") {
        navigate("/distributor");
      } else if (role === "retailer") {
        navigate("/retailer");
      } else {
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minH="100vh" background={"#E4E4E4"}>
      <Box
        h={"100vh"}
        w={"100%"}
        display={"flex"}
        justifyContent={"center"}
        p={"5rem"}
        bg="rgba(189, 189, 189, 0.3)"
        backdropFilter="blur(10px)"
      >
        <Box h={"100%"} w={"60%"} alignContent={"center"}>
          <Image
            h={"100%"}
            w={"100%"}
            style={{ borderTopLeftRadius: "20px", borderBottomLeftRadius: "20px" }}
            src="login.jpg"
            fit={"cover"}
            alt="login img"
          />
        </Box>
        <chakra.form
          onSubmit={handleSubmit(onSubmit)}
          width="40%"
          p="3rem"
          background={"#ffffffff"}
          border="1px solid rgba(136, 134, 134, 0.2)"
          borderRightRadius="15px"
          backdropFilter="blur(10px)"
          alignContent={"center"}
        >
          <VStack gap={4} align="stretch">
            <Text fontWeight="bold" fontSize={"3rem"} color={"black"}>
              Sign In
            </Text>
            <Text fontSize={"1rem"} color={"black"}>
              Please sign in to access FoodChain
            </Text>

            <Field.Root color={"black"}>
              <Field.Label>Email</Field.Label>
              <Input
                placeholder="email"
                _placeholder={{ color: "#6a6c6d" }}
                {...register("email", {
                  required: " ",
                })}
              />
            </Field.Root>

            <Field.Root color={"black"}>
              <Field.Label>Password</Field.Label>
              <Input
                type="password"
                placeholder="password"
                _placeholder={{ color: "#6a6c6d" }}
                {...register("password", {
                  required: " ",
                  minLength: { value: 4, message: "Minimum length should be 8" },
                })}
              />
            </Field.Root>

            {errors.email && (
              <Text color="red.500" fontSize="sm">
                {errors.email.message}
              </Text>
            )}

            <Button
              mt={2}
              colorScheme="teal"
              loading={isSubmitting}
              borderRadius={"10px"}
              fontSize={"1rem"}
              fontWeight={"bold"}
              type="submit"
              background={"#8A8A8A"}
            >
              Sign In
            </Button>

            <Text textAlign={"center"} mt={"2rem"} fontSize={"1rem"} color={"black"} fontWeight={"medium"}>
              <CustomLink to="/register" color="black">
                New to FoodChain? Sign Up
              </CustomLink>
            </Text>
          </VStack>
        </chakra.form>
      </Box>
    </Box>
  );
};

export default Login;
