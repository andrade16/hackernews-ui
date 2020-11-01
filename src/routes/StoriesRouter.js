import React from "react";
import {Route, Switch} from 'react-router-dom';
import Stories from "../components/StoriesContainer";


const StoriesRouter = ({match, location, category}) => {
    console.log("ROUTING...", category, match.url, location)

    return (
        <Switch>
            <Route
                exact
                path={match.url}
                render={routes => <Stories category={category} match={match} {...routes} />}
            />
        </Switch>
    )
}


export default StoriesRouter;