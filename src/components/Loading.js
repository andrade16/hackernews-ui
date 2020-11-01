import React, {Component} from "react"


function IsLoading(props) {
    let {isFetching} = props;

    if (isFetching) {
        return "Data loading...";
    } else {
        return props.children;
    }
}

export default IsLoading;