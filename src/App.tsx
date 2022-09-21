import { useReducer } from "react";
import { AppRouter } from "./app/router/AppRouter";
import { AuthContext } from "./app/components/store/contexts/AuthContext";
import { authReducer } from "./app/components/store/reducers/authReducer";

const init = () => {
  let sessionUser: any = sessionStorage.getItem("user");
  let user: any;
  if (!sessionUser) {
    user = sessionUser;
  } else {
    user = JSON.parse(sessionUser);
  }
  return user;
};

function App() {
  const [user, dispatchUser] = useReducer(authReducer, {}, init);

  return (
    <AuthContext.Provider value={{ user, dispatchUser }}>
      <AppRouter />
    </AuthContext.Provider>
  );
}

export default App;
/*import { Grid, Container, Paper, Avatar, Typography, TextField, Button } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import './App.css';
import fondo from './assets/images/fondo.jpg';
import {LockOutlined as LockOutlinedIcon} from '@mui/icons-material'

function App() {
  const theme = useTheme();
  let direction : any = 'column'

  const styles = {
    paperContainer: {
        backgroundImage: `url(${fondo})`,
        backgroundRepeat: 'no-repeat',
        backgrounSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh'
    },
    container: {
      opacity: '0.8',
      height: '60%',
      marginTop: theme.spacing(10),
      [theme.breakpoints.down(400)]: {
        margintTop: 0,
        width: '100%',
        height: '100%'
      }
    },
    div: {
      marginTop: theme.spacing(8),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: direction
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1)
    },
    boton: {
      margin: theme.spacing(3, 0, 2)
    }
  };


  return (
    <Grid container component='main' style={styles.paperContainer}>
      <Container style={styles.container} component={Paper} elevation={5} maxWidth='xs'>
        <div style={styles.div}>
          <Avatar style={styles.avatar}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component={'h1'} variant='h5'>Inicio de sesión</Typography>
          <form style={styles.form}>
            <TextField fullWidth autoFocus color='primary' margin='normal' variant='outlined' label='Nombre de usuario' name='usuario'/>
            <TextField fullWidth autoFocus color='primary' type="password" margin='normal' variant='outlined' label='Contraseña' name='password'/>
            <Button fullWidth variant='contained' color='primary' style={styles.boton}>
              Iniciar Sesión

            </Button>
          </form>


        </div>
      </Container>
    </Grid>
    
  );
}

export default App;*/
