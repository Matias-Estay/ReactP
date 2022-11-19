import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';

function Welcome(props){
    return(
        <div className="container-fluid vh-100">
            <div className="row justify-content-center vh-100" style={{alignContent: 'center'}}>
                <div className="col-lg-3"/>
                <div className="col-lg-6 text-center">
                    <div className="row justify-content-center mt-5 mb-5 pt-5 pb-5">
                        <img src="/images/poke_ball_base.png" className='spin' alt="Not found" style={{minWidth: '300px', maxWidth:'300px'}}/>
                    </div>
                    <div className="row justify-content-center mt-5 pt-5">
                        <div className="col-lg-5">
                            <Button href="/index" variant="contained" color="error">Go to the pokédex</Button>
                        </div>
                    </div>
                    <div className="row justify-content-center mt-5">
                        <div className="col-lg-5">
                            Programed by Matías Estay<br/>
                            {props.laravel}<br/>
                            React 17.0.2
                        </div>
                    </div>
                </div>
                <div className="col-md-3"/>
            </div>
        </div>
    )
}
export default Welcome;

if (document.getElementById('welcome')) {
    const value = document.getElementById('welcome').getAttribute("laravel");
    ReactDOM.render(<Welcome laravel={value}/>, document.getElementById('welcome'));
}
