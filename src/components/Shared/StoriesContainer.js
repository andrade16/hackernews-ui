import React, {Component} from 'react';
import {getStoryIds} from '../../services/hackerNewsApi';
import {useInfiniteScroll} from '../../hooks/useInfiniteScroll';
import StoryItem from '../Story/StoryItem';
import '../../styles/Shared/StoriesContainer.scss'

// Since this is a class component I can't use the custom hook within it.
// HOC for infinite scroll on StoriesContainer
export const withInfiniteScroll = (Component) => {
    return (props) => {
        const count = useInfiniteScroll();
        return <Component count={count} {...props}/>
    }
}

class StoriesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idList: [],
            hasError: false
        }
    }

    componentDidMount() {
        this.updateStoryItems(this.props.category)
    }

    updateStoryItems() {
        let {category} = this.props;

        getStoryIds(category).then(idList => { // gets story Ids
            this.setState({idList: idList})
        });
    }

    // This forces a refresh of the page based on the category user selects
    // if previous category prop is changed, then reset the id list and refetch data
    componentDidUpdate(prevProps) {
        const {category} = this.props;
        if (prevProps.category !== category) {
            this.setState(
                {idList: []},
                this.updateStoryItems(category)
            );
        }
    }

    render() {
        const {idList, hasError} = this.state;
        const {count} = this.props;
        if (hasError) {
            return <div>{'ERROR OCCURED'}</div>
        }
        return (
            <section className="stories-container">
                {idList.slice(0,count).map(storyId => (
                    <StoryItem key={storyId} storyId={storyId}/>
                ))}
            </section>
        )
    }
}

export default withInfiniteScroll(StoriesContainer);