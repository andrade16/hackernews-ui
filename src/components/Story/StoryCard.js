import React, {useEffect, useState} from 'react';
import Card from '@material-ui/core/Card';
import Collapse from '@material-ui/core/Collapse';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import TopStoryComments from '../Comments/TopStoryComments';
import {withStyles} from '@material-ui/core/styles';
import {getItems} from '../../services/hackerNewsApi';
import clsx from 'clsx';
import {VIEW_COMMENTS} from '../../constants';
import {mapTime} from '../../utils/utils';
import { Link } from 'react-router-dom';
import '../../styles/Story/StoryItem.scss';

const styles = theme => ({
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transfrom', {
            duration: theme.transitions.duration.shortest,
        }),
        margin: 0
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    }
});

const StoryCard = props => {
    let {by, descendants, id, score, time, title, url, kids} = props;
    const {classes} = props;
    const [expanded, setExpanded] = useState(false);
    const [topComments, setTopComments] = useState([]);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    useEffect(() => { // Will only retreive the top most comments for a story
        getItems(kids || []).then(data => {
            const validComments = data.filter(comment => { // filter out deleted comments
                return comment.deleted !== true;
            })
            setTopComments(validComments);
        })
    }, [id])

    return (
        <Card className="story-card">
            <CardContent>
                <Typography className="story-title">
                    <a className="story-link" href={url}>{title}</a>
                </Typography>
                <Typography
                    className="story-meta">{`${score} points by ${by}  | ${mapTime(time)} ago | `}
                   <Link to={kids ? `/story/${id}` : '#'}>View {descendants} comments</Link>
                </Typography>
            </CardContent>
            <CardActions className="story-actions">
                <Typography className="story-meta">{kids ? VIEW_COMMENTS : ''}</Typography>
                <IconButton
                    disabled={!kids}
                    size={"small"}
                    edge={"end"}
                    className={clsx(classes.expand, {[classes.expandOpen]: expanded})}
                    onClick={handleExpandClick}>
                    <ExpandMoreIcon/>
                </IconButton>
            </CardActions>
            <CardContent className="story-comments">
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <TopStoryComments comments={topComments}/>
                </Collapse>
            </CardContent>
        </Card>
    );
}

export default withStyles(styles, {withTheme: true}) (StoryCard);