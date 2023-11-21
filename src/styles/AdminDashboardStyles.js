import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    item2: {
        fontSize: "1em",
    },
    item: {
        // color: "#CDCDCD",
    },
    subItem: {
        paddingLeft: "1em",
        // backgroundColor: "#ccc",
    },
    sideBar: {
        margin: 0,
        paddingTop: "1em !important",
        backgroundSize: "auto 80vh",
        // height: "100%",
        backgroundColor: "#fff",
        backgroundBlendMode: "multiply",
    },
    drop: {
        transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    },
}));

export default useStyles;
