import {
  Box,
  Grid,
  Stack,
  Image,
  Text,
  Heading,
  Spinner,
  Button,
  CloseButton,
  Dialog,
  Portal,
  Float,
  Circle,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddTransaction from "./addTransaction";
import Pending from "./pending";
import BatchVisualization from "./charts";

import pending2 from "@/assets/pending(2).png";
import done from "@/assets/done.png";
import check from "@/assets/check.png";

interface Transaction {
  batch_id: string;
  product: string;
  to: string;
  current_owner?: string;
  status: string;
  date: string;
}

function Retailer() {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionCount, setTransactionCount] = useState<number>(0);
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [showForm] = useState(false);

  const [selectedBatchId, setSelectedBatchId] = useState<string | null>(null);
  const [isChartOpen, setIsChartOpen] = useState<boolean>(false);

  useEffect(() => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("name")?.toUpperCase();

    setUserName(userName || "");

    if (!token || role?.toLowerCase() !== "retailer") {
      navigate("/");
    }
  }, [navigate]);

  //Fetch transactions + count + pending + transfer
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const headers = { Authorization: `Bearer ${token}` };

    Promise.all([
      axios.get("http://localhost:5000/my_transactions", { headers }),
      axios.get("http://localhost:5000/my_transaction_count", { headers }),
      axios.get("http://localhost:5000/my_pending_count", { headers }),
    ])
      .then(([txRes, countRes, pendingRes]) => {
        setTransactions(txRes.data.transactions || []);
        setTransactionCount(countRes.data.count);
        setPendingCount(pendingRes.data.count);
      })
      .catch((err) => {
        console.error("Error fetching data:", err.response || err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner size="lg" color="blue.500" />;

  return (
    <>
      {showForm && <AddTransaction />}

      <Box
        h={"100vh"}
        w={"100%"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        bg={"#ffffffff"}
        paddingTop={"2rem"}
        paddingBottom={"2rem"}
      >
        <Box h={"40%"} w={"80%"} display={"flex"}>
          <Box h={"100%"} w={"50%"}>
            <Box h={"50%"} w={"100%"} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
              <Heading color={"black"} size={"5xl"}>
                Hello {userName} !
              </Heading>
              <Text color={"black"} fontSize={"1rem"}>
                Track your products here
              </Text>
            </Box>
            <Box h={"50%"} w={"100%"}>
              <Grid
                templateColumns="repeat(2, 1fr)"
                h={"100%"}
                w={"100%"}
                alignItems={"center"}
                justifyItems={"center"}
              >
                <Box h="100%" w={"100%"} display={"flex"}>
                  <Box h={"100%"} w={"30%"} alignContent={"center"} justifyItems={"center"}>
                    <Image w={"40%"} src={pending2}></Image>
                  </Box>
                  <Box
                    h={"100%"}
                    w={"70%"}
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    color={"black"}
                  >
                    <Heading size={"2xl"}>Pending Products</Heading>
                    <Heading size={"lg"}>{pendingCount}</Heading>
                  </Box>
                </Box>
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
                    <Heading size={"2xl"}>Total Products</Heading>
                    <Heading size={"lg"}>{transactionCount}</Heading>
                  </Box>
                </Box>
              </Grid>
            </Box>
          </Box>
          <Box h={"100%"} w={"50%"} display={"flex"}>
            <Box display={"flex"} justifyContent={"center"} w={"100%"}>
              <Box h={"100%"} w={"40%"} display={"flex"} alignItems={"center"}>
                <Dialog.Root size="full" placement="center" motionPreset="slide-in-bottom">
                  <Dialog.Trigger asChild>
                    <Button
                      variant={"outline"}
                      h={"70%"}
                      w={"70%"}
                      borderRadius={"15px"}
                      _hover={{ bg: "gray.200", scale: "1.05", transition: "1s" }}
                    >
                      <Box
                        h={"100%"}
                        w={"100%"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        display={"flex"}
                        flexDirection={"column"}
                      >
                        <Box
                          h={"70%"}
                          alignItems={"center"}
                          justifyContent={"center"}
                          display={"flex"}
                          marginRight={"1rem"}
                          position="relative"
                        >
                          <Image w={"50%"} src={check}></Image>
                          <Heading size={"3xl"} color={"black"} textAlign={"left"}>
                            Accept
                          </Heading>
                        </Box>
                        <Box h={"30%"}>
                          <Heading size={"lg"} color={"black"} textAlign={"left"}>
                            product transfership
                          </Heading>
                        </Box>
                        <Float offset={"2"}>
                          <Circle size="10" bg="red" color="white">
                            {pendingCount}
                          </Circle>
                        </Float>
                      </Box>
                    </Button>
                  </Dialog.Trigger>
                  <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                      <Dialog.Content bg="rgba(189, 189, 189, 0.1)" backdropFilter="blur(10px)">
                        <Box>
                          <Pending />
                        </Box>
                        <Dialog.CloseTrigger asChild>
                          <CloseButton size="2xl" variant={"outline"} />
                        </Dialog.CloseTrigger>
                      </Dialog.Content>
                    </Dialog.Positioner>
                  </Portal>
                </Dialog.Root>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box h={"60%"} w={"80%"} marginTop={"2rem"} bg={"#d3d3d3ff"} p={"2rem"} borderRadius={"10px"}>
          <Box h={"15%"} w={"100%"} display={"flex"}>
            <Box alignContent={"center"}>
              <Heading alignSelf={"center"} size={"4xl"} color={"black"}>
                Product History
              </Heading>
            </Box>
          </Box>
          <Box h={"85%"} w={"100%"}>
            <Box
              display={"flex"}
              paddingLeft={"3rem"}
              gap={6}
              h={"15%"}
              alignItems={"center"}
              color={"gray"}
              w={"100%"}
            >
              <Box w={"20%"}>
                <Text fontWeight={"bold"} fontSize="sm">
                  Batch ID
                </Text>
              </Box>
              <Box w={"15%"}>
                <Text fontWeight={"bold"} fontSize="sm">
                  Product
                </Text>
              </Box>
              <Box w={"20%"}>
                <Text fontWeight={"bold"} fontSize="sm">
                  Current Owner
                </Text>
              </Box>
              <Box w={"20%"}>
                <Text fontWeight={"bold"} fontSize="sm">
                  date
                </Text>
              </Box>
              <Box w={"15%"}>
                <Text fontWeight={"bold"} fontSize="sm">
                  status
                </Text>
              </Box>
            </Box>
            <Stack
              h={"85%"}
              w={"100%"}
              color="black"
              gap={4}
              overflow={"scroll"}
              overflowX={"hidden"}
              overflowY={"hidden"}
            >
              {transactions.map((tx, index) => (
                <Box
                  display={"flex"}
                  w={"100%"}
                  h={"25%"}
                  alignItems={"center"}
                  paddingLeft={"3rem"}
                  rounded="md"
                  shadow="sm"
                  key={index}
                  _hover={{ shadow: "md", bg: "gray.50", cursor: "pointer" }}
                  gap={6}
                  onClick={() => {
                    setSelectedBatchId(tx.batch_id);
                    setIsChartOpen(true);
                  }}
                >
                  <Box w={"20%"}>
                    <Text fontWeight={"bold"} fontSize="sm">
                      {tx.batch_id}
                    </Text>
                  </Box>
                  <Box w={"15%"}>
                    <Text>{tx.product}</Text>
                  </Box>
                  <Box w={"20%"}>
                    <Text fontSize="sm">{tx.current_owner || tx.to}</Text>
                  </Box>
                  <Box w={"20%"}>
                    <Text fontSize="sm" color="black">
                      {tx.date}
                    </Text>
                  </Box>
                  <Box w={"15%"}>
                    <Text fontWeight={"bold"} fontSize="sm">
                      {tx.status}
                    </Text>
                  </Box>
                </Box>
              ))}
            </Stack>
            <Dialog.Root open={isChartOpen} onOpenChange={(details) => setIsChartOpen(details.open)}>
              <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                  <Dialog.Content bg="white" p={4} borderRadius="lg" minW="70%">
                    {selectedBatchId && <BatchVisualization batchId={selectedBatchId} />}
                    <Dialog.CloseTrigger asChild>
                      <CloseButton size="lg" position="absolute" top="4" right="4" />
                    </Dialog.CloseTrigger>
                  </Dialog.Content>
                </Dialog.Positioner>
              </Portal>
            </Dialog.Root>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Retailer;
