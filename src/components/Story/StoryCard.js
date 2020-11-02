import React, {Component, useState} from 'react';
import {getItem} from "../../services/hackerNewsApi";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from '@material-ui/core/CardActions';
import {makeStyles, withStyles, createStyles} from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography";
import {VIEW_COMMENTS} from "../../constants";
import {mapTime} from "../../utils/utils";
import { Link } from "react-router-dom";

import "../../styles/StoryItem.scss";

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
    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    let {by, descendants, id, score, time, title, url, kids} = props;
    const {classes} = props;

    return (
        <Card className="story-card">
            <CardContent>
                <Typography className="story-title">
                    <a className="story-link" href={url}>{title}</a>
                </Typography>
                <Typography
                    className="story-meta">{`${score} points by ${by}  | ${mapTime(time)} ago | `}
                    <Link to={{pathname: `/story/${id}`}}>{descendants} comments</Link>
                    {/*<a href="#">{`${descendants ? descendants : 0} comments`}</a>*/}
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
                    {'TESTING'}
                </Collapse>
            </CardContent>
        </Card>
    );
}

export default withStyles(styles, {withTheme: true}) (StoryCard);