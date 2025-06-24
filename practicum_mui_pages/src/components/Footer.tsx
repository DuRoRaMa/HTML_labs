import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.mode === 'light'
          ? theme.palette.grey[200]
          : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="xl">
        <Typography variant="body2" color="text.secondary" align="center">
          
            Самые высокие здания и сооружения
          
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
          Выполнил: Виноградов В.С. Б9122-09.03.04
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;