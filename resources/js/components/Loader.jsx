import * as React from 'react';
function overlay(props){
    return(
        <div>
            {props.loading==true?
                <div className="container-fluid box-overlay">
                    <div className="row spinner-overlay">
                        <div className="spinner-grow text-primary" role="status"/>
                        <div className="spinner-grow text-secondary" role="status"/>
                        <div className="spinner-grow text-success" role="status"/>
                        <div className="spinner-grow text-danger" role="status"/>
                    </div>
                </div>
                :<div></div>
            }
        </div>
    )
}
export default overlay;