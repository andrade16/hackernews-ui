import {useState, useEffect} from 'react';
import debounce from  'lodash.debounce';
import {STORY_INCREMENT, MAX_STORIES} from "../constants";



export const useInfiniteScroll = () => {
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(STORY_INCREMENT);

    const handleScroll = debounce(() => {
        if (window.innerHeight + document.documentElement.scrollTop !==
            document.documentElement.offsetHeight ||
            loading
        ) {
            return false;
        }
        setLoading(true);
    }, 200);

    useEffect(() => {
        if (!loading) return;

        if(count + STORY_INCREMENT  >= MAX_STORIES) { // story increments by 20 every scroll
            setCount(MAX_STORIES) // quite scrolling if we've exceeded MAX_STORIES
        } else {
            setCount(count + STORY_INCREMENT) // otherwise increment the current count with increment to fetch display more data
        }
        setLoading(false);
    },[loading])

    useEffect(() => { // cleanup on scoll event
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll); // unsubscribe from event listener
    }, [])

    return count;
}