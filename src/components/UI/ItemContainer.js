import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, List, Pagination } from "@mui/material";
import Countdown from "react-countdown-now";
import sprite from "../../image/sprite.png";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const userStyles = makeStyles(() => ({
    root: {
        margin: "0",
        marginBottom: "1em",
    },
    title: {
        fontSize: "1.2em",
        fontWeight: 400,
        paddingTop: "16px",
        padding: "0 12px",
    },
    grid: {
        padding: "0.5em",
        backgroundColor: "white",
        borderRadius: "0.5em",
    },
    timer: {
        marginLeft: "1em",
        fontSize: "1em",
    },
    todayOnly: {
        padding: "12px",
        fontSize: "1em",
        color: "#858585",
    },
    hideArrow: {
        display: "none",
    },
}));

// Place item in a slide
const Type1 = (props) => {
    const classes = userStyles();
    const listRef = useRef(null);

    const { listData, length, itemWidth } = props;
    const [scrollX, setScrollX] = useState(0);
    const handleScroll = (direction) => {
        const scrollAmount = direction === "left" ? -900 : 900;
        setScrollX(scrollX + scrollAmount);
        listRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    const canScrollLeft = scrollX > 0;
    const canScrollRight = scrollX < (length - 5) * 170;

    return (
        <Grid
            item
            xs={12}
            className={classes.grid}
            style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
            }}
        >
            <IconButton
                onClick={() => handleScroll("left")}
                style={{
                    position: "absolute",
                    left: "-30px",
                    backgroundColor: "white",
                }}
                className={!canScrollLeft ? classes.hideArrow : "hideArrow"}
            >
                <ArrowBackIcon />
            </IconButton>
            <div
                style={{
                    display: "flex",
                    // width: "1205px",
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
                    {listData.length > 0 &&
                        listData.map((item, index) => (
                            <Grid
                                item
                                xs={5}
                                sm={3}
                                md={props.space !== undefined ? props.space : 3}
                                key={index}
                                style={{
                                    maxWidth: itemWidth,
                                    margin: "0 5px",
                                }}
                            >
                                {item}
                            </Grid>
                        ))}
                </List>
            </div>
            <IconButton
                onClick={() => handleScroll("right")}
                style={{
                    position: "absolute",
                    right: "-30px",
                    backgroundColor: "white",
                }}
                className={!canScrollRight ? classes.hideArrow : "hideArrow"}
            >
                <ArrowForwardIcon />
            </IconButton>
        </Grid>
    );
};

// Place item in a grid
const Type2 = (props) => {
    const { listData, itemWidth } = props;
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <>
            <Grid
                item
                xs={12}
                style={{
                    padding: "1em",
                    borderRadius: "0.5em",
                    position: "relative",
                    display: "flex",
                    flexWrap: "wrap",
                }}
            >
                {listData.length > 0 &&
                    listData
                        .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                        .map((item, index) => (
                            <Grid
                                item
                                key={index}
                                style={{
                                    maxWidth: itemWidth,
                                    marginRight: "5px",
                                    marginBottom: "5px",
                                }}
                            >
                                {item}
                            </Grid>
                        ))}
            </Grid>
            <Pagination
                count={Math.ceil(listData.length / itemsPerPage)}
                page={page}
                onChange={handlePageChange}
                color="primary"
                style={{
                    marginTop: "1em",
                    marginBottom: "1em",
                    display: "flex",
                    justifyContent: "center",
                }}
            />
        </>
    );
};

const ItemContainer = (props) => {
    const classes = userStyles();
    const { type } = props;
    const length = props.length;
    const listData = props.children ? props.children : [];
    const itemWidth = props.itemWidth ? props.itemWidth : "170px";

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
                    <span
                        style={{
                            backgroundColor: "#FF4C57",
                            color: "#fff",
                            padding: "4px 6px",
                            borderRadius: "5px",
                            fontWeight: 700,
                        }}
                    >
                        {hours}
                    </span>
                    <span
                        style={{
                            fontSize: "1.2em",
                            fontWeight: "600",
                            margin: "0 0.2em",
                        }}
                    >
                        :
                    </span>
                    <span
                        style={{
                            backgroundColor: "#FF4C57",
                            color: "#fff",
                            padding: "4px 6px",
                            borderRadius: "5px",
                            fontWeight: 700,
                        }}
                    >
                        {minutes}
                    </span>
                    <span
                        style={{
                            fontSize: "1.2em",
                            fontWeight: "600",
                            margin: "0 0.2em",
                        }}
                    >
                        :
                    </span>
                    <span
                        style={{
                            backgroundColor: "#FF4C57",
                            color: "#fff",
                            padding: "4px 6px",
                            borderRadius: "5px",
                            fontWeight: 700,
                        }}
                    >
                        {seconds}
                    </span>
                </span>
            );
        }
    };

    return (
        <div className={classes.root} style={{ ...props.style }}>
            {props.title !== undefined ? null : (
                <section
                    style={{
                        backgroundColor: "white",
                        padding: "12px",
                        margin: "1em 0",
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
                                Deal hot nhất
                            </span>{" "}
                            <br />
                            <span style={{ fontSize: "1em" }}>
                                Cập nhật liên tục hàng giờ. Nhanh tay thêm vào
                                giỏ hàng để có được mức giá tốt nhất
                            </span>
                        </p>
                    </div>
                </section>
            )}
            {/* Render countdown item */}
            <Grid
                container
                style={{
                    flexDirection: "column",
                    backgroundColor: "white",
                    borderRadius: "0.5em",
                }}
            >
                <div className={classes.title}>{props.title}</div>
                {props.todayOnly ? (
                    <Grid item xs={12} className={classes.todayOnly}>
                        <span
                            style={{
                                fontSize: "1.2em",
                                fontWeight: 600,
                                color: "#3c4858",
                            }}
                        >
                            Giá tốt hôm nay
                        </span>

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
                {type === "slider" ? (
                    <Type1
                        space={props.space}
                        listData={listData}
                        length={length}
                        itemWidth={itemWidth}
                    />
                ) : (
                    <Type2
                        space={props.space}
                        listData={listData}
                        itemWidth={itemWidth}
                    />
                )}
            </Grid>
        </div>
    );
};

export default ItemContainer;
