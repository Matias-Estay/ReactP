import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Radar } from 'react-chartjs-2';
import Loader from './Loader.jsx';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
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

export default function PokemonInfo(props) {
  const [loading, setLoading] = React.useState(false);
  const [logged, setLogged] = React.useState(true);
  const [success, setSuccess] = React.useState(false);
  const [image, setImage] = React.useState('poke_ball_base.png');
  const [dataP, setDataP] = React.useState({});
  const [effective_t1, setEffective_1] = React.useState([]);
  const [effective_t2, setEffective_2] = React.useState([]);
  const [evolutions, setEvolutions] = React.useState([[],[]]);
  const [valuetab, setValuetab] = React.useState(0);
  const [weaknesses, setWeaknesses] = React.useState([]);

  React.useEffect(()=>{
    setLoading(true);
    window.axios.get('/DataPokemon',{params:{id:props.id}}).then(async (resultado_1)=>{
        setDataP(resultado_1.data[0]);
        window.axios.get('/DataPokemonTableE',{params:{id:props.id}}).then((resultado_2)=>{
          setEffective_1(resultado_2.data[0]);
          setEffective_2(resultado_2.data[1]);
          window.axios.post('/AllTypesFilter',{type_1:resultado_1.data[0].id_tipo_1,type_2:resultado_1.data[0].id_tipo_2}).then((resultado_3)=>{
            setWeaknesses(resultado_3.data);
            window.axios.get('/EvolutionsByID',{params:{id:props.id}}).then((resultado_ev)=>{
              setEvolutions(resultado_ev.data);
              setTimeout(() => {
                  setLoading(false);
              }, 1500);
            });
          });
        });
    });
  },[])

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  const Favorite_mouse_event = (event, id='-1')=>{
      switch(event.type){
        case 'mouseenter':
          setImage('poke_ball_red.png')
          break;
        case 'mouseleave':
          setImage('poke_ball_base.png');
          break;
        case 'click':
          setImage('poke_ball_captured.png');
            window.axios.post('/AddFavorite',{id:props.id}).then(resultado=>{
              setLogged(true);
              setSuccess(true);
            }).catch(function (error) {
              setLogged(false);
            });
          break;
      }
  };
  const Favorite_delete_mouse_event = (event, id='-1')=>{
    switch(event.type){
      case 'mouseenter':
        setImage('poke_ball_release.png');
        break;
      case 'mouseleave':
        setImage('poke_ball_base.png');
        break;
      case 'click':
        setImage('poke_ball_release.png');
          window.axios.post('/DeleteFavorite',{id:props.id}).then(resultado=>{
            setLogged(true);
            setSuccess(true);
          }).catch(function (error) {
            setLogged(false);
          });
        break;
    }
  }
  const handleChange = (event, newValue) => {
    setValuetab(newValue);
  };

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
  const options = {
    scales: {
        r: {
            angleLines: {
                display: false
            },
            suggestedMin: 0,
        }
    },
  };

  return (
    <>
    <Loader loading={loading}></Loader>
    <div className='container w-100 h-100 bg-light d-table'>
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <img src={'/images/sprites/'+dataP.sprite}/>
                {dataP.nombre}
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    {props.handleClose!=null?
                        <li class="nav-item">
                            <a class="nav-link" href="#" onClick={()=>{window.open('/pokemon?id='+props.id)}}>Open in new tab</a>
                        </li>
                    :<></>}
                </ul>
                <div className='d-flex'>
                    {props.handleClose!=null?
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Button variant="outlined" color="error" onClick={props.handleClose}>Close</Button>
                            </li>
                        </ul>
                    :<></>}
                </div>
            </div>
        </div>
        </nav>
        <div className="container-fluid p-3">
            <div className="row">
                <div className="col-md-12">
                <div className="accordion" id="accordionPanelsStayOpenExample">
                    <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                        Types
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
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={valuetab} onChange={handleChange}>
                                <Tab label={dataP.h1n}  id={'simple-tab-'+0} aria-controls ={'simple-tabpanel-'+0}/>
                                {dataP.h2n!=''?
                                <Tab label={dataP.h2n} id={'simple-tab-'+1} aria-controls ={'simple-tabpanel-'+1}/>
                                :''
                                }
                                {dataP.h3n!=''?
                                <Tab label={dataP.h3n} id={'simple-tab-'+2} aria-controls ={'simple-tabpanel-'+2}/>
                                :''
                                }
                                </Tabs>
                            </Box>
                            <TabPanel value={valuetab} index={0}>
                                {dataP.h1d}
                            </TabPanel>
                            {dataP.h2d!=''?
                            <TabPanel value={valuetab} index={1}>
                                {dataP.h2d}
                            </TabPanel>:''
                            }
                            {dataP.h3d!=''?
                            <TabPanel value={valuetab} index={2}>
                                {dataP.h3d}
                            </TabPanel>:''
                            }
                        </Box>
                    </div>
                    </div>
                    <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                        Effectiveness
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                        <div className="accordion-body" style={{overflow:'overlay'}}>
                            <table className="table">
                                <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Base Type</th>
                                    <th scope="col">Strong Against</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th scope="row">
                                    {effective_t1.length==0?'':
                                    <Button variant="contained" className='mt-2' style={{backgroundColor:effective_t1[0].color_type, marginRight: '20px' ,minWidth:'140px'}}>
                                        {effective_t1[0].type}
                                    </Button>}
                                    </th>
                                    <td>
                                    {effective_t1.map(x=>
                                        (
                                        <Button variant="contained" className='mt-2' style={{backgroundColor:x.color, marginRight: '20px' ,minWidth:'140px'}} key={x.efective}>
                                        {x.efective}
                                        </Button>
                                        )
                                    )
                                    }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                    {effective_t2.length==0?'':
                                    <Button variant="contained" className='mt-2' style={{backgroundColor:effective_t2[0].color_type, marginRight: '20px' ,minWidth:'140px'}}>
                                        {effective_t2[0].type}
                                    </Button>}
                                    </th>
                                    <td>
                                    {effective_t2.map(x=>
                                        (
                                        <Button variant="contained" className='mt-2' style={{backgroundColor:x.color, marginRight: '20px' ,minWidth:'140px'}} key={x.efective}>
                                        {x.efective}
                                        </Button>
                                        )
                                    )
                                    }
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    </div>
                    <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingFour">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                        Weaknesses
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseFour" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFour">
                        <div className="accordion-body" style={{overflow:'overlay'}}>
                        {weaknesses.map(x=>
                        (
                            <div key={x.id+20}>
                                {x.multiplicador!=undefined && x.multiplicador!=1 && x.multiplicador!=0?
                                    <div className="row mt-5 justify-content-center" key={x.id+100}>
                                        <Button variant="contained" className='mt-2' style={{backgroundColor:x.color, marginRight: '20px' ,minWidth:'140px', maxWidth:'140px'}}>
                                            {x.nombre+" "}  {"x"+x.multiplicador}
                                        </Button>
                                        {
                                            x.multiplicador=='4'?
                                            <p className='pokemon-solid' style={{minWidth:'140px', maxWidth:'140px'}}>Super Effective!</p>
                                            :
                                            <p className='pokemon-solid' style={{minWidth:'140px', maxWidth:'140px'}}>Effective</p>
                                        }
                                    </div>
                                    :
                                    ''
                                }
                            </div>
                        )
                        )
                        }
                        </div>
                    </div>
                    </div>
                    <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingFive">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFive" aria-expanded="false" aria-controls="panelsStayOpen-collapseFive">
                        Evolutions
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseFive" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFive">
                        <div className="accordion-body">
                            <div className='container-fluid' >
                                <div className="row">
                            {
                                evolutions[1]=='CASO 2'?
                                    <>
                                    {
                                        evolutions[0].map((item,index)=>{
                                            return(
                                                <>
                                                {item.mega==undefined?
                                                    <>
                                                        <div className='col-md-2 align-self-center' key={item.id}>
                                                            <img src={'/images/sprites/'+item.sprite}/>
                                                            {item.nombre}
                                                        </div>
                                                            {index!=evolutions[0].length-1?
                                                                <div className="col-md-1 align-self-center">
                                                                    <ArrowForwardIcon/>
                                                                    <div className="row">
                                                                        <p className='pokemon-solid'>{item.nivel!=undefined?'Lv:':''}{item.nivel}</p>
                                                                    </div>
                                                                </div>

                                                            :<></>
                                                            }
                                                    </>
                                                    :<></>
                                                }
                                                </>
                                            )
                                        })
                                    }
                                    <div className="col-md-2">
                                        {
                                            evolutions[0].map((item)=>{
                                                return(
                                                    <>
                                                    {item.mega==1?
                                                        <div className="col-md-12 text-center">
                                                            <img src={'/images/sprites/'+item.sprite}/>
                                                            {item.nombre}
                                                        </div>
                                                        :
                                                        <></>
                                                    }
                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                    </>

                                :
                                evolutions[0].map(item=>{
                                    return(
                                        <div key={item.id}>
                                            <img src={'/images/sprites/'+item.sprite}/>
                                            {item.nombre}
                                        </div>
                                    )
                                })

                            }

                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div className="row justify-content-center mt-2">
                <div className="col-sm-12 col-md-12 col-xl-6">
                    <Radar options={options}  data={data}/>
                </div>
            </div>
            <div className="row">
                {dataP.favorite =='-1' || dataP.favorite==null ?
                <div className="col-md-12 text-center">
                    <p className='pokemon-solid'>Add to Favorites!</p>
                    <Button onMouseLeave={Favorite_mouse_event} onMouseEnter={Favorite_mouse_event} onClick={Favorite_mouse_event} className='favorite'>
                        <img src={'/images/'+image} style={{maxWidth:'50px'}}></img>
                    </Button>
                </div>
                :
                <div className="col-md-12 text-center">
                    <p className='pokemon-solid'>Release</p>
                    <Button onMouseLeave={Favorite_delete_mouse_event} onMouseEnter={Favorite_delete_mouse_event} onClick={Favorite_delete_mouse_event} className='favorite'>
                    <img src={'/images/'+image} style={{maxWidth:'50px'}}></img>
                    </Button>
                </div>
                }
                {logged==false?
                <div className="alert alert-danger text-center" role="alert">
                You have to be logged in to add a pokémon to your favorites.
                </div>
                :''
                }
                {success==true?
                <div className="alert alert-success text-center" role="alert">
                Completed!
                </div>
                :''
                }
            </div>
        </div>
    </div>
    </>
  );
}
