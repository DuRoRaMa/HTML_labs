import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import structures from "../../data";
import BuildCard from "./BuildCard";
import BuildSmallCard from "./BuildSmallCard";
import Box from '@mui/material/Box';

const cardData = [structures[8], structures[9]];
const smallCardData = structures.slice(4, 8);

function Content() {
  return (
    <Container maxWidth="xl">
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'center',
        mb: 6,
        width: '100%'
      }}>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)'
          },
          gap: 3,
          width: '100%',
          maxWidth: 1200,
          margin: '0 auto'
        }}>
          {smallCardData.map((building, index) => (
            <Box 
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <BuildSmallCard building={building} index={index} />
            </Box>
          ))}
        </Box>
      </Box>

      <Grid container spacing={{ xs: 3, md: 6 }}>
        {cardData.map((item, index) => (
          <Grid item key={index} xs={12} md={6}>
            <BuildCard building={item} index={index + 4} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );  
}

export default Content;