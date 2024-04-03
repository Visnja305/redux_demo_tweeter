# Steps for data flow


1. Browser
    - Where the user can interact with the data
2. React
    - React manages state and component rendering. It can then send data to backend

3. Thunk
    - Thunk bridges our frontend and backend together. It does a fetch (to connect to backend) and a dispatch (to connect to frontend via action creator)

4. backend (flask/express)
    - This is the route, which is responsible for grabbing data from the backend, AWS, some API, etc. And then manipulating the data to look pretty  (to_dict method for example)

5. Thunk
    - Data comes back from the backend to the thunk in the form of a response. We can then see this data using the .json() method

6. Action Creator
    - Thunk sends our data to the action creator, which is responsible for packaging our data to the frontend. It sends it to the frontend via the reducer
7. Reducer
    - Responsible for unpackaging data from the backend, and puts it into state, which is grabble by the frontend
8. State is grabbed via the frontend's useState hook
    - We can access this data and render it in react
9. The data is now viewable by the user in the browser
