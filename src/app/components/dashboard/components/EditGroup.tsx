import { TextField, Box, Button, Typography, Modal } from "@mui/material";
import { useState } from "react";
import { GroupService } from "../../../services/grupos/GroupsService";

const styles = {
  campo: {
    marginTop: "20px",
    marginBotton: "20px",
  },
  boton: {
    marginTop: "30px",
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
interface data {
  data: any;
}

export function ModalEditGroups({ data }: data) {
  const [group, setGroup] = useState({ name: "", description: "" });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const resp = await GroupService.agreGroup(group);
      console.log(resp);
    } catch (error) {}
  };
  const handleChange = (e: any) => {
    setGroup({
      ...group,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Button onClick={handleOpen}>Agregar Grupo</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Nuevo Grupo
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Nombre de grupo"
              variant="outlined"
              style={styles.campo}
              name="name"
              onChange={(e) => handleChange(e)}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Descripción"
              variant="outlined"
              style={styles.campo}
              name="description"
              onChange={(e) => handleChange(e)}
            />
            <Button type="submit" style={styles.boton} variant="contained">
              Guardar
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
