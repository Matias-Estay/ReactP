import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Radar } from 'react-chartjs-2';
import Weakness from './Weakness.jsx';
import Loader from './Loader.jsx';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SdCardAlertIcon from '@mui/icons-material/SdCardAlert';
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
import { height } from '@mui/system';

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
            setLoading(true);
            window.axios.post('/AddFavorite',{id:props.id}).then(resultado=>{
                setLogged(true);
                setSuccess(true);
                setLoading(false);
            }).catch(function (error) {
                console.log(error);
                setLogged(false);
                setLoading(false);
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
        setLoading(true);
        setImage('poke_ball_release.png');
          window.axios.post('/DeleteFavorite',{id:props.id}).then(resultado=>{
            setLogged(true);
            setSuccess(true);
            setLoading(false);
          }).catch(function (error) {
            console.log(error)
            setLogged(false);
            setLoading(false);
          });
        break;
    }
  }
  const handleChange = (event, newValue) => {
    setValuetab(newValue);
  };
  const SendReport = ()=>{
    window.open('/report?id='+props.id+'&name='+dataP.nombre);
  };

  const data = {
    labels: ['HP','ATK','DEF','SPD','SP.D','SP.A' ],
    datasets: [
      {
        label: 'stats',
        data:[dataP.hp, dataP.atk, dataP.def, dataP.spd, dataP.sp_def, dataP.sp_atk],
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
                <img className='sprite' src={'/images/sprites/'+dataP.sprite}/>
                {dataP.nombre}
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent-pokemon" aria-controls="navbarSupportedContent-pokemon" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent-pokemon">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    {props.handleClose!=null?
                        <li class="nav-item">
                            <a class="nav-link" href="#" onClick={()=>{window.open('/pokemon?id='+props.id)}}>Open in new tab</a>
                        </li>
                    :<></>}
                </ul>
                <div className='d-flex'>

                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <Button className='me-3' variant="outlined" color="error" onClick={SendReport}>
                            <SdCardAlertIcon/>
                        </Button>
                    </li>
                    {props.handleClose!=null?
                            <li class="nav-item">
                                <Button variant="outlined" color="error" onClick={props.handleClose}>Close</Button>
                            </li>
                    :<></>}
                    </ul>
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

                            <Button variant="contained" style={{backgroundColor:dataP.tipo_1_color,color:dataP.tipo_1_color_l, marginRight: '20px' ,minWidth:'140px'}}>
                                {dataP.tipo_1}
                            </Button>
                            {dataP.tipo_2 != "" ?
                                <Button variant="contained" style={{backgroundColor:dataP.tipo_2_color,color:dataP.tipo_2_color_l,minWidth:'140px'}}>
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
                                            <th scope="col" className='pokemon-solid'>Base Type</th>
                                            <th scope="col" className='pokemon-solid'>Strong Against</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <th scope="row">
                                            {effective_t1.length==0?'':
                                            <Button variant="contained" className='mt-2' style={{backgroundColor:effective_t1[0].color_type, color:effective_t1[0].color_letra, marginRight: '20px' ,minWidth:'140px'}}>
                                                {effective_t1[0].type}
                                            </Button>}
                                            </th>
                                            <td>
                                            {effective_t1.map(x=>
                                                (
                                                <Button variant="contained" className='mt-2' style={{backgroundColor:x.color, color:x.color_letra, marginRight: '20px' ,minWidth:'140px'}} key={x.efective}>
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
                                                <Button variant="contained" className='mt-2' style={{backgroundColor:x.color, color:x.color_letra, marginRight: '20px' ,minWidth:'140px'}} key={x.efective}>
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
                                    <Weakness weaknesses={weaknesses}></Weakness>
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
                                            evolutions.map((item,index,array_t)=>{
                                                return(
                                                    <div className="col-md-3">
                                                        {item.map((item_f,index2,array)=>{
                                                            return(
                                                                <div className="row" style={{minHeight:'175px'}}>
                                                                    {index2==0 || (array[index2-1]!=undefined && array[index2].id!=array[index2-1].id)?
                                                                        <div className="col-md-6 align-self-center text-center" >
                                                                            <div className="row justify-content-center">
                                                                                <div className="col-md-12 text-center">
                                                                                    <img className='hand sprite' onClick={()=>{window.open('/pokemon?id='+item_f.id)}} src={"images/sprites/"+item_f.sprite}/>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row justify-content-center">
                                                                                <div className="col-md-12 text-center">
                                                                                    {item_f.nombre}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    :<div className="col-md-6 align-self-center text-center"/>}
                                                                    {array_t[index+1]!=undefined && array_t[index+1].length>index2?
                                                                        <div className="col-md-6 align-self-center text-center mt-3">
                                                                            <div className="row justify-content-center">
                                                                                <div className="col-md-12 text-center">
                                                                                    <ArrowForwardIcon/>
                                                                                </div>
                                                                            </div>
                                                                            {item_f.nivel!=0?
                                                                                <div className="row justify-content-center">
                                                                                    <div className="col-md-12 text-center">
                                                                                        <p className='pokemon-solid'>Lv: {item_f.nivel}</p>
                                                                                    </div>
                                                                                </div>
                                                                            :<></>}
                                                                            {item_f.sprite_item!=''?
                                                                                <div className="row justify-content-center">
                                                                                    <div className="col-md-6 text-center">
                                                                                        <div className="row">
                                                                                            <div className="col-md-12">
                                                                                                <img src={"images/objects/"+item_f.sprite_item} style={{maxHeight:'32px', maxWidth:'32px'}}/>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="row">
                                                                                            <p>{item_f.item}</p>
                                                                                        </div>
                                                                                    </div>
                                                                                    {item_f.sprite_item_2!=''?
                                                                                        <div className="col-md-6 text-center">
                                                                                            <img src={"images/objects/"+item_f.sprite_item_2} style={{maxHeight:'32px', maxWidth:'32px'}}/>
                                                                                            <p>{item_f.item_2}</p>
                                                                                        </div>
                                                                                        :<></>
                                                                                    }
                                                                                </div>
                                                                            :<></>}
                                                                            <div className="row justify-content-center">
                                                                                <div className="col-md-12 text-center">
                                                                                    <p >{item_f.condicion}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    :<></>
                                                                    }
                                                                </div>

                                                            )
                                                        })}
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
