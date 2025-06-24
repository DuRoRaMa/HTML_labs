import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

interface ComponentProps {
    building: {
        img: string, 
        title: string, 
        description: string[],
    };
    index: number;
}

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textAlign: 'justify',
  marginBottom: theme.spacing(2),
  '&:last-child': {
    marginBottom: 0,
  },
}));

function BuildCard({ building, index }: ComponentProps) {
    const isEven = index % 2 === 0;
    
    return (
      <Card sx={{ 
        display: 'flex',
        flexDirection: { xs: 'column', sm: isEven ? 'row-reverse' : 'row' },
        alignItems: 'stretch',
        height: '100%',
        mb: 2
      }}>
        <Box sx={{
          width: { xs: '100%', sm: '40%' },
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRight: { 
            xs: 'none', 
            sm: isEven ? '1px solid #e0e0e0' : 'none' 
          },
          borderLeft: { 
            xs: 'none', 
            sm: isEven ? 'none' : '1px solid #e0e0e0' 
          },
          backgroundColor: '#f5f5f5',
          order: { xs: 2, sm: 'unset' }
        }}>
          <Box
            component="img"
            src={building.img}
            alt={building.title}
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: '12px',
              objectFit: 'contain',
              maxHeight: { xs: '300px', sm: 'none' }
            }}
          />
        </Box>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          width: { xs: '100%', sm: '60%' },
          justifyContent: 'space-between',
          order: { xs: 1, sm: 'unset' }
        }}>
          <CardContent>
            <Typography gutterBottom variant="h5" sx={{ fontSize: '1.6rem', color: '#5d8aa8' }}>
              {building.title.split(',')[0]}
            </Typography>
            {building.description.slice(0, 1).map((item, ind) => (
              <StyledTypography key={ind} variant="body2">    
                {item}
              </StyledTypography>
            ))}
          </CardContent>
          <CardActions sx={{ 
            marginTop: { xs: 'auto', sm: '40px' },
            justifyContent: { 
              xs: 'flex-end', 
              sm: isEven ? 'flex-start' : 'flex-end' 
            }
          }}> 
            <Button 
              size="small"
              component={Link}
              to={`/game/${index + 4}`}
            >
              ПОДРОБНЕЕ
            </Button>
          </CardActions>
        </Box>
      </Card>
    )
}

export default BuildCard; 