import React, {Component} from 'react';
import {getItem} from "../../services/hackerNewsApi";
import IsLoading from "../Loading";
import StoryCard from './StoryCard';
import "../../styles/StoryItem.scss"

class StoryItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: undefined,
            isFetching: true,
            expanded: false
        }
    }

    componentDidMount() { //Fetch the story objects as soon as this component mounts
        let {storyId} = this.props;
        this.setState({isLoading: true}, this.fetchStoryId(storyId));
    }

    componentDidUpdate(prevprops) {
        let { storyId } = this.props;
        if(prevprops.storyId !== storyId) {
            this.setState({ isLoading: true }, this.fetchStoryId(storyId));
        }
    }

    fetchStoryId(storyId) {
        getItem(storyId).then(data => { // data.val() is how we get data back from firebase db snapshot
            this.setState({data: data.val(), isFetching: false})
        });
    }


    render() {
        const {classes} = this.props;
        const {data, isFetching} = this.state;
        let itemData = Object.assign({}, data, this.props);
        return (
            <IsLoading isFetching={isFetching}>
                <StoryCard {...itemData} classes={classes}/>
            </IsLoading>
        )
    }
}

export default StoryItem