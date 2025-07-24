import { Box, Grid, Stack, Image, Text, Heading, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import add from "@/assets/add.png";
import tra from "@/assets/tra.png";
import view from "@/assets/view.png";
import done from "@/assets/done.png";
import pending from "@/assets/pending.png";
import cancel from "@/assets/cancel.png";

interface Transaction {
  batch_id: string;
  product: string;
  to: string;
  status: string;
  date: string;
}

function Farmer() {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if (!token || role !== "farmer") {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("🔑 Token being sent:", token);

    axios
      .get("http://localhost:5000/my_transactions", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("Transactions API Response:", res.data);
        setTransactions(res.data.transactions || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching transactions:", err.response || err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner size="lg" color="blue.500" />;

  return (
    <>
      <Box h={"100vh"} w={"100%"} display={"flex"} flexDirection={"column"} alignItems={"center"} bg={"#d3d3d3ff"}>
        <Box h={"15%"} w={"80%"} display={"flex"} flexDirection={"column"} justifyContent={"center"} marginTop={"2rem"}>
          <Heading color={"black"} size={"5xl"}>
            Hello User!
          </Heading>
          <Text color={"black"} fontSize={"1rem"}>
            Track your products here
          </Text>
        </Box>
        <Box h={"15%"} w={"50%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <Grid templateColumns="repeat(3, 1fr)" h={"100%"} w={"100%"} alignItems={"center"} justifyItems={"center"}>
            <Box h="100%" w={"100%"} display={"flex"}>
              <Box h={"100%"} w={"30%"} alignContent={"center"} justifyItems={"center"}>
                <Image w={"40%"} src={done}></Image>
              </Box>
              <Box
                h={"100%"}
                w={"70%"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                color={"black"}
              >
                <Heading size={"2xl"}>Total</Heading>
                <Heading size={"lg"}>16</Heading>
              </Box>
            </Box>
            <Box h="100%" w={"100%"} display={"flex"}>
              <Box h={"100%"} w={"30%"} alignContent={"center"} justifyItems={"center"}>
                <Image w={"40%"} src={pending}></Image>
              </Box>
              <Box
                h={"100%"}
                w={"70%"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                color={"black"}
              >
                <Heading size={"2xl"}>Pending</Heading>
                <Heading size={"lg"}>6</Heading>
              </Box>
            </Box>
            <Box h="100%" w={"100%"} display={"flex"}>
              <Box h={"100%"} w={"30%"} alignContent={"center"} justifyItems={"center"}>
                <Image w={"40%"} src={cancel}></Image>
              </Box>
              <Box
                h={"100%"}
                w={"70%"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                color={"black"}
              >
                <Heading size={"2xl"}>Canceled</Heading>
                <Heading size={"lg"}>1</Heading>
              </Box>
            </Box>
          </Grid>
        </Box>
        <Box h={"60%"} w={"80%"} marginTop={"2rem"} border={"solid 1px black"} borderRadius={"20px"}>
          <Box h={"20%"} w={"100%"} borderBottom={"solid 1px black"} display={"flex"}>
            <Box alignContent={"center"} p={"2rem"}>
              <Heading alignSelf={"center"} size={"4xl"} color={"black"}>
                Transactions
              </Heading>
            </Box>
            <Box display={"flex"} justifyContent={"right"}>
              <Box h={"100%"} w={"20%"} display={"flex"}>
                <Box h={"100%"} w={"40%"} alignContent={"center"} justifyItems={"center"}>
                  <Image w={"50%"} src={add}></Image>
                </Box>
                <Box h={"100%"} w={"60%"} alignContent={"center"}>
                  <Heading size={"3xl"} color={"black"}>
                    Add
                  </Heading>
                </Box>
              </Box>
              <Box h={"100%"} w={"20%"} display={"flex"}>
                <Box h={"100%"} w={"40%"} alignContent={"center"} justifyItems={"center"}>
                  <Image w={"50%"} src={tra}></Image>
                </Box>
                <Box h={"100%"} w={"60%"} alignContent={"center"}>
                  <Heading size={"3xl"} color={"black"}>
                    Transfer
                  </Heading>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box h={"80%"} w={"100%"} p={"1rem"}>
            <Box
              p={4}
              display={"flex"}
              gap={20}
              h={"15%"}
              border={"solid 1px black"}
              borderBottom={"none"}
              bg={"black"}
            >
              <Text marginLeft={"2rem"} w={"10%"} fontWeight={"bold"} fontSize="sm">
                Batch ID
              </Text>
              <Text w={"10%"} fontWeight={"bold"}>Product</Text>
              <Text w={"10%"} fontWeight={"bold"} fontSize="sm">
                Owner
              </Text>
              <Text w={"10%"} fontWeight={"bold"} fontSize="sm">
                Status
              </Text>
              <Text w={"10%"} fontWeight={"bold"} fontSize="sm">
                Date
              </Text>
            </Box>
            <Stack
              h={"85%"}
              w={"100%"}
              color="black"
              gap={4}
              overflow={"scroll"}
              overflowX={"hidden"}
              border={"solid 1px black"}
              borderRadius={"20px"}
              borderTop={"none"}
              borderTopRadius={"none"}
              padding={"2rem"}
            >
              {transactions.map((tx, index) => (
                <Box
                  key={index}
                  p={4}
                  borderWidth="1px"
                  rounded="md"
                  shadow="sm"
                  _hover={{ shadow: "md", bg: "gray.50" }}
                  display={"flex"}
                  gap={10}
                >

                  <Text fontWeight={"bold"} fontSize="sm">
                    {tx.batch_id}
                  </Text>
                  <Text>{tx.product}</Text>
                  <Text fontSize="sm">{tx.to}</Text>
                  <Text fontSize="sm">{tx.status}</Text>
                  <Text fontSize="xs" color="gray.500">
                    {tx.date}
                  </Text>
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Farmer;
