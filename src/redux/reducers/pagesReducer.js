const pagesReducer = (state = [], action) => {
    if(action.type === 'SAVE_ANSWER') {
        // console.log('PAGE REDUCER STATE:', state);
        //console.log('PAGE REDUCER PAYLOAD:', action.payload);
        // const modifiedData = [ ...action.payload.pageId, action.payload ];
        // console.log('MODIFIED DATA:', modifiedData);
        // if(state[action.payload.pageId] !== null) state[action.payload.pageId]

        const dummyObj = {};
        dummyObj[action.payload.pageId] = action.payload.pageId;

        console.log('DUMMY OBJ:', dummyObj);
        
        return [ ...state, action.payload];
        return state;
    }
    return state;
}

export default pagesReducer;