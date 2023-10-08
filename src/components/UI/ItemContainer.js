import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Countdown from "react-countdown-now";
import sprite from "../../image/sprite.png";
import IconButton from "@material-ui/core/IconButton";

const userStyles = makeStyles(() => ({
    root: {
        margin: "0",
        padding: "0.5em",
    },
    title: {
        fontSize: "1.2em",
        fontWeight: 400,
        marginBottom: "0.5em",
    },
    grid: {
        padding: "0.5em",
        backgroundColor: "white",
        borderRadius: "0.5em",
    },
    timer: {
        width: "40%",
        marginLeft: "1.5em",
        fontSize: "1em",
        color: "#858585",
    },
    todayOnly: {
        padding: "12px 12px 0 12px",
        fontSize: "1em",
        color: "#858585",
    },
}));

const ItemContainer = (props) => {
    const classes = userStyles();
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <span>Offer is over!</span>;
        } else {
            if (days !== 0) {
                return (
                    <span>
                        {days} days {hours}:{minutes}:{seconds}
                    </span>
                );
            }
            // Render a countdown
            return (
                <span>
                    {hours}:{minutes}:{seconds}
                </span>
            );
        }
    };
    return (
        <div className={classes.root} style={{ ...props.style }}>
            {props.title !== undefined ? (
                <div className={classes.title}>{props.title}</div>
            ) : (
                <section
                    style={{
                        backgroundColor: "white",
                        padding: "12px",
                        marginBottom: "16px",
                        borderRadius: "0.5em",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                            aria-label="where do you want to shop to?"
                            color="inherit"
                            style={{ padding: 0, display: "inline-block" }}
                        >
                            <i
                                style={{
                                    backgroundImage: `url(${sprite}?v=100000000)`,
                                    backgroundPosition: "-95px 0",
                                    width: "48px",
                                    height: "48px",
                                    marginRight: "0.1em",
                                }}
                            />
                        </IconButton>
                        <p
                            style={{
                                display: "inline-block",
                                marginBottom: "0.3em",
                            }}
                        >
                            <span style={{ color: "#FF4C57", fontWeight: 700 }}>
                                Tiki Deal
                            </span>{" "}
                            <br />
                            Hourly updates of all special deals on Tiki.
                            Bookmark this page and come back often so you don't
                            miss it!
                        </p>
                    </div>
                </section>
            )}
            {/* Render countdown item */}
            <Grid container className={classes.grid}>
                {props.todayOnly ? (
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        className={classes.todayOnly}
                    >
                        <span style={{ fontWeight: 700 }}>Giá tốt hôm nay</span>

                        {props.timeInMilliSec && (
                            <span className={classes.timer}>
                                <Countdown
                                    date={Date.now() + props.timeInMilliSec}
                                    renderer={renderer}
                                />
                            </span>
                        )}
                    </Grid>
                ) : null}

                <Grid
                    container
                    className={classes.grid}
                    style={{ ...props.gridStyle }}
                >
                    {props.children
                        ? props.children.map((item, index) => (
                              <Grid
                                  item
                                  xs={5}
                                  sm={3}
                                  md={
                                      props.space !== undefined
                                          ? props.space
                                          : 3
                                  }
                                  key={index}
                                  style={{ maxWidth: "194px" }}
                              >
                                  {item}
                              </Grid>
                          ))
                        : null}
                </Grid>
            </Grid>
        </div>
    );
};

export default ItemContainer;
