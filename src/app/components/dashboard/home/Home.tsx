import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Menu as MenuIcon, AccountCircle } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { GroupService } from "../../../services/grupos/GroupsService";
import { Group } from "../components/Group";
import React from "react";
import { Link, Navigate } from "react-router-dom";
//const resp = await GroupService.listGroup();

export function Home() {
  if (!sessionStorage.getItem("token")) {
    <Navigate to="/auth" />;
    console.log("test");
  }
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const groupList = async () => {
    try {
      const resp = await GroupService.listGroup();
      if (resp) {
        //console.log(resp)
        return resp;
        /*sessionStorage.setItem(
          "user",
          JSON.stringify({ ...resp.data, loggedIn: true })
        );
        sessionStorage.setItem(
          "token",
          resp.token
        );
        dispatchUser({ type: "login", payload: resp.data });
        history("/dashboard/home");*/
      }
    } catch (error) {}
  };

  useEffect(() => {
    groupList();

    //console.log(groupList)
  }, []);
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls={open ? "menu-appbar" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              color="inherit"
              onClick={handleClick}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem>
                <Link to="/auth">Cerrar sesion</Link>
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Group />
    </div>
  );
}
