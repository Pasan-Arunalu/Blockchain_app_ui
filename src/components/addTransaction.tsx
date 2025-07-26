import { Box, Button, Input, Text, VStack, chakra, Field } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

type TransactionFormInputs = {
  batch_id: string;
  product: string;
  owner_email: string;
  location: string;
  temperature: number;
  humidity: number;
  transport: string;
};

const AddTransaction = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormInputs>();

  const navigate = useNavigate();

  const [ownerEmail, setOwnerEmail] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("email") || "";
    setOwnerEmail(email);
    setValue("owner_email", email);
  }, [setValue]);

  const onSubmit = async (data: TransactionFormInputs) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:5000/add_transaction", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Transaction added successfully!");
      navigate("/farmer");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to add transaction");
    }
  };

  return (
    <>
      <Box
        h={"100vh"}
        w={"100%"}
        display="flex"
        justifyContent="center"
        alignItems="center"
        bg="rgba(189, 189, 189, 0.3)"
        backdropFilter="blur(10px)"
      >
        <Box
          w="50%"
          p="3rem"
          background="#fff"
          border="1px solid rgba(136, 134, 134, 0.2)"
          borderRadius="15px"
          backdropFilter="blur(10px)"
        >
          <chakra.form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap={4} align="stretch">
              <Box display={"flex"}>
                <Text fontWeight="bold" fontSize="2rem" color="black">
                  Add a new Product/ Batch
                </Text>
              </Box>

              <Text fontSize="1rem" color="black">
                Fill in the transaction details to add a new product/ batch 
              </Text>

              {/* Batch ID */}
              <Field.Root color="black">
                <Field.Label>Batch ID</Field.Label>
                <Input
                  placeholder="Enter batch ID"
                  _placeholder={{ color: "#6a6c6d" }}
                  {...register("batch_id", { required: "Batch ID is required" })}
                />
                {errors.batch_id && <Text color="red.500">{errors.batch_id.message}</Text>}
              </Field.Root>

              {/* Product Name */}
              <Field.Root color="black">
                <Field.Label>Product</Field.Label>
                <Input
                  placeholder="Enter product name"
                  _placeholder={{ color: "#6a6c6d" }}
                  {...register("product", { required: "Product name is required" })}
                />
                {errors.product && <Text color="red.500">{errors.product.message}</Text>}
              </Field.Root>

              {/* Owner */}
              <Field.Root color="black">
                <Field.Label>Owner</Field.Label>
                <Input color="black" value={ownerEmail} disabled {...register("owner_email", { required: true })} />
                {errors.owner_email && <Text color="red.500">{errors.owner_email.message}</Text>}
              </Field.Root>

              {/* Location */}
              <Field.Root color="black">
                <Field.Label>Location</Field.Label>
                <Input
                  placeholder="Enter location"
                  _placeholder={{ color: "#6a6c6d" }}
                  {...register("location", { required: "Location is required" })}
                />
                {errors.location && <Text color="red.500">{errors.location.message}</Text>}
              </Field.Root>

              {/* Temperature */}
              <Field.Root color="black">
                <Field.Label>Temperature (°C)</Field.Label>
                <Input
                  type="number"
                  placeholder="e.g. 25"
                  _placeholder={{ color: "#6a6c6d" }}
                  {...register("temperature", {
                    required: "Temperature is required",
                    valueAsNumber: true,
                  })}
                />
                {errors.temperature && <Text color="red.500">{errors.temperature.message}</Text>}
              </Field.Root>

              {/* Humidity */}
              <Field.Root color="black">
                <Field.Label>Humidity (%)</Field.Label>
                <Input
                  type="number"
                  placeholder="e.g. 60"
                  _placeholder={{ color: "#6a6c6d" }}
                  {...register("humidity", {
                    required: "Humidity is required",
                    valueAsNumber: true,
                  })}
                />
                {errors.humidity && <Text color="red.500">{errors.humidity.message}</Text>}
              </Field.Root>

              {/* Transport */}
              <Field.Root color="black">
                <Field.Label>Transport Method</Field.Label>
                <Input
                  placeholder="e.g. Truck, Ship, etc."
                  _placeholder={{ color: "#6a6c6d" }}
                  {...register("transport", {
                    required: "Transport method is required",
                  })}
                />
                {errors.transport && <Text color="red.500">{errors.transport.message}</Text>}
              </Field.Root>

              {/* Submit Button */}
              <Button
                mt={2}
                colorScheme="teal"
                borderRadius="10px"
                fontSize="1rem"
                fontWeight="bold"
                type="submit"
                background="#8A8A8A"
                loading={isSubmitting}
              >
                Add Transaction
              </Button>
            </VStack>
          </chakra.form>
        </Box>
      </Box>
    </>
  );
};

export default AddTransaction;
