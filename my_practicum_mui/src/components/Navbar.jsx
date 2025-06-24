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
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

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
  padding: '12px 24px', // Увеличил padding для большего размера
  minHeight: '80px', // Увеличил минимальную высоту
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '400px', // Ширина контейнера поиска
  marginLeft: theme.spacing(4),
  [theme.breakpoints.down('lg')]: {
    width: '300px',
  },
  [theme.breakpoints.down('md')]: {
    display: 'none', // Скрываем на мобильных
  },
}));

const SearchButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  minWidth: '90px',
}));

function Navbar({ active }: NavbarProps) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    // Здесь можно добавить логику поиска
  };

  const menuItems = [
    { id: '1', label: 'Главная' },
    { id: '2', label: 'Сводная таблица' },
    { id: '3', label: 'Обсуждение' },
    { id: '4', label: 'Контакты' }
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
          <Typography variant="h5" sx={{ color: '#5d8aa8', flexGrow: 1 }}>
            Самые продаваемые игры месяца
          </Typography>          
          
          {/* Поисковая строка - видна только на десктопах */}
          <SearchContainer>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Поиск игр..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                }
              }}
            />
            <SearchButton 
              variant="contained" 
              color="info"
              onClick={handleSearch}
              startIcon={<SearchIcon />}
            >
              Найти
            </SearchButton>
          </SearchContainer>
          
          <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 4 }}>
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
          
          {/* Мобильное меню */}
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
                
                {/* Добавляем поиск в мобильное меню */}
                <Box sx={{ p: 2, display: 'flex' }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    placeholder="Поиск игр..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <IconButton 
                    color="info"
                    onClick={handleSearch}
                    sx={{ ml: 1 }}
                  >
                    <SearchIcon />
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