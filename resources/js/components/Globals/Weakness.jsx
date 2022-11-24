import * as React from 'react';
import Button from '@mui/material/Button';
function Weakness(props){
    return(
        <div className="container-fluid">
            <div className="row mt-5 justify-content-center" >
                {props.weaknesses.map((x,index)=>{
                        return(
                            <div className="col-md-2 mt-3" key={index}>
                                <h6 className='pokemon-solid'>
                                    {index==0 && props.weaknesses.length>1?'Inmune':index==1?'Very Ineffective':index==2?'Ineffective':index==3?'Effective':index==4?'Very Effective':''}
                                </h6>
                                {x.map(item=>{
                                    return(
                                        <div className='row mt-2'>

                                            <Button variant="contained" className='mt-2' style={{backgroundColor:item.color, color:item.color_letra, marginRight: '20px' ,minWidth:'140px', maxWidth:'140px'}}>
                                                {item.nombre+" "}  {"x"+item.multiplicador}
                                            </Button>

                                        </div>
                                    )
                                })
                            }
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}
export default Weakness;
