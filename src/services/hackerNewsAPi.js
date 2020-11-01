import {GET_BEST_STORIES, GET_NEW_STORIES, GET_TOP_STORIES} from '../constants';
import firebase from 'firebase';

const baseUrl = 'https://hacker-news.firebaseio.com/v0/'
export const newStoriesUrl = `${baseUrl}newstories.json`;
export const topStoriesUrl = `${baseUrl}topstories.json`;
export const storyCommentsUrl = `${baseUrl}item/`
export const storyUrl = `${baseUrl}item/`

const firebaseConfig = {
    databaseURL : 'https://hacker-news.firebaseio.com/'
};
firebase.initializeApp(firebaseConfig);
const rootRef = firebase.database().ref('v0');

function getStoryIds(type) {
    console.log('TYPE: ', type);
    switch (type) {
        case GET_BEST_STORIES:
            return getStoryItemIds("beststories");
        case GET_NEW_STORIES:
            return getStoryItemIds("newstories");
        case GET_TOP_STORIES:
            return getStoryItemIds("topstories");
        default:
            break;
    }
}


function getStoryItemIds(type) { // returns story ids
    return rootRef
        .child(type)
        .once('value')
        .then(IdList => {
            console.log('ID_LIST: ', IdList);
            return IdList.val();
        })
}

function getItem(idNumber) {
    let item = rootRef
        .child('item')
        .child(idNumber)
        .once('value')
    return item;
}


export {getStoryIds, getStoryItemIds, getItem};