import React from 'react';
import Questions from '../Questions';

import { connect } from 'react-redux';
import './styles.css';

class Pages extends React.Component {
    render() {
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