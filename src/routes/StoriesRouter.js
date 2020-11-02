import React from "react";
import {Route, Switch} from 'react-router-dom';
import StoriesContainer from "../components/StoriesContainer";


const StoriesRouter = ({match, location, category}) => {
    console.log("ROUTING...", category, match.url, location)

    return (
        <Switch>
            <Route
                exact
                path={match.url}
                render={routes => <StoriesContainer category={category} match={match} {...routes} />}
            />
        </Switch>
    )
}


export default StoriesRouter;