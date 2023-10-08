import React from 'react'
import userStyles from "../../styles/InfoBarStyles";
import InfoBar1 from '../../image/infoBar1.png'
import InfoBar2 from '../../image/infoBar2.png'
import InfoBar3 from '../../image/infoBar3.png'
import {Link} from "react-router-dom";
import Ripples from 'react-ripples'
import { Grid } from '@material-ui/core';


const ProductDeal = (props) => {
    const classes = userStyles();
    return (
        <div style={{display: 'flex', alignItems: 'center', padding: '0.5em'}}>
            <Grid container className={classes.container} spacing={2}>
                <Grid item xs={1}>
                    <Ripples>
                        <Link to={"#"}>
                            <img src={InfoBar1} alt="Info" style={{width: '100%'}}/>
                        </Link>
                    </Ripples>
                </Grid>
                <Grid item xs={1}>
                    <Ripples>
                        <Link to={"#"}>
                            <img src={InfoBar2} alt="Info" style={{width: '100%'}}/>
                        </Link>
                    </Ripples>
                </Grid>
                <Grid item xs={1}>
                    <Ripples>
                        <Link to={"#"}>
                            <img src={InfoBar3} alt="Info" style={{width: '100%'}}/>
                        </Link>
                    </Ripples>
                </Grid>
            </Grid>

        </div>
    )
};

export default ProductDeal
