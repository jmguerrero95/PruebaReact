//IMPORTACIONES
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { GroupService } from "../../../services/grupos/GroupsService";
import { useState, useEffect, useRef } from "react";
import { Clear, Edit } from "@mui/icons-material";
import Swal from "sweetalert2";

import {
  Typography,
  Container,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  TextField,
  Modal,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ModalAddGroups } from "./ModalAddGroups";
//FIN IMPORTACIONES
export function Group() {
  const idRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  //ALERTAS SWEETALERT
  const modalDelete = (id: string, name: string) => {
    Swal.fire({
      title: "Esta a punto de eliminar?",
      text: "Esta seguro que desea eliminar el grupo: " + name,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "eliminar",
      cancelButtonText: "cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        handleSubmit(id);
        Swal.fire("Grupo eliminado con exito");
      }
    });
  };
  //FIN ALERTAS

  //FUNCION BORRAR GRUPO RECIBE EL ID DEL GRUPO A BORRAR
  const handleSubmit = async (id: string) => {
    try {
      const resp = await GroupService.deletGroup(id);
      console.log(resp);
      const newGroup = post.filter((group: any) => group.id !== id);
      setPost(newGroup);
    } catch (error) {}
  };

  //FUNCION EDITAR GRUPO
  const handleSubmitEdit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      let id: any;
      let name: any;
      let description: any;
      id = idRef.current?.value;
      console.log(idRef.current);
      if (nameRef.current != null) {
        name = nameRef.current.value;
      }
      if (descriptionRef.current != null) {
        description = descriptionRef.current.value;
      }
      await GroupService.updateGroup(id, name, description);
      const newGroup = post.map((group: any) => {
        if (group.id === id) {
          return {
            ...group,
            name: name,
            description: description,
          };
        }
        return group;
      });
      setPost(newGroup);
    } catch (error) {}
  };

  //FUNCIONES
  const [post, setPost] = useState(Array);
  const [group, setGroup] = useState(Array);
  const [datGroup, setDatGroup] = useState({
    name: "",
    description: "",
    id: "",
  });
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const handleChange = (e: any) => {
    setDatGroup({
      ...datGroup,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    GroupService.listGroup().then((resp) => {
      console.log(resp);
      setPost(resp);
    });
  }, []);
  //FIN FUNCIONES

  //ESTILOS
  const theme = useTheme();
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  let direction: any = "column";

  const styles = {
    ocult: {
      display: "none",
    },
    campo: {
      marginTop: "20px",
      marginBotton: "20px",
    },
    paperContainer: {
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
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  //FIN ESTILOS
  return (
    <Grid>
      <Container>
        <div style={styles.div}>
          <Typography variant="h4" component="h4">
            Grupos
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Nombre</StyledTableCell>
                  <StyledTableCell align="center">Descripción</StyledTableCell>
                  <StyledTableCell align="center">
                    Cantidad de miembros
                  </StyledTableCell>
                  <StyledTableCell align="center">Acción</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {post.map((row: any) => (
                  <StyledTableRow key={row["id"]}>
                    <StyledTableCell align="center" scope="row">
                      {row["name"]}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row["description"]}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row["members"]}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <IconButton
                        size="large"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={() => {
                          modalDelete(row["id"], row["name"]);
                        }}
                      >
                        <Clear />
                      </IconButton>
                      <IconButton
                        size="large"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={() => {
                          setGroup(row);
                          console.log(group["name" as keyof typeof group]);
                          handleOpen();
                        }}
                      >
                        <Edit />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <ModalAddGroups />

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Editar grupo
            </Typography>
            <form onSubmit={handleSubmitEdit}>
              <TextField
                inputRef={nameRef}
                fullWidth
                id="name"
                label="Nombre de grupo"
                defaultValue={group["name" as keyof typeof group]}
                style={styles.campo}
                name="name"
                onChange={(e) => handleChange(e)}
              />
              <TextField
                inputRef={descriptionRef}
                fullWidth
                id="description"
                label="Descripción"
                variant="outlined"
                style={styles.campo}
                defaultValue={group["description" as keyof typeof group]}
                name="description"
                onChange={(e) => handleChange(e)}
              />
              <TextField
                inputRef={idRef}
                style={(styles.ocult, styles.ocult)}
                fullWidth
                id="id"
                label="id"
                variant="outlined"
                defaultValue={group["id" as keyof typeof group]}
                name="id"
                onChange={(e) => handleChange(e)}
              />
              <Button type="submit" style={styles.boton} variant="contained">
                Guardar
              </Button>
            </form>
          </Box>
        </Modal>
      </Container>
    </Grid>
  );
}
