import { Box } from "@chakra-ui/react"
import { Grid, GridItem } from "@chakra-ui/react"

function Navbar(){
    return(
        <>
            <Box h={"6rem"} w={"100%"}>
                <Grid templateColumns="repeat(4, 1fr)" gap="6" h={"100%"} w={"100%"}>
                  <GridItem colSpan={1}>
                    <Box h="100%" 
                    
                    />
                  </GridItem>
                  <GridItem colSpan={2}>
                    <Box h="100%" 
                    
                    />
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Box h="100%" 
                    
                    />
                  </GridItem>
                </Grid>
            </Box>
        </>
    )
}

export default Navbar;