import * as React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import PokemonInfo from './PokemonInfo.jsx';
import Box from '@mui/material/Box';
import {
  Chart as ChartJS,
  RadialLinearScale,
  RadarController,
  PointElement,
  LineElement,
  LineController,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  RadarController,
  PointElement,
  LineElement,
  LineController,
  Filler,
  Tooltip,
  Legend
);

export default function PokedexModal(props) {
  const [open, setOpen] = React.useState(false);
  const [logged, setLogged] = React.useState(true);
  const [success, setSuccess] = React.useState(false);

  const style={
    width: '100%',
    height: '100%',
    marginTop: 'auto',
    top: '0%',
    display: 'flex',
    overflow: 'auto',
  }

  const handleClose = () => {
    setOpen(false);
    setLogged(true);
    setSuccess(false);
    props.Update_data();
  };

  const handleOpen = async () => {
    setOpen(true);
  }

  return (
    <>
      <Button variant="contained" style={{minWidth:'100px'}} className='me-2 mt-2' color="info" onClick={handleOpen}>Stats</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
            <Box id="modal-modal-description" style={style} sx={{ mt: 2 }}>
                <PokemonInfo id={props.id} handleClose={handleClose}/>
            </Box>
       </Modal>
    </>
  );
}
