import SampleData from '../SampleData';

const validateAllQuestions = (answers) => {
    let answersData = [];
    for(let key in answers) {
        answers[key].map((element) => {
            answersData.push(element.answerId);
        })
    }

    let totalQUestions = 0;
    SampleData.pages.map((element) => {
        totalQUestions += element.questions.length
    })
    return totalQUestions === answersData.length ? true : false;
}

export default validateAllQuestions;

