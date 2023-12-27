import React from 'react'
import userStyles from "../../styles/InfoBarStyles";
import InfoBar1 from '../../image/infoBar1.png'
import InfoBar2 from '../../image/infoBar2.png'
import InfoBar3 from '../../image/infoBar3.png'
import {Link} from "react-router-dom";
import Ripples from 'react-ripples'
import { Grid, Typography } from '@material-ui/core';


const AumartInfo = () => {
    const classes = userStyles();
    return (
        <div style={{display: 'flex', alignItems: 'center', padding: '0.5em'}}>
            <Grid container className={classes.container} spacing={2}>
                <Grid item xs={4} className={classes.item}>
                    <Ripples>
                        <Link to={"#"} className={classes.removeLinkStyle}>
                            <img className={classes.icon} src={InfoBar1} alt="Info"/>
                            <Typography className={classes.text}>Sản phẩm chính hãng</Typography>
                        </Link>
                    </Ripples>
                </Grid>
                <Grid item xs={4}>
                    <Ripples>
                        <Link to={"#"} className={classes.removeLinkStyle}>
                            <img className={classes.icon} src={InfoBar2} alt="Info"/>
                            <Typography className={classes.text}>Sản phẩm yêu thích</Typography>
                        </Link>
                    </Ripples>
                </Grid>
                <Grid item xs={4}>
                    <Ripples>
                        <Link to={"#"}className={classes.removeLinkStyle}>
                            <img className={classes.icon} src={InfoBar3} alt="Info"/>
                            <Typography className={classes.text}>Giao hàng nhanh chóng</Typography>
                        </Link>
                    </Ripples>
                </Grid>
            </Grid>

        </div>
    )
};

export default AumartInfo
