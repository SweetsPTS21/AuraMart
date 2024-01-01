import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import aumartNotFound from "../../../image/aumart-not-found-pgae.png";
import { useDispatch, useSelector } from "react-redux";
import * as reviewActions from "../../../store/actions/reviewActions";
import ReviewCard from "../../layout/ReviewCard";

const userStyles = makeStyles(() => ({
    button: {
        backgroundColor: "#ff424e",
        height: "3em",
        color: "#fff",
        fontSize: "1.2em",
        textTransform: "none",
        "&:focus": {
            outline: "none",
        },
        "&:hover": {
            backgroundColor: "#ff424e",
        },
        margin: 0,
        marginLeft: "1em",
        marginRight: "0.5em",
        marginTop: "2em",
        marginBottom: "1em",
    },
    input: {
        height: "1em !important",
    },
    title: {
        fontSize: "1.1em",
        fontWeight: 400,
        marginBottom: "0.3em",
        color: "rgba(0,0,0,0.8)",
    },
    grid: {
        padding: "0",
        marginTop: "0.5em",
        marginBottom: "0.5em",
        backgroundColor: "white",
        borderRadius: "0.5em",
    },
    grid2: {
        padding: "3em",
        marginTop: "0.6em",
        marginBottom: "0.5em",
        backgroundColor: "white",
        borderRadius: "0.5em",
    },
    removeLinkStyles: {
        textDecoration: "none !important",
    },
    "@global .MuiPaper-root.MuiMenu-paper.MuiPopover-paper.MuiPaper-elevation8.MuiPaper-rounded":
        {
            top: "45% !important",
            left: "70% !important",
        },
    "@global .MuiButton-containedSecondary:hover": {
        border: "1px solid #ff9100",
        backgroundColor: "rgba(255, 145, 0, 0)",
    },
    "@global .MuiRating-decimal .MuiRating-label": {
        display: "inline",
    },
}));

const NoReviews = () => {
    const classes = userStyles();

    return (
        <>
            <div className={classes.title}>My comment</div>
            <div className={classes.grid}>
                <section
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                        flexDirection: "column",
                    }}
                >
                    <img src={aumartNotFound} alt="" />
                    <br />
                    <p>
                        Write a review on the product you have used to provide
                        information useful to everyone
                    </p>
                    <Button variant="contained" className={classes.button}>
                        Continue shopping
                    </Button>
                </section>
            </div>
        </>
    );
};

const Reviews = ({ reviews }) => {
    const classes = userStyles();
    return (
        <>
            <div className={classes.title}>My comments</div>
            <div className={classes.grid}>
                {reviews !== null &&
                    reviews.length > 0 &&
                    reviews.map((review, index) => (
                        <ReviewCard
                            review={review}
                            key={index}
                            type={"order"}
                        />
                    ))}
            </div>
        </>
    );
};

const MyComment = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const reviews = useSelector((state) => state.reviews.userReviews);

    useEffect(() => {
        dispatch(reviewActions.getAllUserReviews(user.id));
    }, [user.id, dispatch]);

    return (
        <div style={{ width: "100%" }}>
            {reviews !== null && reviews.length > 0 ? (
                <Reviews reviews={reviews} />
            ) : (
                <NoReviews />
            )}
        </div>
    );
};

export default MyComment;
