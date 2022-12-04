import React, { useEffect, useState, useRef} from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Alert from '@mui/material/Alert';
import ReCAPTCHA from "react-google-recaptcha";

function Report(props){
    const captcha = useRef(null);
    const [options_pokemon, setOptions_pokemon] = useState([]);
    const [pokemon, setPokemon] = useState(props.name!=null?{"id":props.id_pokemon, "label":props.name}:'');
    const [error_pokemon, setErrorPokemon] = useState(props.name!=null?false:true);
    const [error_description, setErrorDescription] = useState(true);
    const [error_captcha, setErrorCaptcha] = useState(false);
    const [description, setDescription] = useState('');
    const [send, setSend] = useState(false);

    useEffect(()=>{
        window.axios.get('/Pokemon_filter',{}).then((result)=>{
            setOptions_pokemon(result.data);
        });
    },[]);
    const Send_Report = ()=>{
        captcha.current.getValue()?setErrorCaptcha(false):setErrorCaptcha(true);
        if(!error_pokemon && !error_description && captcha.current.getValue()){
            window.axios.post('/AddReport',{id:pokemon.id, description:description}).then((result)=>{
                if(result.data=='OK'){
                    setDescription('');
                    setErrorPokemon(true);
                    setErrorDescription(true);
                    captcha.current.reset();
                    setPokemon('');
                    setSend(true);
                }
            })
        }
    }
    return(
        <div className="container mt-3">
            <div className="card">
                <h4 className="card-header">Report an issue</h4>
                <div className="card-body">
                    <h5 className="card-title">Wich Pokémon has a problem?</h5>
                    <div className="row justify-content-center mt-4">
                        <div className="col-md-12">
                            <Autocomplete
                            freeSolo
                            value={pokemon}
                            onChange={(event, newValue) => {
                                newValue==null?setErrorPokemon(true):setErrorPokemon(false);
                                setPokemon(newValue);
                            }}
                            disablePortal
                            id="combo-box-demo"
                            options={options_pokemon}
                            renderInput={(params) => <TextField {...params} error={error_pokemon} label="Pokemon" />}
                            required
                            />
                        </div>
                        <div className="col-md-12 mt-3">
                            <div className="form-group">
                                <label htmlFor="Description">Describe the issue</label>
                                <TextField
                                value={description}
                                sx={{width:'100%'}}
                                onChange={(event) => {
                                    event.target.value==''?setErrorDescription(true):setErrorDescription(false);
                                    setDescription(event.target.value);
                                }}
                                rows={4}
                                id="standard-textarea"
                                multiline
                                error={error_description}
                                variant="filled"
                                />
                            </div>
                        </div>
                        <div className="col-md-12 mt-3" style={{textAlign: '-webkit-center'}}>
                            <ReCAPTCHA ref={captcha} sitekey="6LdiPkMjAAAAALOvHiGulvTUUtTj6PME09GSkqn6" onChange={(e)=>{if(e){setErrorCaptcha(false)}}}/>
                            {error_captcha==true?
                                <p className='text-danger'>Complete de reCAPTCHA</p>
                                :
                                <></>
                            }
                        </div>
                        <div className="col-md-12 mt-3 text-center">
                            <Button type="submit" variant="contained" onClick={Send_Report}>Send Report</Button>
                        </div>
                    </div>
                </div>
            </div>
            {send==true?
                <Alert severity="success"  onClose={() => {setSend(false)}}>Thank you!, your report will help to improve the wiki!.</Alert>
                :
                <></>
            }
        </div>
    )
}
export default Report;

if (document.getElementById('report')) {
    const value = document.getElementById('report').getAttribute("id_pokemon");
    const value2 = document.getElementById('report').getAttribute("name");
    ReactDOM.render(<Report id_pokemon={value} name={value2}/>, document.getElementById('report'));
}
