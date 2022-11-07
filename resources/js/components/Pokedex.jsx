import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
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

const style = {
  width: '100%',
  maxWidth: '65vw',
  maxHeight: '100%',
  position: 'fixed',
  top: '50%',
  left: '18%',
  transform: 'translate(0, -50%)',
  backgroundColor: 'white',
  overflowY: 'auto'
};

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const [dataP, setDataP] = React.useState({});
  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => {
      new ChartJS(document.getElementById('myChart'+props.id),config);
    }, 1000);
  };

  React.useEffect(()=>{
    window.axios.get('/DataPokemon',{params:{id:props.id}}).then((resultado)=>{
      setDataP(resultado.data[0]);
    })
  },[]);

  const handleClose = () => setOpen(false);

  const data = {
    labels: ['HP','ATK','DEF','SP.A','SP.D','SPD' ],
    datasets: [
      {
        label: 'stats',
        data:[dataP.hp, dataP.atk, dataP.def, dataP.sp_atk, dataP.sp_def, dataP.spd],
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)'
      },
    ],
  };

  const config = {
    type: 'radar',
    data: data,
    scaleOverride: true,
    scaleSteps: 10,
    options: {
        scales: {
            r: {
                angleLines: {
                    display: false
                },
                suggestedMin: 0,
            }
        }
    }
  };

  return (
    <div>
      <Button variant="contained" color="info"onClick={handleOpen}>Stats</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="container-fluid m-2" sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
                <div className="row">
                  <div className="col-md-6">
                    <img src={'/images/sprites/'+dataP.sprite}/>
                  </div>
                  <div className="col-md-6" style={{'align-self':'center'}}>
                    <p class="text-break">{dataP.nombre}</p>
                  </div>
                </div>
              </a>
            </div>
          </nav>
          </Typography>
          <div id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="container-fluid p-3">
              <div className="row">
                <div className="col-md-7">
                  <div className="accordion" id="accordionPanelsStayOpenExample">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                          Type
                        </button>
                      </h2>
                      <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                        <div className="accordion-body">
                          <Button variant="contained" style={{backgroundColor:dataP.tipo_1_color, marginRight: '20px' ,minWidth:'140px'}}>
                            {dataP.tipo_1}
                          </Button>
                          {dataP.tipo_2 != "" ?
                            <Button variant="contained" style={{backgroundColor:dataP.tipo_2_color,minWidth:'140px'}}>
                              {dataP.tipo_2}
                            </Button>
                            :''
                          }
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                          Abilities
                        </button>
                      </h2>
                      <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                        <div className="accordion-body">
                        <div class="row">
                          <div class="col-4">
                            <div class="list-group" id="list-tab" role="tablist">
                              <a class="list-group-item list-group-item-action active" id="list-home-list" data-bs-toggle="list" href="#list-home" role="tab" aria-controls="list-home">{dataP.h1n}</a>
                              {dataP.h2n != "" ?
                              <a class="list-group-item list-group-item-action" id="list-profile-list" data-bs-toggle="list" href="#list-profile" role="tab" aria-controls="list-profile">{dataP.h2n}</a>
                              :''}
                              {dataP.h3n != "" ?
                              <a class="list-group-item list-group-item-action" id="list-messages-list" data-bs-toggle="list" href="#list-messages" role="tab" aria-controls="list-messages">{dataP.h3n}</a>
                              :''}
                              </div>
                          </div>
                          <div class="col-8">
                            <div class="tab-content" id="nav-tabContent">
                              <div class="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">{dataP.h1d}</div>
                              <div class="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">{dataP.h2d}</div>
                              <div class="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">{dataP.h3d}</div>
                            </div>
                          </div>
                        </div>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                          Accordion Item #3
                        </button>
                      </h2>
                      <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                        <div className="accordion-body">
                          <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-5">
                  <canvas id={"myChart"+props.id}></canvas>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}