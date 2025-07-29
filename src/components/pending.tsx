import { Box, Button, Text, Stack, Spinner, Heading } from "@chakra-ui/react";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Transaction {  
  batch_id: string;
  product: string;
  to: string;
  status: string;
  date: string;
}

interface TransferRequest {
  transfer_id: number;
  batch_id: string;
  from: string;
  to: string;
  timestamp: number;
  status: string;
}

const Pending = () => {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pendingTransfers, setPendingTransfers] = useState<TransferRequest[]>([]);
  const [transactionCount, setTransactionCount] = useState<number>(0);
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("name")?.toUpperCase();
    setUserName(userName || "");

    if (!token || role?.toLowerCase() !== "distributor") {
      navigate("/");
    }
  }, [navigate]);

  // Fetch all transaction + stats + pending transfer requests
  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if (!token || !email) return;

    const headers = { Authorization: `Bearer ${token}` };

    Promise.all([
      axios.get("http://localhost:5000/my_transactions", { headers }),
      axios.get("http://localhost:5000/my_transaction_count", { headers }),
      axios.get("http://localhost:5000/my_pending_count", { headers }),
      axios.get("http://localhost:5000/my_pending_requests", { headers }),
    ])
      .then(([txRes, countRes, pendingRes, transferRes]) => {
        setTransactions(txRes.data.transactions || []);
        setTransactionCount(countRes.data.count);
        setPendingCount(pendingRes.data.count);
        setPendingTransfers(transferRes.data.pending_requests || []);
      })
      .catch((err) => {
        console.error("Error fetching data:", err.response || err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const acceptTransfer = async (transferId: number, batch_id: string) => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const headers = { Authorization: `Bearer ${token}` };

    try {
      await axios.post(
        `http://localhost:5000/accept_transfer/${transferId}`,
        {
          batch_id,
          receiver_email: email,
          conditions: {
            temperature: "22°C",
            humidity: "60%",
            transport: "Approved Truck XYZ",
          },
        },
        { headers }
      );

      toast.success("Transfer accepted successfully");

      setPendingTransfers((prev) =>
        prev.filter((tx) => tx.transfer_id !== transferId)
      );
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to accept transfer request");
    }
  };

  if (loading) return <Spinner size="lg" color="blue.500" />;

  return (
    <Box
      h="100vh"
      w="100%"
      display="flex"
      flexDirection={"column"}
      justifyContent="center"
      alignItems="center"
      bg="rgba(189, 189, 189, 0.3)"
      backdropFilter="blur(10px)"
    >
      <Heading fontSize="xl" mb={4} color={"black"}>
        Pending Transfers ({pendingTransfers.length})
      </Heading>

      <Stack gap={4} w={"30vw"}>
        {pendingTransfers.length === 0 ? (
          <Text>No pending transfer requests</Text>
        ) : (
          pendingTransfers.map((req: TransferRequest, idx: number) => (
            <Box
              key={req.transfer_id}
              p={4}
              borderWidth="1px"
              rounded="md"
              shadow="sm"
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              color={"black"}
            >
              <Box>
                <Text>
                  <strong>Batch:</strong> {req.batch_id}
                </Text>
                <Text>
                  <strong>From:</strong> {req.from}
                </Text>
                <Text>
                  <strong>To:</strong> {req.to}
                </Text>
                <Text>
                  <strong>Status:</strong> {req.status}
                </Text>
                <Text>
                  <strong>Time:</strong> {new Date(req.timestamp * 1000).toLocaleString()}
                </Text>
              </Box>
              <Button colorScheme="green" onClick={() => acceptTransfer(req.transfer_id, req.batch_id)}>
                Accept Transfer
              </Button>
            </Box>
          ))
        )}
      </Stack>
    </Box>
  );
};

export default Pending;
