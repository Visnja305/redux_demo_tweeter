import React, { useEffect, useState } from 'react';
import TweetBody from '../components/TweetBody';
import { useDispatch, useSelector } from 'react-redux';
import PostTweet from '../components/PostTweet';
import { getAllTweetsThunk, postNewTweetThunk } from '../redux/tweets';
import UpdateFormModal from '../components/UpdateFormModal/UpdateFormModal';

const Splash = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const tweets = useSelector((state) => state.tweets.allTweets);
    const [isLoaded, setIsLoaded] = useState(false);
    const [updateMode, setUpdateMode] = useState(false);
    const [tweet, setTweet] = useState({});

    const [myState, setMyState] = useState([]);



    useEffect(()=> {
      //get data
      const getData = async() => {
        dispatch(getAllTweetsThunk());
      }
      getData()

    }, [dispatch])

  return (
    <div>
      <h1>Tweeter</h1>
      <PostTweet user={user} />
      {updateMode? <UpdateFormModal
        setUpdateMode={setUpdateMode}
        tweet={tweet}
        />: null}
      <TweetBody
        user={user}
        tweets={tweets}
        setUpdateMode={setUpdateMode}
        setTweet={setTweet}
        />
    </div>
  );
}

export default Splash;
