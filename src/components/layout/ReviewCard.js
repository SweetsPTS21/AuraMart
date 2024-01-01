import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as reviewActions from "../../store/actions/reviewActions";
import { message } from "antd";

import Rating from "@material-ui/lab/Rating";

import { Delete, Edit, Save } from "@material-ui/icons";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import {
    Button,
    FormControl,
    FormGroup,
    Grid,
    TextareaAutosize,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Moment from "react-moment";

const userStyles = makeStyles(() => ({
    button: {
        backgroundColor: "#ff424e",
        height: "2em",
        width: "5em",
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
        marginTop: "1em",
    },
    button__secondary: {
        backgroundColor: "#fff",
        height: "2em",
        width: "5em",
        color: "#ff424e",
        border: "1px solid #ff424e",
        fontSize: "1.2em",
        textTransform: "none",
        "&:focus": {
            outline: "none",
        },
        "&:hover": {
            backgroundColor: "#fff",
        },
        margin: 0,
        marginTop: "1em",
    },
    input: {
        height: "1em !important",
    },
}));

const ReviewCard = (props) => {
    const { product, review, type } = props;
    const classes = userStyles();
    const dispatch = useDispatch();
    const nameShort = review.user.name
        ? review.user.name
              .split(/\s/)
              .reduce((response, word) => (response += word.slice(0, 1)), "")
        : null;
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(review.text);
    const [title, setTitle] = useState(review.title);
    const [rating, setRating] = useState(review.rating);
    const [isLoading, setIsLoading] = useState(false);

    const user = useSelector((state) => state.auth.user);

    // fixed bug when user tires to edit review after user deletes a review and adds new review
    useEffect(() => {
        setText(review.text);
        setTitle(review.title);
        setRating(review.rating);
    }, [review]);

    const handleUpdateReview = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const msg = message.loading("Updating review!", 0);
        const review_ = { text, title, rating };
        await dispatch(
            reviewActions.updateReviewById(
                review_,
                review._id,
                review.product.id,
                review.user._id
            )
        );
        setTimeout(msg, 1);
        setIsEditing(false);
        setIsLoading(false);
    };

    const handleDeleteReview = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const msg = message.loading("Deleting review!", 0);
        await dispatch(
            reviewActions.deleteReviewById(
                review._id,
                product.id,
                review.user._id
            )
        );
        setTimeout(msg, 1);
        setIsLoading(false);
    };

    return (
        <ValidatorForm onSubmit={handleUpdateReview}>
            <FormGroup style={{flexWrap: "nowrap"}}>
                <div style={{ borderBottom: "1px solid #ccc" }}>
                    <Grid container style={{ padding: "1em" }}>
                        <Grid
                            item
                            xs={2}
                            style={{ margin: "0", textAlign: "center" }}
                        >
                            {type === "product" && (
                                <>
                                    <span
                                        style={{
                                            borderRadius: "50%",
                                            backgroundColor: "#d3d2d3",
                                            color: "#919090",
                                            fontWeight: 500,
                                            textAlign: "center",
                                            width: "65px",
                                            height: "65px",
                                            display: "inline-block",
                                            lineHeight: "65px",
                                        }}
                                    >
                                        {nameShort}
                                    </span>
                                    <p>{review.user.name}</p>
                                </>
                            )}
                            {type === "order" && (
                                <>
                                    <img
                                        src={review.product.photo}
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                        }}
                                    />
                                    <p
                                        style={{
                                            margin: "0",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        {review.product.name}
                                    </p>
                                </>
                            )}
                        </Grid>
                        <Grid
                            item
                            container
                            xs={10}
                            style={{ textAlign: "left", paddingLeft: "2em" }}
                        >
                            <Grid item xs={8}>
                                <span>
                                    <div
                                        style={{
                                            marginBottom: "0",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "start",
                                        }}
                                    >
                                        {user.id === review.user._id &&
                                        isEditing ? (
                                            <Rating
                                                name="hover-feedback"
                                                size={"large"}
                                                style={{
                                                    display: "inline-flex",
                                                }}
                                                value={rating}
                                                precision={1}
                                                onChange={(newValue) => {
                                                    newValue >= 1 &&
                                                        setRating(newValue);
                                                }}
                                            />
                                        ) : (
                                            <Rating
                                                name="read-only"
                                                value={review.rating}
                                                readOnly
                                                precision={1}
                                            />
                                        )}
                                        {user.id === review.user._id &&
                                        isEditing ? (
                                            <FormControl>
                                                <TextValidator
                                                    size="small"
                                                    label="Title"
                                                    style={{
                                                        marginLeft: "2em",
                                                    }}
                                                    placeholder="Enter you comment title"
                                                    value={title}
                                                    margin="normal"
                                                    fullWidth
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    onChange={(e) => {
                                                        setTitle(
                                                            e.target.value
                                                        );
                                                    }}
                                                    variant="standard"
                                                    validators={["required"]}
                                                    errorMessages={[
                                                        "Enter your comment title",
                                                    ]}
                                                />
                                            </FormControl>
                                        ) : (
                                            <span
                                                style={{
                                                    fontWeight: 600,
                                                    marginLeft: "2em",
                                                }}
                                            >
                                                {review.title}
                                            </span>
                                        )}
                                    </div>
                                </span>
                                <p
                                    style={{
                                        color: "#22B345",
                                        fontSize: "0.75em",
                                    }}
                                >
                                    Bought from Aumart
                                </p>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "start",
                                    }}
                                >
                                    {user.id === review.user._id &&
                                    isEditing ? (
                                        <FormControl>
                                            <TextareaAutosize
                                                aria-label="empty textarea"
                                                minRows={3}
                                                placeholder="Write your comment here..."
                                                onChange={(e) =>
                                                    setText(e.target.value)
                                                }
                                                value={text}
                                                required
                                                style={{
                                                    borderColor: "#303F9F",
                                                    width: "400px",
                                                }}
                                            />
                                        </FormControl>
                                    ) : (
                                        <p>{review.text}</p>
                                    )}
                                </div>

                                <p
                                    style={{
                                        fontSize: "0.7em",
                                        color: "gray",
                                        margin: 0,
                                    }}
                                >
                                    Commented{" "}
                                    <Moment fromNow>{review.createdAt}</Moment>
                                </p>
                            </Grid>
                            <Grid
                                item
                                xs={4}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                {user.id === review.user._id && (
                                    <>
                                        {isEditing ? (
                                            <FormControl>
                                                <Button
                                                    size={"small"}
                                                    type={"submit"}
                                                    startIcon={<Save />}
                                                    className={
                                                        classes.button__secondary
                                                    }
                                                    disabled={isLoading}
                                                >
                                                    Save
                                                </Button>
                                            </FormControl>
                                        ) : (
                                            <FormControl>
                                                <Button
                                                    size={"small"}
                                                    component={"div"}
                                                    startIcon={<Edit />}
                                                    className={
                                                        classes.button__secondary
                                                    }
                                                    disabled={isLoading}
                                                    onClick={() =>
                                                        setIsEditing(true)
                                                    }
                                                >
                                                    Edit
                                                </Button>
                                            </FormControl>
                                        )}
                                        <FormControl>
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                component={"div"}
                                                size={"small"}
                                                className={classes.button}
                                                startIcon={<Delete />}
                                                disabled={isLoading}
                                                onClick={handleDeleteReview}
                                            >
                                                Delete
                                            </Button>
                                        </FormControl>
                                    </>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </FormGroup>
        </ValidatorForm>
    );
};

export default ReviewCard;
