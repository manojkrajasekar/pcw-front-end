import React from 'react';
import './styles.css';

import configureStore from '../../redux/store';
import { saveAnswers } from '../../redux/actions';
import { connect } from 'react-redux';

class Questions extends React.Component {


    state = {
        selectedOption: null
    }

    

    handleOptionChange = (event, questionId, pageId) => {
        const store = configureStore();
        // store.dispatch({type: 'savePageData', payload: event.target.value})
        this.props.saveAnswers({answer: event.target.value, questionId: questionId, pageId: pageId});
        this.setState({
            selectedOption: event.target.value
        });
    }

    isValueChecked = (id, answer) => {
        const questionsData = this.props.questionsState;
        // let isChecked;
        const isChecked = questionsData.some((element) => {
            if((element.questionId === id) && (element.answer === answer)) 
            {
                return true;
            }
        })
        return isChecked;
    }

    render() {

        const store = configureStore();
        // console.log('PROPS DATA:', this.props.data);
        // console.log('SELECTED OPTION:', this.state.selectedOption);
        console.log('INTERNAL STATE:', this.props.questionsState);
        const questionsData = this.props.data;
        console.log('QUESTIONS DATA:', questionsData);
        return (
            <div className="Question__container">
                <div className="Question__content">
                    {questionsData.value}
                </div>
                <div className="Question__options">
                    {questionsData.answers.map((item, index) => {
                        // console.log('QUESTIONS ITEM:', item);
                        console.log('ITEM VALUE:', item.value)
                        return (
                            <div key={index}>
                                <input
                                    type={questionsData.type}
                                    // type={questionsData.type}
                                    name={this.props.data._id} 
                                    value={item.value} 
                                    // checked={this.state.selectedOption === item.value}
                                    checked={this.isValueChecked(this.props.data._id, item.value)}
                                    onChange={(event) => { this.handleOptionChange(event, this.props.data._id, questionsData.pageId)}}
                                />
                                <label>{item.value}</label>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
   return {
    questionsState: state
   } 
};

const mapDispatchToProps = dispatch => ({
    saveAnswers: (payload) => {
        console.log('POST PAYLOAD:', payload);
        dispatch(saveAnswers(payload))
    } 
})

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
// export default Questions;