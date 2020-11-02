import React, {Component} from 'react';
import {getItem} from "../services/hackerNewsAPi";
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
// import CardActions from '@material-ui/core/CardActions';
// import {makeStyles, withStyles, createStyles} from '@material-ui/core/styles';
// import Collapse from '@material-ui/core/Collapse';
// import clsx from 'clsx';
// import IconButton from '@material-ui/core/IconButton';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import Typography from "@material-ui/core/Typography";
// import {VIEW_COMMENTS} from "../constants";
// import {mapTime} from "../utils/utils";
import IsLoading from "./Loading";
import StoryCard from './StoryCard';
import "../styles/StoryItem.scss"

class StoryItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: undefined,
            isFetching: true,
            expanded: false
        }
    }

    componentDidMount() {
        let {storyId} = this.props;
        this.setState({isLoading: true}, this.fetch(storyId));
    }

    componentDidUpdate(prevprops) {
        let { storyId } = this.props;
        if(prevprops.storyId !== storyId) {
            this.setState({ isLoading: true }, this.fetch(storyId));
        }
    }

    fetch(id) {
        getItem(id).then(data => {
            this.setState({data: data.val(), isFetching: false})
        });
    }


    render() {
        let itemData = Object.assign({}, this.state.data, this.props);
        const {classes} = this.props;
        return (
            <IsLoading isFetching={this.state.isFetching}>
                <StoryCard {...itemData} classes={classes}/>
            </IsLoading>
        )
    }
}

export default StoryItem