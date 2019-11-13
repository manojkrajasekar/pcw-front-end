import React from 'react';
import Questions from '../Questions';
import StepZilla from 'react-stepzilla';
import { connect } from 'react-redux';
import './styles.css';

class Pages extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowModal: false,
        }
        
        this.handleCloseModal = () => {
            this.setState({
                isShowModal: true,
            }, () => {
                console.log('SHOW VAL' , this.state.isShowModal);
            })
        }
    }
    render() {
        const showModal = this.state.isShowModal || !this.props.shouldDisplayError;
        
        return (
            <div className="Page__Container">
                {this.props.dispalyFinalPage ?
                    (
                        <div>
                            <div className="Page__attribute_title">Attributes</div>
                            <div className="Page__attributes">
                                
                                {this.props.finalPageData.map((element) => {
                                    return <div className="Page__attribute_item">
                                                #{element}
                                           </div>
                                })}
                            </div>
                        </div>
                    ):(
                        <React.Fragment>
                            <div className="Page__Title">
                                {this.props.pageData.name}
                            </div>
                            {this.props.shouldDisplayError === false && this.state.isShowModal ? (
                                <div className="Page__Questions--modal">
                                    <div 
                                        onClick={() => { this.handleCloseModal() }}
                                        className="close__Modal"
                                    >
                                        X
                                    </div>
                                    <div className="err_msg">
                                        Please answer all the questions, to continue to the next page
                                    </div>
                                </div>
                            ) : null}
                            <div className="Page__Questions">
                                {this.props.pageData.questions.map((item, index) => {
                                    return <Questions 
                                                key={index} 
                                                questionNumber={index}
                                                data={item} 
                                                updateAnswers={this.props.updateAnswers}
                                                displayErrorMessage={this.props.displayErrorMessage}
                                                shouldDisplayError={this.props.shouldDisplayError}
                                            />
                                })}
                            </div>
                        </React.Fragment>
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        answersData: state
    }
};

export default connect(mapStateToProps, null)(Pages);