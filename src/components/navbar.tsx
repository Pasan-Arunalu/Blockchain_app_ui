import { Avatar, Box, Button } from "@chakra-ui/react";
import { Grid, GridItem, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const userName = localStorage.getItem("name")?.toUpperCase();

    setUserName(userName || "");
  });

  return (
    <>
      <Box h={"10vh"} w={"100%"} bg={"white"} p={"1.5rem"}>
        <Grid templateColumns="repeat(2, 1fr)" gap="6" h={"100%"} w={"100%"}>
          <GridItem colSpan={1}>
            <Box h="100%" display={"flex"} gap={5}>
              <Avatar.Root shape="square" size="lg">
                <Avatar.Fallback name="Food Chain" />
                <Avatar.Image src="login.jpg" />
              </Avatar.Root>
              <Heading color={"black"} size={"3xl"}>
                FoodChain
              </Heading>
            </Box>
          </GridItem>
          <GridItem colSpan={1}>
            <Box h="100%" display={"flex"} justifyContent={"right"} gap={5}>
              <Avatar.Root>
                <Avatar.Fallback name={userName} />
              </Avatar.Root>
              <Button
                color={"black"}
                variant="outline"
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                }}
              >
                Signout
              </Button>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}

export default Navbar;
