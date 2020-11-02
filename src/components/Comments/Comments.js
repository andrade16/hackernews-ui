import React, { Component } from "react";
import {getItem} from "../../services/hackerNewsApi";
import Comment from "./Comment";
import '../../styles/Comments/Comments.scss'

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {kids: [], notFound: false}
    }

    componentDidMount() {
        this.getComments(this.props.storyId);
    }

    getComments(storyId) {
        if(storyId) {
            getItem(storyId).then(dataSnapshot => {
                let item = dataSnapshot.val();
                let kids;
                if (item) {
                    kids = item.kids || [];
                    this.setState({ kids });
                } else this.setState({ notFound: true });
            });
        } else {}
    }

    render() {
        console.log('KIDS: ', this.state.kids);
        return (
            <section className="comments-container">
                {this.state.notFound
                    ? ""
                    : this.state.kids.map((kid, index) => (
                        <Comment key={index} id={kid} />
                    ))}
            </section>
        );
    }
}

export default Comments;