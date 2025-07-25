import { Box, Button, Input, Text, VStack, chakra } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

type TransferFormInputs = {
  batch_id: string;
  from_email: string;
  to_email: string;
};

const Transfer = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TransferFormInputs>();

  const navigate = useNavigate();

  const [fromEmail, setFromEmail] = useState("");

  // Load email once when Transfer mounts
  useEffect(() => {
    const email = localStorage.getItem("email") || "";
    console.log("Loaded email from localStorage:", email); // ✅ debug
    setFromEmail(email);
    setValue("from_email", email);
  }, [setValue]);

  const onSubmit = async (data: TransferFormInputs) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:5000/transfer_request", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Transfer request sent successfully!");
      navigate("/farmer");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to create transfer");
    }
  };

  return (
    <Box
      h="100vh"
      w="100%"
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
            <Box>
              <Text fontWeight="bold" fontSize="2rem" color="black">
                New Transfer Request
              </Text>
              <Text fontSize="1rem" color="gray.600">
                Fill in the transfer details
              </Text>
            </Box>

            {/* Batch ID */}
            <Box color={"black"}>
              <Text fontWeight="medium" mb={1} color={"black"}>
                Batch ID
              </Text>
              <Input
                placeholder="Enter batch ID"
                _placeholder={{ color: "#6a6c6d" }}
                {...register("batch_id", { required: "Batch ID is required" })}
              />
              {errors.batch_id && (
                <Text color="red.500" fontSize="sm">
                  {errors.batch_id.message}
                </Text>
              )}
            </Box>

            {/* From (auto-filled) */}
            <Box color={"black"}>
              <Text fontWeight="medium" mb={1} color={"black"}>
                Current Owner
              </Text>
              <Input
                color={"black"}
                placeholder="Current owner"
                disabled
                {...register("from_email", { required: true })}
              />
            </Box>

            {/* To (receiver) */}
            <Box color={"black"}>
              <Text fontWeight="medium" mb={1} color={"black"}>
                Transfer To
              </Text>
              <Input
                placeholder="Enter receiver (e.g., distributor name/email)"
                _placeholder={{ color: "#6a6c6d" }}
                {...register("to_email", { required: "Receiver is required" })}
              />
              {errors.to_email && (
                <Text color="red.500" fontSize="sm">
                  {errors.to_email.message}
                </Text>
              )}
            </Box>

            {/* Submit Button */}
            <Button
              mt={2}
              colorScheme="teal"
              borderRadius="10px"
              fontSize="1rem"
              fontWeight="bold"
              type="submit"
              loading={isSubmitting}
            >
              Send Transfer Request
            </Button>
          </VStack>
        </chakra.form>
      </Box>
    </Box>
  );
};

export default Transfer;
