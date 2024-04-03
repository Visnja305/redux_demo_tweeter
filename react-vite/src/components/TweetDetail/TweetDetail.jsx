import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams} from 'react-router-dom';
import { getOneTweetThunk } from '../../redux/tweets';

const TweetDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {id} = useParams();
  const tweet = useSelector((state) => state.tweets.byId[id])

  useEffect(()=> {
    const getData = async() => {
      await dispatch(getOneTweetThunk(id))
    }
    if(!tweet){
      getData()
    }

  }, [])


  const handleGoBack = () => {
    navigate(-1);
  }

  if(!tweet){
    return null
  }
  return (
    <div>
      <button onClick={handleGoBack}>Go Back</button>
      <h1>{`Tweet: ${tweet.id}`}</h1>
      <p>{tweet.tweet}</p>
      <span>{`posted by: ${tweet.User.username}`}</span>
    </div>
  );
}

export default memo(TweetDetail);
