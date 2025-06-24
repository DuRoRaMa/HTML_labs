import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Card, CardContent } from '@mui/material';

interface BuildSmallCardProps {
  building: {
    img: string;
    title: string;
  };
}

const RoundImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '50%',
});

function BuildSmallCard({ building }: BuildSmallCardProps) {
  return (
    <Card sx={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 2,
      boxShadow: 'none',
      '&:hover': {
        transform: 'scale(1.05)',
        transition: 'transform 0.3s ease',
      }
    }}>
      <Box
        sx={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          overflow: 'hidden',
          marginBottom: 2,
          border: '2px solid #e0e0e0',
        }}
      >
        <RoundImage 
          src={building.img} 
          alt={building.title} 
          loading="lazy"
        />
      </Box>
      <CardContent sx={{ textAlign: 'center', padding: 0 }}>
        <Typography variant="subtitle1" component="div" sx={{ fontWeight: 500 }}>
          {building.title}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default BuildSmallCard;