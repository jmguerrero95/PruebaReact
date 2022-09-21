import {
  Grid,
  Container,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
//import "./App.css";
import fondo from "../../../assets/images/fondo.jpg";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/contexts/AuthContext";
import { AuthService } from "../../../services/auth/AuthService";
import { GroupService } from "../../../services/grupos/GroupsService";
import Swal from "sweetalert2";

function App() {
  useEffect(() => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
  }, []);
  const { dispatchUser }: any = useContext(AuthContext);
  const [auth, setAuth] = useState({ email: "", password: "" });
  const history = useNavigate();

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const resp = await AuthService.login(auth);
      console.log(resp);
      if (resp.token) {
        sessionStorage.setItem(
          "user",
          JSON.stringify({ ...resp.data, loggedIn: true })
        );
        sessionStorage.setItem("token", resp.token);
        dispatchUser({ type: "login", payload: resp.data });
        history("/dashboard/home");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Verifica tu usuario o password!",
      });
    }
  };

  const handleChange = (e: any) => {
    setAuth({
      ...auth,
      [e.target.name]: e.target.value,
    });
  };

  const theme = useTheme();
  let direction: any = "column";

  const styles = {
    paperContainer: {
      backgroundImage: `url(${fondo})`,
      backgroundRepeat: "no-repeat",
      backgrounSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
    },
    container: {
      opacity: "0.8",
      height: "60%",
      marginTop: theme.spacing(10),
      [theme.breakpoints.down(400)]: {
        margintTop: 0,
        width: "100%",
        height: "100%",
      },
    },
    div: {
      marginTop: theme.spacing(8),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: direction,
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(1),
    },
    boton: {
      margin: theme.spacing(3, 0, 2),
    },
  };

  return (
    <Grid container component="main" style={styles.paperContainer}>
      <Container
        style={styles.container}
        component={Paper}
        elevation={5}
        maxWidth="xs"
      >
        <div style={styles.div}>
          <Avatar style={styles.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component={"h1"} variant="h5">
            Inicio de sesión
          </Typography>
          <form onSubmit={handleSubmit} style={styles.form}>
            <TextField
              fullWidth
              autoFocus
              color="primary"
              margin="normal"
              variant="outlined"
              label="Nombre de usuario"
              name="email"
              onChange={(e) => handleChange(e)}
            />
            <TextField
              fullWidth
              autoFocus
              color="primary"
              type="password"
              margin="normal"
              variant="outlined"
              label="Contraseña"
              name="password"
              onChange={(e) => handleChange(e)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={styles.boton}
            >
              Iniciar Sesión
            </Button>
          </form>
        </div>
      </Container>
    </Grid>
  );
}

export default App;
