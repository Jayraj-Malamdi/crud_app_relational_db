import { AppBar, Toolbar, styled, Typography, Grid, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Header = styled(AppBar)`
  background: #37729e;
`;

const Tabs = styled(NavLink)`
  font-size: 20px;
  margin-right: 20px;
  color: inherit;
  text-decoration: none;
`;

const Title = styled(Typography)`
  flex-grow: 1;
`;

const NavBar = () => {
  return (
    <Header position="static">
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item xs={6} sm={8}>
            <Tabs to="/all">All Books</Tabs>
            <Tabs to="/add">Add Book</Tabs>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Box display="flex" justifyContent="flex-end">
              <Typography variant="subtitle2" color="inherit">
                Jayraj Malamdi
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </Header>
  );
};

export default NavBar;
