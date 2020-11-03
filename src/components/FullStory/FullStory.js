import React, { Component } from 'react';
import {getItem} from '../../services/hackerNewsApi';
import IsLoading from '../Shared/Loading';
import Comments from '../Comments/Comments';
import FullStoryCard from "./FullStoryCard";
import '../../styles/FullStory/FullStory.scss'

class FullStory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemData: {},
            comments: [],
            hasError: false,
            isFetching: true
        }
    }

    componentDidMount() {
        this.getItemData(this.props.match.params.id); // grabs id from url to get story data
    }

    getItemData(id) {
        let itemData = getItem(id);
        itemData.then(item => {
            let itemData = item.val();
            if(itemData) {
                this.setState({itemData, isFetching: false});
            }
        })
    }

    render() {
        const {hasError, isFetching, itemData} = this.state;

        if(hasError) {
            return <div className="error">Error occured!</div>
        }

        return (
            <div className="full-story-container">
                <IsLoading isFetching={isFetching}>
                    <FullStoryCard {...itemData}/>
                    <Comments storyId={this.props.match.params.id}/>
                </IsLoading>
            </div>
        )
    }
}

export default FullStory;