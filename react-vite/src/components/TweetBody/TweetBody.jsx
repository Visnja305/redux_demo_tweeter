import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import TweetDetail from '../TweetDetail/TweetDetail';
import { deleteTweetThunk } from '../../redux/tweets';

const TweetBody = ({user, tweets, setUpdateMode, setTweet}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const goToTweet = (tweetId) => {
    navigate(`tweets/${tweetId}`)
  }


  const handleDelete = (tweetId) => {
    dispatch(deleteTweetThunk(tweetId));
  }

  const handleUpdate = (tweet) => {
    if(tweet.User.id === user.id){
      setUpdateMode(true);
      setTweet(tweet);
    }
  }

  return (
    <div style={{margin: '5px'}}>
        {tweets.length? tweets.map((tweet, idx) => (
          <div
          key={`${idx}-${tweet.id}`}
          style={{
            display: 'flex',
            flexDirection:'row',
            alignContent: 'center',
          }}
          >
            <div
              style={{ border: "1px solid black", margin: '10px', width: '50%' }}
                onClick={()=> goToTweet(tweet.id)}
                >
                <span style={{padding: '10px'}}>{tweet.User.username}</span>
                <span>{tweet.tweet}</span>
                <p>{`Posted on: ${tweet.createdAt}`}</p>
            </div>
            {user && user.id? tweet.User.id === user.id ?
            <div>
            <button
              style={{
                height: '2rem',
                borderRadius: '8px',
                cursor: 'pointer',
                position: 'relative',
                top: '1.5rem',
                paddingInline: '1rem',
                backgroundColor: 'rgb(50,70,50)',
                color: 'white',
                marginInline: '10px'
              }}
              onClick={(e)=> handleUpdate(tweet)}
              >Update</button>
            <button
              style={{
                height: '2rem',
                borderRadius: '8px',
                cursor: 'pointer',
                position: 'relative',
                top: '1.5rem',
                paddingInline: '1rem',
                backgroundColor: 'rgb(240,50,50)',
                color: 'white'
              }}
              onClick={(e)=> handleDelete(tweet.id)}
              >Delete</button>
              </div>
              : null: null}
          </div>
        )): <span>loading...</span>}
        {/* <span style={{padding: "10px"}}>{user.username}</span>
        <span>Hello world</span> */}
    </div>
  );
}

export default TweetBody;
