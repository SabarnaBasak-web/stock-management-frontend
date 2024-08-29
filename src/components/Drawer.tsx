import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
  Typography,
} from "@mui/material";
import * as IconsList from "@mui/icons-material";
import { IRouteInfo, routeMap } from "../constants/constants";
import logo from "./../assets/images/logo.png";
interface IDrawerComponentProps {
  routes: string[];
  onListItemClick: (param: string) => void;
}

function DrawerComponent(props: IDrawerComponentProps) {
  const { routes, onListItemClick } = props;

  return (
    <Drawer open={true} variant='permanent'>
      <Box sx={{ width: 250, height: "80%" }} role='presentation'>
        <Box
          sx={{
            padding: "0.4rem 0.8rem",
            boxSizing: "borderBox",
            backgroundColor: "#3f51b5",

            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "row",
          }}
        >
          <img src={logo} height={80} width={80} />
          <Typography variant='body2' style={{ textAlign: "center" }}>
            Stock Management System
          </Typography>
        </Box>
        <Divider />
        <List>
          {routes.map((routeName: string) => {
            const { icon, text } = routeMap[routeName] as IRouteInfo;
            const DynamicIcon = IconsList[icon];
            return (
              <ListItem
                key={text}
                disablePadding
                onClick={() => onListItemClick(routeName)}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <DynamicIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
}

export default DrawerComponent;
