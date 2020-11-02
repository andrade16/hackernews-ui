import React, { Component } from "react";
import {getItem} from "../../services/hackerNewsApi";
import IsLoading from "../Loading";
import '../../styles/Comments/Comment.scss'


function CommentAuthor({by}) { // Author text
    return (
        <div className="card">
            <span>{`by ${by}`}</span>
        </div>
    );
}

const Children = props => {
    return <div className="comment-children">{props.children}</div>;
};

// dangerouslySetInnerHTML helps me set the innerHtml for comments
const CommentBody = ({ text, kids }) => { // recurse render comment based on kids
    return (
        <div className="comment-body">
            <div dangerouslySetInnerHTML={{ __html: text }} />
            <Children>
                {kids
                    ? kids.map((kid, index) => {
                        return <Comment key={index} id={kid} />;
                    })
                    : ""}
            </Children>
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
                    <CommentAuthor {...data}/>
                    <div>
                        <CommentBody {...data}/>
                    </div>
                </IsLoading>
            </div>
        )
    }
}

export default Comment;