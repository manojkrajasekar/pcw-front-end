import React from 'react';

import './styles.css';

class Questions extends React.Component {


    state = {
        selectedOption: null
    }

    handleOptionChange = event => {
        this.setState({
            selectedOption: event.target.value
        });
    }

    render() {
        // console.log('SAMPLE DATA:', this.props.data);
        // console.log('SELECTED OPTION:', this.state.selectedOption);
        console.log('INTERNAL STATE:', this.state);
        const questionsData = this.props.data;
        return (
            <div className="Question__container">
                <div className="Question__content">
                    {questionsData.value}
                </div>
                <div className="Question__options">
                    {questionsData.answers.map((item, index) => {
                        // console.log('QUESTIONS ITEM:', item);
                        return (
                            <div key={index}>
                                <input
                                    type={questionsData.type}
                                    // type={questionsData.type}
                                    name={this.props.data._id} 
                                    value={item.value} 
                                    checked={this.state.selectedOption === item.value}
                                    onChange={(event) => { this.handleOptionChange(event)}}
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

export default Questions;