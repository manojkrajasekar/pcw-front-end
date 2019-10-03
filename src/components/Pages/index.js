import React from 'react';
import Questions from '../Questions';

import { connect } from 'react-redux';
import './styles.css';



class Pages extends React.Component {
    render() {
        console.log('PAGE PROPS:', this.props.pageData);
        console.log('PAGE DATA:', this.props.answersData);
        return (
            <div className="Page__Container">
                {this.props.pageData.questions.map((item, index) => {
                    return <Questions key={index} data={item}/>
                })}
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