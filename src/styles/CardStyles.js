import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: "12px",
        border: "1px solid #e5e5e5",
        borderRadius: "0.5em",
        "&:hover": {
            boxShadow:
                "0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
        },
        display: "inline-flex",
        flexDirection: "column",
        justifyContent: "space-between",
        [theme.breakpoints.down("md")]: {
            fontSize: "0.65em !important",
        },
    },
    divider: { marginLeft: "0.15em", marginRight: "0.15em", color: "#858585" },
    title__container: {
        height: "50px",
        margin: 0,
        overflow: "hidden",
        textOverflow: "ellipse",
    },
    title: {
        fontSize: "0.75em",
        color: "#858585",
        fontWeight: 600,
        marginBottom: "1.5em",
    },
    aumartNowTitle: {
        fontSize: "0.75em",
        color: "#858585",
        fontWeight: 600,
        marginBottom: "1.5em",
    },
    aumartNowBorder: {
        borderTop: "1px solid #d3d3d7",
    },
    discount: {
        color: "rgba(36, 36, 36, 0.6)",
        fontSize: "0.75em",
        marginLeft: "0.5em",
        border: "1px solid #FFFFFF",
        borderRadius: "0.5em",
        backgroundColor: "#f5f5fa",
        padding: "3px",
    },
    price: { fontSize: "0.8em", color: "#858585", marginTop: 0 },
    progress: {
        // margin: theme.spacing(1),
        // borderRadius: '10px !important',
        width: "100%",
        // position: 'absolute'
        // progress-bar
        marginBottom: "0.5em",
        backgroundColor: "#FDDCCB",
        color: "#FD752E",
        display: "inline-block",
    },
    timer: {
        width: "40%",
        marginLeft: "1.5em",
        fontSize: "0.8em",
        color: "#858585",
    },
    "@global .progress-bar": {
        height: "100% !important",
        backgroundColor: "#FD752E !important",
    },
    "@global .ripple,.ripple:before,.ripple:after": {
        display: "block",
        borderRadius: "2px",
        width: "2px",
        height: "2px",
        webkitAnimation: "rip 6s infinite ease-out",
        mozAnimation: "rip 6s infinite ease-out",
    },
    "@global .react-ripples": {
        display: "inline-flex !important",
    },
    paper: {
        margin: "auto",
        maxWidth: "100%",
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: "auto",
        display: "block",
        maxWidth: "100%",
        maxHeight: "100%",
        overflow: "hidden",
        position: "relative",
        zIndex: 0,
    },
    aumartArrow: {
        maxHeight: "20px",
    },
    priceOrigin: {
        color: "lightgrey",
        textDecoration: "line-through",
    },
    removeLinkStyle: {
        textDecoration: "none !important",
        color: "inherit !important",
    },
}));

export default useStyles;
