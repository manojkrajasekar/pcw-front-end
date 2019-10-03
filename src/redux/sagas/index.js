import { takeEvery, put } from 'redux-saga/effects';

import { ANSWERS } from '../constants';

function* handleSavePageData(payload) {
    console.log('HANDLE SAVE PAGE', payload);
    // yield put({type: 'ANSWERS.SAVE_ANSWER', payload: 1});
}

function* rootSaga() {
    // dispatch({ type: 'savePageData', products })
    yield takeEvery(ANSWERS.SAVE_ANSWER, handleSavePageData);
}

export default rootSaga;