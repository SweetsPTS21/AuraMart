import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";

const MuiDialog = (props) => {
    const { openDialog, setOpenDialog, message, handleConfirm, cancel } = props;

    const [cancelReason, setCancel] = useState("cancel");

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleConfirmClick = () => {
        handleConfirm();
        setOpenDialog(false);
    };

    return (
        <Dialog
            open={openDialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Xác nhận!"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message ? message : "Bạn có chắc chắn không?"}
                </DialogContentText>
                {cancel && (
                    <div style={{ paddingTop: "1em" }}>
                        <RadioGroup
                            aria-label="cancel"
                            name="cancel"
                            value={cancelReason}
                            onChange={(e) => setCancel(e.target.value)}
                        >
                            <FormControlLabel
                                value="address"
                                control={<Radio />}
                                label="Tôi muốn thay đổi địa chỉ giao hàng"
                            />
                            <FormControlLabel
                                value="return"
                                control={<Radio />}
                                label="Tôi muốn thay đổi sản phẩm"
                            />
                            <FormControlLabel
                                value="voucher"
                                control={<Radio />}
                                label="Tôi muốn thay đổi mã giảm giá"
                            />
                            <FormControlLabel
                                value="cancel"
                                control={<Radio />}
                                label="Tôi không muốn mua sản phẩm nữa"
                            />
                        </RadioGroup>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            style={{ marginBottom: "0.5em" }}
                        >
                            Lý do khác
                        </Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            minRows={4}
                            multiline
                        />
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleConfirmClick}
                    style={{ backgroundColor: "#ff424e", color: "#fff" }}
                    autoFocus
                >
                    Yes
                </Button>
                <Button
                    onClick={handleClose}
                    style={{ border: "1px solid #ccc", color: "#ccc" }}
                >
                    No
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default MuiDialog;
