import React from "react";
import "./App.css";
import { Dashboard } from "./Components/Dashboard";
import { Home } from "./Components/Home";
import { Monthly } from "./Components/Monthly";
import { Weekly } from "./Components/Weekly";
import { Yearly } from "./Components/Yearly";
import { NotFound } from "./Components/NotFound";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { Switch, Route,BrowserRouter as Router } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Fragment } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import Paper from "@mui/material/Paper";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import { History } from "./Components/History";
import { EditData } from "./Components/EditData";
function App() {
  const history = useHistory();

  const array = [
    {
      name: "Home",
      onClick: "/",
      icon: <HomeIcon />,
    },
    {
      name: "Dashboard",
      onClick: "/dashboard",
      icon: <DashboardIcon />,
    },
    {
      name: "Transaction History",
      onClick: "/history",
      icon: <WorkHistoryIcon />,
    },
  ];

  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {array.map(({ name, onClick, icon }) => (
          <ListItem
            button
            key={name}
            onClick={() => {
              history.push(onClick);
            }}
          >
            <ListItemText color="success" primary={name} />
            {icon}
          </ListItem>
        ))}
      </List>
    </Box>
  );
  const [mode, setMode] = useState("dark");
  const [color, setColor] = useState("white");
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Paper style={{ borderRadius: "0px", minHeight: "100vh" }} elevation={4}>
        <div className="App">
          <AppBar position="static">
            <Toolbar>
              {["left"].map((anchor) => (
                <Fragment key={anchor}>
                  <Button
                    className="mode"
                    color="inherit"
                    onClick={toggleDrawer(anchor, true)}
                  >
                    <MenuIcon />
                    Menu
                  </Button>
                  <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                  >
                    {list(anchor)}
                  </Drawer>
                </Fragment>
              ))}
              <Button
                color="inherit"
                style={{ marginLeft: "auto" }}
                startIcon={
                  mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />
                }
                onClick={() => {
                  setMode(mode === "light" ? "dark" : "light");
                  setColor(mode === "dark" ? "black" : "white");
                }}
              >
                {mode === "light" ? "dark" : "light"} Mode
              </Button>
            </Toolbar>
          </AppBar>
        <Router>
          <Routes>
         <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/dashboard">
              <Dashboard color={color} />
            </Route>
            <Route path="/weekly">
              <Weekly color={color} />
            </Route>
            <Route path="/weekly/:id">
              <Weekly color={color} />
            </Route>
            
            <Route path="/monthly/:id">
              <Monthly color={color} />
            </Route>
            <Route path="/yearly">
              <Yearly color={color} />
            </Route>
            <Route path="/yearly/:id">
              <Yearly color={color} />
            </Route>
            <Route path="/history">
              <h1>History of Income and Expenses</h1>
              <History />
            </Route>
            <Route path="/transaction/edit/:id">
              <EditData />
            </Route>
          
            <Route path="**">
              <NotFound />
            </Route>
          </Switch>
         </Routes>
       </Router>
        </div>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
