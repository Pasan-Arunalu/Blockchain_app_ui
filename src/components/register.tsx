import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  chakra,
  Link,
  Field,
  Image,
  Portal,
  Select,
  createListCollection,
} from "@chakra-ui/react";

type RegisterFormInputs = {
  name: string;
  role: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const roles = createListCollection({
  items: [
    { label: "Farmer", value: "farmer" },
    { label: "Distributor", value: "distributor" },
    { label: "Retailer", value: "retailer" },
  ],
});

const Register = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>();

  const password = watch("password");
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      // Send request to backend
      await axios.post("http://localhost:5000/register", {
        name: data.name,
        role: data.role,
        email: data.email,
        password: data.password,
      });

      toast.success("Account created successfully! Please login.");
      navigate("/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minH="100vh" background="#E4E4E4">
      <Box
        h="100vh"
        w="100%"
        display="flex"
        justifyContent="center"
        p="5rem"
        bg="rgba(189, 189, 189, 0.3)"
        backdropFilter="blur(10px)"
      >
        {/* Left Side Image */}
        <Box h="100%" w="60%" alignContent="center">
          <Image
            h="100%"
            w="100%"
            style={{ borderTopLeftRadius: "20px", borderBottomLeftRadius: "20px" }}
            src="login.jpg"
            fit="cover"
            alt="register img"
          />
        </Box>

        {/* Right Side Form */}
        <chakra.form
          onSubmit={handleSubmit(onSubmit)}
          width="40%"
          p="3rem"
          background="#fff"
          border="1px solid rgba(136, 134, 134, 0.2)"
          borderRightRadius="15px"
          backdropFilter="blur(10px)"
          alignContent="center"
        >
          <VStack gap={4} align="stretch">
            <Text fontWeight="bold" fontSize="3rem" color="black">
              Sign Up
            </Text>
            <Text fontSize="1rem" color="black">
              Please fill the form below to create an account
            </Text>

            {/* Name */}
            <Field.Root color="black">
              <Field.Label>Name</Field.Label>
              <Input
                placeholder="name"
                _placeholder={{ color: "#6a6c6d" }}
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <Text color="red.500">{errors.name.message}</Text>}
            </Field.Root>

            {/* Role Dropdown */}
            <Controller
              name="role"
              control={control}
              rules={{ required: "Role is required" }}
              render={({ field }) => (
                <Select.Root
                  collection={roles}
                  value={field.value ? [field.value] : []} 
                  onValueChange={(details) => field.onChange(details.value[0])}
                >
                  <Select.HiddenSelect />
                  <Select.Label color="black">Select a role</Select.Label>
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder="Select a role" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {roles.items.map((role) => (
                          <Select.Item key={role.value} item={role}>
                            {role.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              )}
            />

            {errors.role && <Text color="red.500">{errors.role.message}</Text>}

            {/* Email */}
            <Field.Root color="black">
              <Field.Label>Email</Field.Label>
              <Input
                placeholder="email"
                _placeholder={{ color: "#6a6c6d" }}
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
                })}
              />
              {errors.email && <Text color="red.500">{errors.email.message}</Text>}
            </Field.Root>

            {/* Password */}
            <Field.Root color="black">
              <Field.Label>Password</Field.Label>
              <Input
                type="password"
                placeholder="password"
                _placeholder={{ color: "#6a6c6d" }}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Minimum length is 8 characters" },
                })}
              />
              {errors.password && <Text color="red.500">{errors.password.message}</Text>}
            </Field.Root>

            {/* Confirm Password */}
            <Field.Root color="black">
              <Field.Label>Confirm Password</Field.Label>
              <Input
                type="password"
                placeholder="confirm password"
                _placeholder={{ color: "#6a6c6d" }}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) => value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && <Text color="red.500">{errors.confirmPassword.message}</Text>}
            </Field.Root>

            {/* Submit Button */}
            <Button
              mt={2}
              colorScheme="teal"
              loading={isSubmitting}
              borderRadius="10px"
              fontSize="1rem"
              fontWeight="bold"
              type="submit"
              background="#8A8A8A"
            >
              Sign Up
            </Button>

            {/* Terms */}
            <Text textAlign="center" mt="1rem" fontSize="0.7rem" color="black">
              By signing up you confirm that you read & accepted our{" "}
              <Link color="black" fontWeight="medium">
                terms & conditions
              </Link>
              .
            </Text>
          </VStack>
        </chakra.form>
      </Box>
    </Box>
  );
};

export default Register;
