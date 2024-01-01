import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
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
        backgroundSize: "auto 80vh",
        height: "calc(100vh - 64px)",
        backgroundColor: "#fff",
        backgroundBlendMode: "multiply",
    },
    drop: {
        transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    },
}));

export default useStyles;
