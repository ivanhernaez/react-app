import React, { useEffect, useState } from "react";
import { FormControl, Box, Grid, InputLabel, Select, TextField, MenuItem, Button, Stack, FormHelperText } from "@mui/material";
import { withStyles } from "@mui/styles";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/customer";
import { useToasts } from "react-toast-notifications";

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: 8,
            width: 230
        }
    },
    formControl: {
        margin: 8,
        width: 230
    },
})

const initialFieldValues = {
    name: '',
    phase: '',
    email: '',
    block: '',
    sex: '',
    lot: '',
    createdBy: '',
    updatedBy: ''
}

const CustomerForm = ({ classes, ...props }) => {

    //toast msg.
    const { addToast } = useToasts()

    //validate()
    //validate({name: 'jeny'})
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        if ('phase' in fieldValues) {
            temp.phase = fieldValues.phase ? "" : "This field is required."
            if (temp.phase == "" && !parseInt(fieldValues.phase))
                temp.phase = "Phase is not valid number."
        }
        if ('block' in fieldValues) {
            temp.block = fieldValues.block ? "" : "This field is required."
            if (temp.block == "" && !parseInt(fieldValues.block))
                temp.block = "Block is not valid number."
        }
        if ('lot' in fieldValues) {
            temp.lot = fieldValues.lot ? "" : "This field is required."
            if (temp.lot == "" && !parseInt(fieldValues.lot))
                temp.lot = "Lot is not valid number."
        }
        if ('sex' in fieldValues)
            temp.sex = fieldValues.sex ? "" : "This field is required."
        if ('email' in fieldValues) {
            temp.email = fieldValues.email ? "" : "This field is required."
            temp.email = (/^$|.+@.+..+/).test(fieldValues.email) ? temp.email : "Email is not valid."
        }

        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    //material-ui select
    // const inputLabel = React.useRef(null);
    // const [labelWidth, setLabelWidth] = React.useState(0);
    // React.useEffect(() => {
    //     setLabelWidth(inputLabel.current.offsetWidth);
    // }, []);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const onSuccess = () => {
                resetForm()
                addToast("Submitted successfully", { appearance: 'success' })
            }

            if (props.currentId == 0)
                props.createCustomer(values, onSuccess)
            else
                props.updateCustomer(props.currentId, values, onSuccess)

            resetForm()
        }
    }

    useEffect(() => {
        if (props.currentId != 0) {
            setValues({
                ...props.customerList.find(x => x.id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>

            <Grid container>
                <Box sx={{ m: 1, fontSize: "1.25rem" }}>Customer Information</Box>
                <Grid item xs={12}>
                    <TextField
                        name="name"
                        variant="outlined"
                        label="Name"
                        value={values.name}
                        onChange={handleInputChange}
                        {...(errors.name && { error: true, helperText: errors.name })}
                    />
                    <TextField
                        name="email"
                        variant="outlined"
                        label="Email"
                        value={values.email}
                        onChange={handleInputChange}
                        {...(errors.email && { error: true, helperText: errors.email })}
                    />
                    <FormControl sx={{ m: 1, minWidth: 230 }} variant="outlined"
                        {...(errors.sex && { error: true })}
                    >
                        <InputLabel>Sex</InputLabel>
                        <Select
                            name="sex"
                            label="Sex"
                            value={values.sex}
                            onChange={handleInputChange}>

                            <MenuItem value="">Select</MenuItem>
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                        </Select>
                        {errors.sex && <FormHelperText>{errors.sex}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Box sx={{ m: 1, fontSize: "1.25rem" }}>House Location</Box>
                <Grid item xs={12}>
                    <TextField
                        name="phase"
                        variant="outlined"
                        label="Phase"
                        value={values.phase}
                        onChange={handleInputChange}
                        {...(errors.phase && { error: true, helperText: errors.phase })}
                    />
                    <TextField
                        name="block"
                        variant="outlined"
                        label="Block"
                        value={values.block}
                        onChange={handleInputChange}
                        {...(errors.block && { error: true, helperText: errors.block })}
                    />
                    <TextField
                        name="lot"
                        variant="outlined"
                        label="Lot"
                        value={values.lot}
                        onChange={handleInputChange}
                        {...(errors.lot && { error: true, helperText: errors.lot })}
                    />
                    <div>
                        <Stack spacing={2} direction="row" sx={{ m: 1, minWidth: 230 }}>
                            <Button
                                variant="contained"
                                type="submit"
                            >
                                Submit
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={resetForm}
                            >
                                Reset
                            </Button>
                        </Stack>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}

const mapStateToProps = state => ({
    customerList: state.customer.list
})

const mapActionToProps = {
    createCustomer: actions.create,
    updateCustomer: actions.update,
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(CustomerForm));