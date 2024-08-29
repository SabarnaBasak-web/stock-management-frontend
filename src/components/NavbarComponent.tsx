import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import LogOutIcon from "@mui/icons-material/LogoutRounded";

interface INavbarComponentPropsType {
  onLogoutHandler: () => void;
  username: string;
  title: string;
}

function NavbarComponent(props: INavbarComponentPropsType) {
  const { onLogoutHandler, username, title } = props;
  return (
    <AppBar
      position='fixed'
      sx={{
        width: `calc(100% - 250px)`,
        ml: `250px`,
      }}
    >
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <Button color='inherit' onClick={onLogoutHandler}>
          <Typography variant='body2' style={{ marginRight: "8px" }}>
            {username}
          </Typography>
          <LogOutIcon />
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavbarComponent;
