import React, {Component} from 'react';
import StoryMeta from "./StoryMeta";
import {getItem} from "../services/hackerNewsAPi";
import IsLoading from "./Loading";


class StoryItem extends Component {
    constructor(props) {
        super(props);
        this.state = {data: undefined, isFetching: true}
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

        return (
            <IsLoading isFetching={this.state.isFetching}>
                <StoryMeta {...itemData}/>
            </IsLoading>
        )
    }
}

export default StoryItem;