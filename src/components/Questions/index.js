import React from 'react';
import './styles.css';

import { saveAnswers } from '../../redux/actions';
import StepZilla from 'react-stepzilla';
import { connect } from 'react-redux';

class Questions extends React.Component {
    state = {
        selectedOption: null,
        questionsState: [],
    }

    handleOptionChange = (event, questionData, questionId, pageId) => {
        let answerId, attributes = [];
        questionData.answers.filter((element) => {
            if(element.value === event.target.value) {
                answerId = element._id;
                attributes = element.attributes;
            };
        })

        this.props.saveAnswers({
            answer: event.target.value, 
            questionId: questionId, 
            pageId: pageId,
            answerId: answerId,
            attributes: attributes,
        });

        this.props.updateAnswers(this.props.questionsState);
        this.setState({
            selectedOption: event.target.value
        });
    }

    isValueChecked = (pageId, id, answer) => {
        const questionsData = this.props.questionsState;
        let isChecked = false;
        isChecked = questionsData[pageId] && questionsData[pageId].some((element) => {
            if((element.questionId === id) && (element.answer === answer)) 
            {
                return true;
            }
            return false;
        })
        return isChecked;
    }

    static getDerivedStateFromProps(props, state) {
        
        if(props.questionsState !== state.questionsState) {
            return {
                questionsState: props.questionsState,
            };
        }

        return null;
    } 

    render() {
        
        const questionsData = this.props.data;
        const questionStateData = this.props.questionsState;
        const derivedFrom = this.props.data.derivedFrom && this.props.data.derivedFrom[0][0];
        let answersArray = [];

        for(let key in questionStateData) {
            questionStateData[key].map((element) => {
                answersArray.push(element.answerId);
            })
        }
        
        let final = questionsData.derivedFrom && questionsData.derivedFrom.some((element) => {
            return element.every((item) => {
                return answersArray.indexOf(item) !== -1;
            })  
        })

        questionsData['showDerived'] = final ? true : false;

        // for(let key in questionStateData) {
        //     console.log('STATE:', questionStateData[key]);
        //     const isMatch = questionStateData[key].some((item) => {
        //         return item.answerId === derivedFrom
        //     });
            
        //     questionsData['showDerived'] = isMatch ? true : false; 
        // }
        
        return questionsData.derivedFrom ?
            ( 
                questionsData.showDerived ? (
                    <div className="Question__container">
                    <div className="Question__content">
                        {`${this.props.questionNumber+1}. `}
                        {questionsData.value}
                        {!this.props.shouldDisplayError && !this.props.displayErrorMessage.includes(questionsData._id) && 
                            <span className="Question__errorMessage">Answer this Question !</span>
                            
                        }
                    </div>
                   
                    <div className="Question__options">
                        {questionsData.answers.map((item, index) => {
                            return (
                                <div key={index}>
                                    <input
                                        type={questionsData.type}
                                        name={this.props.data._id} 
                                        value={item.value} 
                                        checked={this.isValueChecked(questionsData.pageId, this.props.data._id, item.value)}
                                        onChange={(event) => { this.handleOptionChange(event, this.props.data, this.props.data._id, questionsData.pageId)}}
                                    />
                                    
                                    <label>{item.value}</label>
                                </div>
                            )
                        })}
                    </div>
                </div>
                ) : null 
            ) : (
                <div className="Question__container">
                 <div className="Question__content">
                     {`${this.props.questionNumber+1}. `}
                     {questionsData.value}
                     {!this.props.shouldDisplayError && !this.props.displayErrorMessage.includes(questionsData._id) && 
                        <span className="Question__errorMessage">Answer this question</span>
                     }
                 </div>
                
                 <div className="Question__options">
                     {questionsData.answers.map((item, index) => {
                        return (
                            <div key={index}>
                                <input
                                    type={questionsData.type}
                                    name={this.props.data._id} 
                                    value={item.value} 
                                    checked={this.isValueChecked(questionsData.pageId, this.props.data._id, item.value)}
                                    onChange={(event) => { this.handleOptionChange(event, this.props.data, this.props.data._id, questionsData.pageId)}}
                                />
                                <label>{item.value}</label>
                            </div>
                        )
                     })}
                 </div>
             </div>
        );
    }
}

const mapStateToProps = state => {
   return {
    questionsState: state
   } 
};

const mapDispatchToProps = dispatch => ({
    saveAnswers: (payload) => {
        dispatch(saveAnswers(payload))
    } 
})

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
