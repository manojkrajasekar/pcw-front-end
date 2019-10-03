import { ANSWERS } from '../constants';

const savePageData = () => ({
    type: "savePageData",
});

const saveAnswers = payload => ({
    type: ANSWERS.SAVE_ANSWER,
    payload
});

export {
    savePageData,
    saveAnswers
};

