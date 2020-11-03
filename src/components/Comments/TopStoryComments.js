import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {mapTime} from '../../utils/utils';
import {EMPTY_STRING} from '../../constants';
import '../../styles/Comments/TopStoryComments.scss'


const TopStoryComments = ({comments}) => {
    const commentList = comments.map((comment, index )=> (
        <CardContent key={comment.id}>
            <Typography className="comment-by">{`by ${comment.by}`}</Typography>
            <Typography className="comment-text">{comment.text}</Typography>
            <Typography className="comment-time">{`${mapTime(comment.time ? comment.time : EMPTY_STRING)} ago`}</Typography>
        </CardContent>
    ));

    return commentList
}
export default TopStoryComments