import React from 'react';
import {Link} from "react-router-dom";
import {mapTime} from "../utils/utils";
import '../styles/StoryMeta.scss';

const StoryMeta = props => {
    let { by, descendants, id, score, time, title, url, index } = props;

    return (
        <div className="root">
            {index !== undefined ? <div className="index">{index}.</div> : "" }
            <div className="content">
                <h3>
                    <a href={url}>{title}</a>
                </h3>
                <div className="meta">
                    {score} points | by <Link to={{ pathname: `/user/${by}` }}>{by}</Link>{" "}
                    {mapTime(time)} |{" "}
                    <Link to={{ pathname: `/story/${id}` }}>{descendants} comments.</Link>
                </div>
            </div>
        </div>
    );
};

export default StoryMeta;