import React, {Component} from "react"
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

function IsLoading(props) {
    const classes = useStyles();
    let {isFetching} = props;

    if (isFetching) { // if fetching data, show loading indicator
        return (<div className={classes.root}><CircularProgress/></div>)
    } else {
        return props.children; // othrewise render story items
    }
}

export default IsLoading;