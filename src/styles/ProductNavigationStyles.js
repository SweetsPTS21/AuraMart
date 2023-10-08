import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "100%",
        height: "auto !important",
        backgroundColor: "white",
        marginLeft: "0",
        marginRight: "0",
        borderRadius: "0.5em !important",
        position: "sticky",
        top: "16px",
        marginTop: "0.5%",
        zIndex: "90",
    },
    category: {
        marginTop: "1.5em",
    },
    category2: {
        fontWeight: "bold",
    },
    category2item: {
        marginTop: "5%",
        marginBottom: 0,
    },
    removeDefaultLink: {
        textDecoration: "none !important",
        color: "inherit !important",
    },
    leftDrawer: {
        marginTop: "1em",
        paddingTop: "2em",
        paddingLeft: "3em",
        boxShadow:
            "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.19)",
        display: "none",
    },
    showDrawer: {
        display: "block !important",
    },
    sectionDesktop3: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "block",
            height: "auto",
        },
    },
    item2: {
        [theme.breakpoints.up("md")]: {
            fontSize: "0.85em",
        },
        [theme.breakpoints.up("lg")]: {
            fontSize: "1em",
        },
    },
    item: {
        [theme.breakpoints.up("md")]: {
            width: "0.8em !important",
        },
        [theme.breakpoints.up("lg")]: {
            width: "1em !important",
        },
    },
}));

export default useStyles;
