import React ,  { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
} from "@material-ui/core";
import AddWord from "./AddWord";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(word, definition, edit,clear) {
    return { word, definition, edit,clear };
}

const rows = [
    createData('kick ', 'to hit sth with your feet', 'edit','delete'),
    createData('popular', 'everyone likes it', 'edit' , 'delete' ),
];


export default function WordsTable() {
    const classes = useStyles();
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
    const [openEditBox, setOpenEditBox] = useState(false);


    return (
        <div>
        <TableContainer component={Paper} className='p-5'>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Words</TableCell>
                        <TableCell align="left">Definitions</TableCell>
                        <TableCell align="left">edit</TableCell>
                        <TableCell align="left">delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell align="left">{row.word}</TableCell>
                            <TableCell align="left">{row.definition}</TableCell>
                            <TableCell align="left" onClick={() => {setOpenEditBox(true)}}>{row.edit}</TableCell>
                            <TableCell align="left" onClick={() => {setOpenDeleteConfirm(true)}}>{row.clear}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
            <Dialog
                dir="ltr"
                open={openDeleteConfirm}
                keepMounted
                onClose={() => setOpenDeleteConfirm(false)}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      "Do you want to delete this word?"
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteConfirm(false)} >
                       close
                    </Button>
                    <Button  color="secondary">
                       Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                dir="ltr"
                open={openEditBox}
                keepMounted
                onClose={() => setOpenEditBox(false)}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                    </DialogContentText>
                    <AddWord/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditBox(false)} >
                        close
                    </Button>
                    <Button  color="secondary">
                        Edit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
