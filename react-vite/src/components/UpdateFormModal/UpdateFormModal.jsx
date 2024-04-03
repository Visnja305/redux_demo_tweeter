import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { updateTweetThunk } from '../../redux/tweets';

const UpdateFormModal = ({ setUpdateMode, tweet}) => {
    const dispatch = useDispatch();

    const [updatedTweet, setUpdatedTweet] = useState(tweet.tweet);

    const closeModal = () => {
        setUpdateMode(false)
    }

    const handleUpdateTweet = (e) => {
        e.preventDefault();
        const tweetId = tweet.id;
        dispatch(updateTweetThunk(tweetId, updatedTweet));
        setUpdateMode(false)
    }

  return (
    <div style={{
        position: 'fixed',
        top: '0',
        right: '0',
        left: '0',
        bottom: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '999'
    }}>
        <div style={{
              position: 'fixed',
              top: '0',
              right: '0',
              left: '0',
              bottom: '0',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
        }} >
        </div>
            <div style={{
                  position: 'absolute',
                  backgroundColor:'white',
                  width: '30rem',
                  height: '20rem',
            }}>
                <div style={{position: 'relative',
            left: '10px'}}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignContent: 'center'
                }}>
                    <h3>Tweet</h3>
                    <button
                    onClick={()=> closeModal()}
                    style={{
                        position: 'relative',
                        right: '2rem',
                        height: '20px',
                        top: '1rem',
                        cursor: 'pointer',
                        backgroundColor: 'red',
                        color: 'white',
                        borderRadius: '8px',
                        padding: '2px 10px'
                    }}>X</button>
                </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}>
                        <span style={{paddingInline: '10px'}}>{tweet.User.username}</span>
                        <form onSubmit={handleUpdateTweet}>
                            <input
                                placeholder='Enter a Tweet'
                                value={updatedTweet}
                                onChange={(e)=> setUpdatedTweet(e.target.value)}
                                />
                                <div>
                                 <button
                                    onClick={(e)=> handleUpdateTweet(e)}
                                    style={{
                                        cursor: 'pointer',
                                        backgroundColor: 'green',
                                        color: 'white',
                                        borderRadius: '8px',
                                        marginTop: '10px'

                                    }}>Update Tweet</button>
                                </div>
                        </form>
                    </div>
                </div>
            </div>
    </div>
  );
}

export default UpdateFormModal;
