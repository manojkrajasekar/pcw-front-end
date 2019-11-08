import React from 'react';
import Questions from '../Questions';
import StepZilla from 'react-stepzilla';
import { connect } from 'react-redux';
import './styles.css';

class Pages extends React.Component {
    render() {

        const steps = [
            {name: 'Step 1', component: <Questions />},
            {name: 'Step 2', component: <Questions />},
            {name: 'Step 3', component: <Questions />},
            {name: 'Step 4', component: <Questions />},
            {name: 'Step 5', component: <Questions />}
        ]

        return (
            <div className="Page__Container">
                {this.props.dispalyFinalPage ?
                    (
                        <div className="Page__attributes">
                            {this.props.finalPageData.map((element) => {
                                return <div>#{element}</div>
                            })}
                        </div>
                    ):(
                        <React.Fragment>
                            
                            {this.props.pageData.questions.map((item, index) => {
                                return <Questions 
                                            key={index} 
                                            data={item} 
                                            updateAnswers={this.props.updateAnswers}
                                            displayErrorMessage={this.props.displayErrorMessage}
                                            shouldDisplayError={this.props.shouldDisplayError}
                                        />
                            })}
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