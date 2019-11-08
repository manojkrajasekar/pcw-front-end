import React from 'react';
import Pages from '../Pages';
import SampleData from '../../SampleData';
import ProgressSteps from '../ProgressSteps';
import { Link } from 'react-router-dom';
import Steps, { Step } from 'rc-steps';
import "rc-steps/assets/index.css";
import "rc-steps/assets/iconfont.css";
// import NewData from '../../NewData';
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
        isShowModal: false
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

    showModal = () => {
        this.setState({
            isShowModal: true,
        })
        console.log('SHOW MODAL', this.state.isShowModal);
    }

    handleCloseModal = () => {
        this.setState({
            isShowModal: false,
        })
    }

    render() {

        console.log('HOME PAGE DATA', SampleData.pages);
        let isDisabled = this.state.isDisabled;
        
        return (
            <div className="HomePage">.
                
                <div className="HomePage__left">
                    {this.state.isShowModal && <div className="Page__title--content-modal">
                            <div 
                                onClick={() => { this.handleCloseModal() }}
                                className="close__Modal"
                            >
                                X
                            </div>
                            <div className="err_msg">
                                Question Set Selected Too Soon
                            </div>
                            <div className="err_msg__content">
                                You must first complete the previous set of questions before moving on to the selected set. If you have to leave the application before completing a set of questions, select the "Save Progress" button and you will be able to conduct your research and continue this process at your next login.
                            </div>

                        </div>
                    }
                    {this.state.renderFinalPage 
                        ? <div  className="Page__title--content">
                            
                            Attributes
                          </div>
                        : <Steps direction="vertical">
                            {SampleData.pages.map((element) => {
                                return <Step 
                                            onClick={() => { this.showModal()}}
                                            title={element.name} 
                                            current={this.state.pageNumber}
                                            size="small"
                                            //status={element.order - 1 <= this.state.pageNumber && 'finish'}
                                            className={`Page__title--content 
                                                ${element.order - 1 === this.state.pageNumber && 'currentPage'}
                                                ${element.order - 1 <= this.state.pageNumber && 'finish'}`
                                            }
                                        />
                                })}
                           </Steps>
                        }
                </div>
               
                <div className="Page__Questionnaire">
                    <Pages 
                        pageData={SampleData.pages[this.state.pageNumber]}
                        displayErrorMessage={this.state.displayErrorMessage}
                        shouldDisplayError={this.state.shouldDisplayError}
                        updateAnswers={(data) => { this.updateAnswers(data)}}
                        dispalyFinalPage={this.state.renderFinalPage}
                        finalPageData={this.state.collectedAttributes}
                    />
                    <div>
                        <div className="HomePage__pagination">
                            {SampleData.pages.map((item, index) => {
                                const isCurrentPage = index === this.state.pageNumber ? true : false;
                                if(index < this.state.pageNumber) {
                                isDisabled = false;
                                }
                                const disableUserEvents = index - this.state.pageNumber <=1 ;
                                return (
                                    <span
                                        title={`${!disableUserEvents ? `Finish Page ${this.state.pageNumber+1} to Continue`:'' }`}
                                        key={index}
                                        onClick={() => { this.renderNextPage(index) }} 
                                        className={`PageNumber__box ${isCurrentPage ? 'highlight': ' ' } ${isDisabled ? 'disabled': ' ' } 
                                        ${!disableUserEvents ? 'disableUserEvents':'' }`}
                                    >
                                        {index+1}
                                    </span>
                                )
                            })}
                        </div>
                        <div className="HomePage__footer--actions">
                            <Link 
                                className="Select__Category"
                                to="/select-category">
                                Back to Home
                            </Link>
                            <div 
                                className={`HomePage__Submit`}
                                onClick={() => { this.handleSubmit()}}
                            >
                                Submit
                            </div>
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