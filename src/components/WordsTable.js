import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(word, definition, actions) {
    return { word, definition, actions };
}

const rows = [
    createData('kick ', 'to hit sth with your feet', 'edit / delete'),
    createData('popular', 'everyone likes it', 'edit / delete'),
];


export default function WordsTable() {
    const classes = useStyles();

    return (
        <TableContainer component={Paper} className='p-5'>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Words</TableCell>
                        <TableCell align="left">Definitions</TableCell>
                        <TableCell align="left">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell align="left">{row.word}</TableCell>
                            <TableCell align="left">{row.definition}</TableCell>
                            <TableCell align="left">{row.actions}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
