import {GET_BEST_STORIES, GET_NEW_STORIES, GET_TOP_STORIES} from '../constants';
import firebase from 'firebase';

const firebaseConfig = {
    databaseURL : 'https://hacker-news.firebaseio.com/'
};
firebase.initializeApp(firebaseConfig);
const firebaseDbRef = firebase.database().ref('v0');

function getStoryIds(type) {
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

function getStoryItemIds(type) { // returns story ids based on category chosen
    return firebaseDbRef
        .child(type)
        .once('value')
        .then(IdList => {
            return IdList.val();
        })
}

function getItem(id) { // get item objects based on ids
    let item = firebaseDbRef
        .child('item')
        .child(id)
        .once('value')
    return item;
}


function getItems(ids) { // get all items from array of ids
    return Promise.all(ids.map(id => getItem(id))).then(item => item.map(data => data.val()));
}



export {getStoryIds, getStoryItemIds, getItem, getItems};