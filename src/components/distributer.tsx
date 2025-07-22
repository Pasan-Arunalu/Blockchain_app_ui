import { Box, Grid, Card, Image } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgimg from "@/assets/login.jpg";
import add from "@/assets/add.jpg";
import tra from "@/assets/tra.jpg";
import view from "@/assets/view.jpg";

function Distributer() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if (!token || role !== "distributor") {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <Box
        h={"100vh"}
        w={"100%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        bgImage={`url(${bgimg})`}
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
      >
        <Box
          h={"80%"}
          w={"80%"}
          bg={"black"}
          padding={"8rem"}
          background="rgba(150, 150, 150, 0.3)"
          backdropFilter="blur(10px)"
          borderRadius={"20px"}
        >
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

export default Distributer;
