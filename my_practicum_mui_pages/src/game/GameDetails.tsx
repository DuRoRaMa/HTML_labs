// Building.tsx (без изменений)
import { useParams, Link } from 'react-router-dom';
import structures from "../data";
import { Container, Typography, Box, Breadcrumbs, Grid } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import Navbar from "../components/Navbar";

function GameDetails() {
  const { id } = useParams();
  const building = structures[Number(id)];

  return (
    <div>
      <Navbar active="" />
      <Container maxWidth="lg">
        <Box sx={{ mt: 4, mb: 4 }}>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Главная
            </Link>
            <Typography color="text.primary">{building.title}</Typography>
          </Breadcrumbs>

          <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#5d8aa8' }}>
            {building.title}
          </Typography>
        <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            mb: 4
          }}>
            <Box 
              component="img" 
              src={building.img} 
              alt={building.title} 
              sx={{ 
                width: '50%', 
                height: 'auto',
                objectFit: 'contain', 
                borderRadius: 2,
              }} 
            />
          </Box>

          <Grid container spacing={4}>
            {building.description.map((paragraph, index) => (
              <Grid key={index} size={{ xs: 12, md: 6 }}> {/* Исправлено size на item */}
                <Typography paragraph sx={{ textAlign: 'justify', mb: 2 }}>
                  {paragraph}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default GameDetails;