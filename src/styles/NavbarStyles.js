import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
        minWidth: "1300px",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
        color: "#86868f",
    },
    title3: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
            minWidth: "2em",
        },
        color: "#86868f",
    },
    // toolbar: {
    //   width: "100%"
    // },
    button: {
        width: "100%",
        color: "#86868f",
        marginBottom: "0.2em",
        textTransform: "none",
        textAlign: "left",
        "&:hover": {
            backgroundColor: "#F",
            borderRadius: "0.5em",
        },
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: "#FFFFFF",
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: "100%",
        border: "1px solid #dddde3",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(3),
            width: "45%",
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inputRoot: {
        color: "inherit",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "50%",
        },
    },
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex",
        },
    },
    sectionDesktop2: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex",
            fontSize: 15,
        },
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },
    tikiLogo: {
        width: 80,
        height: 80,
        marginLeft: "0.5em",
        marginTop: "0.5em",
        marginRight: "0.5em",
    },
    navText: {
        fontSize: "0.9em",
    },
    navTypo: {
        lineHeight: 0.4,
    },
    iconNav: {
        marginLeft: "1%",
        marginRight: "0.2em",
        padding: "0.4em",
        borderRadius: "0",
        "&:hover": {
            backgroundColor: "#f5f5f5",
            borderRadius: "0.5em",
        },
    },
    iconNav2: {
        marginRight: "1em",
    },
    navText2: {
        width: "8em",
        marginLeft: "1em",
        padding: "1em 0.4em",
        fontSize: "0.7em",
        textAlign: "center",
        alignItems: "center",
        "&:hover": {
            backgroundColor: "#d9e4fb",
            borderRadius: "0.5em",
        },
    },
    title2: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
        fontSize: "0.9em",
        // marginRight: "3em"
    },
    removeDefaultLink: {
        fontSize: "0.8em",
        textDecoration: "none !important",
        color: "inherit !important",
    },
    productModal: {
        display: "block !important",
    },
    loginToolTip: {
        display: "flex !important",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "absolute",
        zIndex: "999999 !important",
        top: "4em",
        bottom: 0,
        left: "60%",
        boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        borderRadius: "0.5em",
    },
    customModal: {
        margin: 0,
        padding: 0,
        position: "absolute",
        top: "27.75%",
        right: 0,
        left: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        zIndex: 99999,
        backgroundColor: "rgba(0, 0, 0, 0.15)",
    },
    customSubModal: {
        margin: 0,
        marginRight: "20vw",
        marginLeft: "20vw",
        padding: 0,
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        width: "60vw",
        height: "20vh",
        color: "gray",
        backgroundColor: "#86868f",
        textAlign: "center",
        borderRadius: "0.5em",
    },
    chatPopup: {
        position: "fixed",
        bottom: "1em",
        right: "1em",
        zIndex: 999999,
        backgroundColor: "#fff",
        borderRadius: "0.5em",
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
        "&:hover": {
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
        },
    },
    chatPopupNotLogin: {
        position: "fixed",
        bottom: "1em",
        right: "1em",
        zIndex: 999999,
        backgroundColor: "#fff",
        borderRadius: "0.5em",
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
        "&:hover": {
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
        },
        padding: "1em",
    },
    chatPopupHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.5em 1em",
        borderBottom: "1px solid #dddde3",
    },
    chatPopupContent: {
        width: "630px",
        height: "460px",
        paddingBotom: "0.5em",
        paddingLeft: "0.5em",
        paddingRight: "0.5em",
    },

    "@global #autocomContainer .MuiInputBase-root.MuiInput-root.MuiAutocomplete-inputRoot.MuiInputBase-fullWidth.MuiInput-fullWidth.MuiInputBase-formControl.MuiInput-formControl.MuiInputBase-adornedEnd.MuiInput-underline:before":
        {
            border: "none !important",
        },
    "@global #autocomContainer .MuiInputBase-root.MuiInput-root.MuiAutocomplete-inputRoot.MuiInputBase-fullWidth.MuiInput-fullWidth.MuiInputBase-formControl.MuiInput-formControl.MuiInputBase-adornedEnd.MuiInput-underline:after":
        {
            border: "none !important",
        },
    "@global .MuiButtonBase-root.MuiIconButton-root.MuiAutocomplete-popupIndicator, .MuiButtonBase-root.MuiIconButton-root.MuiAutocomplete-clearIndicator.MuiAutocomplete-clearIndicatorDirty":
        {
            color: "#86868f !important",
        },
    "@global #autocomInput": {
        color: "#86868f !important",
    },
    "@global .MuiButtonBase-root.MuiFab-root:focus": {
        outline: "none",
    },

    "@global .ce-wrapper": {
        height: "452px !important",
    },
    "@global .ce-chat-list": {
        height: "452px !important",
    },
    "@global .ce-chat-list-column": {
        width: "30% !important",
        maxWidth: "30% !important",
        flex: "0 0 30% !important",
        paddingLeft: "0.5em !important",
    },
    "@global .ce-chat-feed": {
        height: "452px !important",
    },
    "@global .ce-chat-feed-column": {
        width: "70% !important",
        maxWidth: "70% !important",
        flex: "0 0 70% !important",
    },
    "@global .ce-settings-column": {
        display: "none !important",
    },
    "@global .ce-settings": {
        overflow: "auto !important",
    },
    "@global .ce-settings-container": {
        width: "100% !important",
    },

    "@global .ce-quill-container": {
        border: "1px solid #ccc !important",
        borderRadius: "0.5em !important",
    },
    "@global .ql-container.ql-snow": {
        border: "none !important",
    },
    "@global .ql-toolbar.ql-snow": {
        border: "none !important",
    },

}));

export default useStyles;
