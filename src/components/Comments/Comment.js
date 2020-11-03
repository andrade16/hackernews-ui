import React, { Component } from 'react';
import {getItem} from '../../services/hackerNewsApi';
import {EMPTY_STRING} from '../../constants';
import IsLoading from '../Shared/Loading';
import '../../styles/Comments/Comment.scss'


// dangerouslySetInnerHTML helps me set the innerHtml for comments
// recurse render comments if the comments passed in have kids
const CommentBody = ({ text, kids }) => {
    return (
        <div className="comment-body">
            <div dangerouslySetInnerHTML={{ __html: text }} />
            <div className="comment-children">
                {kids
                    ? kids.map((kid, index) => {
                        return <Comment key={index} id={kid} />;
                    })
                    : ""}
            </div>
        </div>
    );
};
class Comment extends Component {
    constructor(props) {
        super(props);
        this.state ={
            data: undefined,
            isFetching: true,
        }
    }

    componentDidMount() {
        let {id} = this.props;
        this.setState({isLoading: true}, this.fetch(id))
    }

    fetch(id) {
        getItem(id).then(data => { // get comments based on id
            this.setState({data: data.val(), isFetching: false})
        })
    }

    render() {
        const {isFetching, data} = this.state;
        return(
            <div className="comments">
                <IsLoading isFetch={isFetching}>
                    <div className="card">
                        <span>{`by ${data ? data.by : EMPTY_STRING}`}</span>
                    </div>
                    <div>
                        <CommentBody {...data}/>
                    </div>
                </IsLoading>
            </div>
        )
    }
}

export default Comment;