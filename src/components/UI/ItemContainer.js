import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Countdown from "react-countdown-now";
import sprite from "../../image/sprite.png";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

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
    hideArrow: {
        display: "none"
    }
}));

const ItemContainer = (props) => {
    const classes = userStyles();

    const length = props.length < 10 ? props.length : 10;
    const [scrollX, setScrollX] = useState(0);
    const listRef = useRef(null);

    const handleScroll = (direction) => {
        const scrollAmount = direction === "left" ? -970 : 970;
        setScrollX(scrollX + scrollAmount);
        listRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    const canScrollLeft = scrollX > 0;
    const canScrollRight = scrollX < (length-5) * 194;

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
            <Grid
                container
                className={classes.grid}
                style={{ flexDirection: "column" }}
            >
                {props.todayOnly ? (
                    <Grid item xs={12} className={classes.todayOnly}>
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
                    item
                    xs={12}
                    className={classes.grid}
                    style={{position: "relative", display: "flex", alignItems: "center" }}
                >
                    <IconButton
                        onClick={() => handleScroll("left")}
                        style={{position: 'absolute', left: "-30px", backgroundColor: "white"}}
                        className={!canScrollLeft ? classes.hideArrow : "hideArrow"}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <div
                        style={{
                            display: "flex",
                            width: "1205px",
                            overflow: "hidden",
                        }}
                    >
                        <List
                            ref={listRef}
                            style={{
                                display: "flex",
                                padding: 0,
                                margin: 0,
                                transform: `translateX(${-scrollX}px)`,
                            }}
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
                                          style={{ maxWidth: "194px", margin: "0 5px" }}
                                      >
                                          {item}
                                      </Grid>
                                  ))
                                : null}
                        </List>
                    </div>
                    <IconButton
                        onClick={() => handleScroll("right")}
                        style={{position: 'absolute', right: "-30px", backgroundColor: "white"}}
                        className={!canScrollRight ? classes.hideArrow : "hideArrow"}
                    >
                        <ArrowForwardIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    );
};

export default ItemContainer;
