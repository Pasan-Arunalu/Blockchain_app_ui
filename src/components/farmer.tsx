import { Box, Grid, Card, Image, Text, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import add from "@/assets/add.jpg";
import tra from "@/assets/tra.jpg";
import view from "@/assets/view.jpg";
import done from "@/assets/done.png";
import pending from "@/assets/pending.png";
import cancel from "@/assets/cancel.png";

function Farmer() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if (!token || role !== "farmer") {
      navigate("/");
    }
  }, [navigate]);
  
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
          <Grid
            templateColumns="repeat(3, 1fr)"
            h={"100%"}
            w={"100%"}
            alignItems={"center"}
            justifyItems={"center"}
          >
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
        <Box h={"50%"} w={"50%"}>
          <Grid templateColumns="repeat(3, 1fr)" gap="20" h={"100%"}>
            <Box h={"100%"} alignContent={"center"}>
              <Card.Root w={"100%"} overflow="hidden" cursor={"pointer"}>
                <Image src={add} alt="Green double couch with wooden legs" />
                <Card.Body gap="2">
                  <Card.Title>Add a new product</Card.Title>
                  <Card.Description>Add a new product to the system</Card.Description>
                </Card.Body>
              </Card.Root>
            </Box>
            <Box h={"100%"} alignContent={"center"} cursor={"pointer"}>
              <Card.Root w={"100%"} overflow="hidden">
                <Image src={tra} alt="Green double couch with wooden legs" />
                <Card.Body gap="2">
                  <Card.Title>Transfer a product</Card.Title>
                  <Card.Description>Transfer an existing product to a distributer</Card.Description>
                </Card.Body>
              </Card.Root>
            </Box>
            <Box h={"100%"} alignContent={"center"} cursor={"pointer"}>
              <Card.Root w={"100%"} overflow="hidden">
                <Image src={view} alt="Green double couch with wooden legs" />
                <Card.Body gap="2">
                  <Card.Title>View product history</Card.Title>
                  <Card.Description>View successfully transfered products</Card.Description>
                </Card.Body>
              </Card.Root>
            </Box>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default Farmer;
