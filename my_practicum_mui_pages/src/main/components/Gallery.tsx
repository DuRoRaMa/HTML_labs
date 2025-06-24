import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import structures from "../../data";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link } from 'react-router-dom';

const imgData = structures.slice(0, 4);

function Gallery() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="lg">
      <Box sx={{ m: '20px auto' }}>
        {isSmallScreen ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {imgData.map((item, index) => (
              <Link 
                to={`/game/${index}`}
                key={index}
                style={{ textDecoration: 'none' }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      '& .MuiImageListItemBar-root': {
                        opacity: 1,
                      }
                    },
                  }}
                >
                  <ImageListItem>
                    <img
                      srcSet={item.img}
                      src={item.img}
                      alt={item.title}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: 'auto',
                        aspectRatio: '4/3',
                        objectFit: 'cover',
                        borderRadius: '12px',
                      }}
                    />
                    <ImageListItemBar 
                      position="bottom"
                      title={item.title.split(',')[0]}
                      sx={{
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                        borderBottomLeftRadius: '12px',
                        borderBottomRightRadius: '12px',
                        overflow: 'hidden',
                      }}
                    />
                  </ImageListItem>
                </Box>
              </Link>
            ))}
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              {imgData[0] && (
                <Link 
                  to={`/game/${0}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.02)',
                        '& .MuiImageListItemBar-root': {
                          opacity: 1,
                        }
                      },
                    }}
                  >
                    <ImageListItem>
                      <img
                        srcSet={imgData[0].img}
                        src={imgData[0].img}
                        alt={imgData[0].title}
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: '617px',
                          objectFit: 'cover',
                          borderRadius: '12px',
                        }}
                      />
                      <ImageListItemBar 
                        position="bottom"
                        title={imgData[0].title.split(',')[0]}
                        sx={{
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                          borderBottomLeftRadius: '12px',
                          borderBottomRightRadius: '12px',
                          overflow: 'hidden',
                        }}
                      />
                    </ImageListItem>
                  </Box>
                </Link>
              )}
            </Box>

            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
              {imgData.slice(1).map((item, index) => (
                <Link 
                  to={`/game/${index + 1}`}
                  key={index}
                  style={{ textDecoration: 'none' }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.02)',
                        '& .MuiImageListItemBar-root': {
                          opacity: 1,
                        }
                      },
                    }}
                  >
                    <ImageListItem>
                      <img
                        srcSet={item.img}
                        src={item.img}
                        alt={item.title}
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: '195px',
                          objectFit: 'cover',
                          borderRadius: '12px',
                        }}
                      />
                      <ImageListItemBar 
                        position="bottom"
                        title={item.title.split(',')[0]}
                        sx={{
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                          borderBottomLeftRadius: '12px',
                          borderBottomRightRadius: '12px',
                          overflow: 'hidden',
                        }}
                      />
                    </ImageListItem>
                  </Box>
                </Link>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default Gallery;