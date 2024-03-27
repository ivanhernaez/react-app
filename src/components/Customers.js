import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/customer";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, ButtonGroup, Button } from "@mui/material";
import { withStyles } from "@mui/styles";
import CustomerForm from "./CustomerForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";

const theme = {
    spacing: 8,
}

const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1 rem"
        }
    },
    paper: {
        margin: 6,
        padding: 6,
    }
})
const Customers = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllCustomers()
    }, [])

    //toast msg.
    const { addToast } = useToasts()

    const deleteValues = {
        deletedBy:'Deleter'
    }

    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteCustomer(id, deleteValues, () => addToast("Deleted successfully", { appearance: 'error' }))
    }

    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={12}>
                    <CustomerForm {...({ currentId, setCurrentId })} />
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Sex</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.customerList.map((record, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{record.name}</TableCell>
                                            <TableCell>{record.email}</TableCell>
                                            <TableCell>{record.sex}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary"
                                                        onClick={() => { setCurrentId(record.id) }} /></Button>
                                                    <Button><DeleteIcon color="secondary"
                                                        onClick={() => onDelete(record.id)} /></Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    );
}

const mapStateToProps = state => ({
    customerList: state.customer.list
})

const mapActionToProps = {
    fetchAllCustomers: actions.fetchAll,
    deleteCustomer: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Customers));