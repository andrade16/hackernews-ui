import {mapTime} from "../../utils/utils";
import React from "react";
import '../../styles/FullStory/FullStoryCard.scss'



const FullStoryCard = props => {
    let { by, descendants, score, time, title, url, index } = props;

    return (
        <div className="full-story-root">
            <div className="full-story-content-">
                <h3>
                    <a href={url}>{title}</a>
                </h3>
                <div className="full-story-meta">
                    {score} points | by {by}
                    {mapTime(time)} |{" "}
                    <span>{descendants} comments</span>
                </div>
            </div>
        </div>
    );

}

export default FullStoryCard;