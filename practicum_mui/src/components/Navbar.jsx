import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

interface NavbarProps {
  active: string;
}

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  border: '1px solid',
  borderColor: theme.palette.divider,
  padding: '8px 12px',
}));

function Navbar({ active }: NavbarProps) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const menuItems = [
    { id: '1', label: 'Главная' },
    { id: '2', label: 'Список зданий' },
    { id: '3', label: 'Контакты' },
  ];

  return (
    <AppBar      
      position="static"
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        mt: '28px',
      }}
    >
      <Container maxWidth="xl">
        <StyledToolbar>          
          <Typography variant="h6" sx={{ color: '#5d8aa8' }}>
            Самые высокие здания и сооружения
          </Typography>          
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant={active === item.id ? 'contained' : 'text'}
                color="info"
                size="medium"
                sx={{ ml: item.id !== '1' ? 2 : 0 }}
              >
                {item.label}
              </Button>
            ))}
          </Box> 
          <Box sx={{ display: { xs: 'flex', md: 'none' }}}>    
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>              
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
            >
              <Box>               
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                {menuItems.map((item) => (
                <MenuItem 
                  key={item.id}
                  onClick={toggleDrawer(false)}
                  sx={{
                    backgroundColor: active === item.id ? 'info.main' : 'transparent',
                    color: active === item.id ? 'info.contrastText' : 'inherit',
                    fontWeight: active === item.id ? 700 : 400,
                    '&:hover': {
                      backgroundColor: 
                        active === item.id 
                          ? 'info.dark' 
                          : 'action.hover',
                      color: active === item.id 
                          ? 'info.contrastText' 
                          : 'info.main'
                    }
                  }}
                >
                  {item.label}
                </MenuItem>
              ))}
              </Box>
            </Drawer>    
          </Box>
        </StyledToolbar>
      </Container>  
    </AppBar>
  );
}

export default Navbar;