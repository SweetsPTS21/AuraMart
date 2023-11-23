import { makeStyles } from "@material-ui/core/styles";

const userStyles = makeStyles((theme) => ({
    root: {
        width: "40%",
        height: "80%",
        backgroundColor: "black",
        marginRight: "10%",
    },
    container: {
        display: "flex",
        width: "100%",
        height: "100%",
        marginLeft: "0",
        marginTop: "0",
        paddingTop: "0",
        marginBottom: "0",
        [theme.breakpoints.up("md")]: {
            // width: "75%",
            // marginLeft: "25%",
        },
        borderRadius: "10px",
        border: "1px solid #FFFFFF",
        backgroundColor: "#FFFFFF",
    },
    banner: {
        width: "100%",
        height: "280px",
        "&:hover": {
            boxShadow:
                "0 2px 4px 0 rgba(200, 200, 200, 0.2), 0 3px 10px 0 rgba(200, 200, 200, 0.19)",
        },
    },
    item: {
        width: "240px",
        height: "100%",
    },
    icon: {
        width: "60px",
        height: "60px",
    },
    text: {
        fontSize: "1.1em",
        fontWeight: "500",
        color: "#3c4858",
        marginLeft: "0.5em",
    },
    mediumProduct: {
        width: "100%",
        "&:hover": {
            boxShadow:
                "0 2px 4px 0 rgba(200, 200, 200, 0.2), 0 3px 10px 0 rgba(200, 200, 200, 0.19)",
        },
    },
    largeProduct: {
        width: "100%",
        "&:hover": {
            boxShadow:
                "0 2px 4px 0 rgba(200, 200, 200, 0.2), 0 3px 10px 0 rgba(200, 200, 200, 0.19)",
        },
    },
    smallProduct: {
        width: "100%",
        marginTop: "3.158em",
        "&:hover": {
            boxShadow:
                "0 2px 4px 0 rgba(200, 200, 200, 0.2), 0 3px 10px 0 rgba(200, 200, 200, 0.19)",
        },
    },
    removeLinkStyle: {
        display: "flex",
        alignItems: "center",
        textDecoration: "none !important",
    },
    "@global .Carousel": {
        position: "unset",
    },
    "@global .Carousel .Indicators": {
        marginTop: "0 !important",
        marginBottom: "1em !important",
    },
    "@global .MuiSvgIcon-root.Active.Indicator": {
        color: "rgba(24, 158, 255, 0.6) !important",
    },
    "@global .react-ripples": {
        height: "100%",
    }
}));

export default userStyles;
