import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ConfirmDelete = (props) => {
    const { confirm, open, onClose } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth={'xs'}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Permanantly discard from database?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        confirm();
                        handleClose();
                    }}>Yes, delete</Button>
                    <Button onClick={() => {
                        handleClose();
                    }} autoFocus>
                        No, go back
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ConfirmDelete;