import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import structures from "./data";
import BuildCard from "./BuildCard";
import BuildSmallCard from "./BuildSmallCard";
import Box from '@mui/material/Box';

const cardData = [structures[9], structures[8]];
const smallCardData = [structures[4], structures[5], structures[6], structures[7]];

function Content() {
  return (
    <Container maxWidth="xl">
      {/* Блок с круглыми карточками */}
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'center',
        mb: 6,
        width: '100%'
      }}>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',   // 1 колонка на мобильных
            sm: 'repeat(2, 1fr)',   // 2 колонки на планшетах
            md: 'repeat(4, 1fr)'    // 4 колонки на десктопах
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
              <BuildSmallCard building={building} />
            </Box>
          ))}
        </Box>
      </Box>

      {/* Основной контент с карточками */}
      <Grid container spacing={{ xs: 3, md: 6 }}>
        {cardData.map((item, index) => (
          <Grid item key={index} xs={12} md={6}>
            <BuildCard building={item} index={index} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );  
}

export default Content;