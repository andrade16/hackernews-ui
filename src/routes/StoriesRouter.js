import React from "react";
import {Route, Switch} from 'react-router-dom';
import StoriesContainer from "../components/Shared/StoriesContainer";


const StoriesRouter = ({match, location, category}) => {
    console.log('CATEGORY', category);
    console.log('MATCH_URL: ', match.url);
    console.log('LOCATION: ', location);

    // depending on category chosen, StoriesContainer knows what type of stories to get
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