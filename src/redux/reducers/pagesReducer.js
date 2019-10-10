const pagesReducer = (state = {}, action) => {
    if(action.type === 'SAVE_ANSWER') {
        if(!state[action.payload.pageId]) {
            state[action.payload.pageId] = [];
            state[action.payload.pageId].push(action.payload);
        } else {
            const modifiedState = state[action.payload.pageId].filter((element) => {
                if(element.questionId === action.payload.questionId) {
                    element.answer = action.payload.answer;
                    element.answerId = action.payload.answerId;
                    return element;
                } 
            })

            if(modifiedState.length > 0) {
                let newState = state[action.payload.pageId].map((item) => {
                    if(item.questionId === modifiedState[0].questionId) {
                        item.answer = modifiedState[0].answer;
                        return item;
                    }
                    return item;
                })
                state[action.payload.pageId] = newState;
            } else {
                state[action.payload.pageId].push(action.payload);
            }
        }
        return state;
    }
    return state;
}

export default pagesReducer;