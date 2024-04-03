import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { postNewTweetThunk } from '../../redux/tweets';

const PostTweet = ({user}) => {

    const dispatch = useDispatch();

    const [tweet, setTweet] = useState("");
    const [errors, setErrors] = useState([]);


  useEffect(()=> {
    if(user){
      setErrors([])
    }
  }, [user])


  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!user){
      let newErrors = [];
      newErrors.push("You must be signed in to perform this action.");
      setErrors(newErrors);
    } else{
      let form = {
        tweet,
        userId: user.id
      };

      const res = await dispatch(postNewTweetThunk(form));
      if(res.ok){
        setTweet('')
      }
    }

  }


  return (
    <div>
        <form onSubmit={handleSubmit} style={{paddingLeft: '15px'}} >
            <div style={{paddingBottom: '5px'}}>
                <input
                value={tweet}
                placeholder='Make a new Tweet'
                type='text'
                onChange={(e)=> setTweet(e.target.value)}/>
            </div>
            {errors.length > 0? errors.map((error, key) => (
              <p
              style={{color: "red"}}
              key={`${key}-${new Date()}`}>{error}</p>
            )):null}
            <button onClick={handleSubmit}>Post Tweet</button>
        </form>
    </div>
  );
}

export default PostTweet;
