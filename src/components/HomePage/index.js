import React from 'react';
import Pages from '../Pages';
import SampleData from '../../SampleData';
// import validateAllQuestions from '../../utils/validateAllQuestions';
import './styles.css';

import { connect } from 'react-redux';

class HomePage extends React.Component {

    state = {
        pageNumber: 0,
        answersData: {},
        isDisabled: false,
        displayErrorMessage: [],
        shouldDisplayError: true,
        isSubmitDisabled: false,
    };

    renderNextPage = (pageNumber) => {
       
        const shouldRenderPreviousPage = pageNumber < this.state.pageNumber;
        
        this.setState({
            pageNumber: shouldRenderPreviousPage ? pageNumber: this.validateQuestions(pageNumber) ? pageNumber : this.state.pageNumber,
            shouldDisplayError: this.validateQuestions(pageNumber),
            isDisabled: false,
            renderFinalPage: false,
        })
    }

    updateAnswers = (data) => {
        this.setState({
            answersData: { ...data },
            isSubmitDisabled: this.validateAllPages(10),
        }, () => {
            let val = this.validateQuestions();
            const serializedState = JSON.stringify(this.state.answersData);
            localStorage.setItem('state', serializedState);
            
        })
    }

    validateQuestions = (pageNumber) => {
        const answersData = this.props.answersData;
        
        const pageId = SampleData.pages[this.state.pageNumber].id;

        const numberOfPages = SampleData.pages[this.state.pageNumber];
        
        let answeredQuestions = [];

        if(answersData[pageId]){
            answeredQuestions = answersData[pageId].map((element) => {
                return element.questionId;
            });
    
            this.setState({
                displayErrorMessage: answeredQuestions
            })
    
            const areAllQuestionsAnswered = numberOfPages.questions.length === answersData[pageId].length;
            
            return answersData[pageId] && areAllQuestionsAnswered;
        }

        return false;
    }

    validateAllQuestions = (pageNumber) => {
        const answersData = this.props.answersData;
        
        const pageId = SampleData.pages[pageNumber].id;
        console.log('PAGE ID:', SampleData.pages);

        const numberOfPages = SampleData.pages[pageNumber];
        
        let answeredQuestions = [];

        if(answersData[pageId]){
            answeredQuestions = answersData[pageId].map((element) => {
                return element.questionId;
            });
    
            this.setState({
                displayErrorMessage: answeredQuestions
            })
    
            const areAllQuestionsAnswered = numberOfPages.questions.length === answersData[pageId].length;
            
            return answersData[pageId] && areAllQuestionsAnswered;
        }

        return false;
    }

    handleSubmit = () => {
        const answers = this.props.answersData;
        let finalAttrbutes = [];
        let answersArray = [];
        
        for(let key in answers) {
            answers[key].map((element) => {
               
                answersArray.push(element.answerId);
                element.attributes && element.attributes.map((item) =>{
                    finalAttrbutes.push(item);
                })
            })
        }

        SampleData.derivedAttributes.map((element) => {
            element.relation.map((el) => {
                let collectAttributes = el.every((item) => {
                    return answersArray.indexOf(item) !== -1;
                }) 
                if(collectAttributes) {
                    element.attributes.map((item) => {
                        finalAttrbutes.push(item);
                    })
                }
            })
        });

        const collectedAttributes = [ ...finalAttrbutes, ...SampleData.defaultAttrbiutes ];
       
        this.renderFinalPage(finalAttrbutes);
    }

    renderFinalPage = (finalAttrbutes) => {
        this.setState({
            renderFinalPage: true,
            collectedAttributes: finalAttrbutes
        })
    }

    // validateAllPages = (pageNumber) => {
    //      if (pageNumber < 0) return;
    //      if(pageNumber === 1 ) return this.validateAllQuestions(pageNumber);
    //      else {
    //          console.log('RETURN VALUE:', this.validateAllPages(pageNumber-1))
    //         return  this.validateAllPages(pageNumber-1)
    //      }
    // }

    validateAllPages = (pageNumber) => {
        let isValid = false;
        for(let i=0; i<pageNumber; i++){
            isValid = this.validateAllQuestions(i);
        }

        return isValid;
    }

    render() {
        let isDisabled = this.state.isDisabled;
        
        return (
            <div className="HomePage">
                <div className="Page__title">
                    {this.state.renderFinalPage 
                        ? <div>Attributes</div>
                        : <div>
                            {SampleData.pages[this.state.pageNumber].order}. {SampleData.pages[this.state.pageNumber].name}
                        </div>
                    }
                </div>
                <Pages 
                    pageData={SampleData.pages[this.state.pageNumber]}
                    displayErrorMessage={this.state.displayErrorMessage}
                    shouldDisplayError={this.state.shouldDisplayError}
                    updateAnswers={(data) => { this.updateAnswers(data)}}
                    dispalyFinalPage={this.state.renderFinalPage}
                    finalPageData={this.state.collectedAttributes}
                />
                <div className="HomePage__footer">
                    <div>
                        {SampleData.pages.map((item, index) => {
                            const isCurrentPage = index === this.state.pageNumber ? true : false;
                            if(index < this.state.pageNumber) {
                                isDisabled = false;
                            }
                            const noUserEvents = index - this.state.pageNumber <=1 ;
                            return (
                                <span
                                    key={index}
                                    onClick={() => { this.renderNextPage(index) }} 
                                    className={`PageNumber__box ${isCurrentPage ? 'highlight': ' ' } ${isDisabled ? 'disabled': ' ' } 
                                    ${!noUserEvents ? '':'' }`}
                                >
                                    {index+1}
                                </span>
                            )
                        })}
                        <div 
                            className={`HomePage__Submit`}
                            onClick={() => { this.handleSubmit()}}
                        >
                            Submit
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        answersData: state
    }
}

export default connect(mapStateToProps, null)(HomePage);