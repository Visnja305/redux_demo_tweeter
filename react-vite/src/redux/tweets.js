


// CONSTANTS
const GET_TWEETS = 'tweets/getTweets';
const POST_TWEET = 'tweets/postTweets';
const GET_TWEET = 'tweets/getTweet';
const DELETE_TWEET = 'tweets/deleteTweet';
const UPDATE_TWEET = 'tweets/updateTweet';
// ACTION CREATORS


const getTweets = (tweets) => ({
    type: GET_TWEETS,
    payload: tweets
});

const getTweet = (tweet) => ({
    type: GET_TWEET,
    payload: tweet
})

const postTweet = (tweet) => ({
    type: POST_TWEET,
    payload: tweet
})

const deleteTweet = (id) => ({
    type: DELETE_TWEET,
    payload: id
});


const updateTweet = (tweet) => ({
    type: UPDATE_TWEET,
    payload: tweet
})

// THUNKS

//Get all tweets
export const getAllTweetsThunk = () => async (dispatch) => {
    try {
        const response = await fetch('/api/tweets/');
        if(response.ok){
            const data = await response.json();
            dispatch(getTweets(data));
            return data;
        } else{
            throw response
        }
    } catch (error) {
        const errors = error.json();
        return errors;
    }



}

// Post tweets
export const postNewTweetThunk = (form) => async (dispatch) => {
    try {
        const {tweet, userId} = form;
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tweet,
                user_id: userId
            })
        }
        const response = await fetch(`/api/tweets/`, options)
        if(response.ok){
            const data = await response.json();
            //step 5
            dispatch(postTweet(data))
            return response;
        }
    } catch (error) {
        const data = error.json();
        return data;
    }




};


//get one tweet
export const getOneTweetThunk = (id) => async (dispatch) => {
    try {

        const response = await fetch(`/api/tweets/${id}`);
        if(response.ok){
            const data = await response.json();
            dispatch(getTweet(data))
            return data
        } else{
            throw response
        }
    } catch (error) {
        const data = await error.json();
        return data;
    }

}

//delete a tweet
export const deleteTweetThunk = (tweetId) => async (dispatch) => {
    try {

        const options = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        }
        const response = await fetch(`/api/tweets/${tweetId}`, options);

        if(response.ok){
            const data = await response.json();
            dispatch(deleteTweet(data.id))

        } else{
            throw response
        }
    } catch (error) {
        const data = await error.json();
        return data;
    }

}



export const updateTweetThunk = (tweetId, updatedTweet) => async(dispatch) => {
    try {

        const options = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
               tweet_id: tweetId,
               updated_tweet: updatedTweet
            })
        };

        const response = await fetch(`/api/tweets/${tweetId}`, options);
        if(response.ok){
            const data = await response.json();
            dispatch(updateTweet(data))
            return data;
        } else{
            throw response;
        }

    } catch (error) {
        const errors = error.json();
        return errors;
    }
}




// REDUCER
const initialState = {
    byId: {},
    allTweets: []
};

function tweetReducer(state = initialState, action) {
    let newState = {...state};
    switch (action.type) {
        case GET_TWEETS:
            newState.allTweets = action.payload;

            for(let i = 0; i < action.payload.length; i++){
                let tweet = action.payload[i];
                newState.byId[tweet.id] = tweet
            }
            // this is another way to do our tweet for loop
            // for(let tweet of tweets){
            //     newState.byId[tweet.id] = tweet
            // }
          return newState
        case POST_TWEET:
            const newTweet = action.payload
            newState.allTweets = [...newState.allTweets, newTweet]
            newState.byId[newTweet.id] = newTweet
            return newState;
        case GET_TWEET:
            const tweet = action.payload
            newState.allTweets = [tweet]
            newState.byId[tweet.id] = tweet
            return newState
        case DELETE_TWEET:
            const newById = {...newState.byId};
            delete newById[action.payload];
            newState.byId = newById

            const newAllTweets = newState.allTweets.filter((tweet)=> {
                return tweet.id !== action.payload;
            });

            newState.allTweets = newAllTweets;
            return newState;

        case UPDATE_TWEET:
            const newArr = [...newState.allTweets];
            const newUpdatedId = {...newState.byId};
            for(let i = 0; i < newArr.length; i++){
                let currTweet = newArr[i];
                if(currTweet.id === action.payload.id){
                    newArr[i] = action.payload;
                    break;
                }
            }
            newState.allTweets = newArr;

            newUpdatedId[action.payload.id] = action.payload;
            newState.byId = newUpdatedId
            return newState;

        default:
            return state;
    }
}

export default tweetReducer;
