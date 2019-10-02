import React from 'react';
import Questions from '../Questions';
import './styles.css';

class Pages extends React.Component {
    render() {
        console.log('PAGE PROPS:', this.props);
        return (
            <div className="Page__Container">
                {this.props.pageData.questions.map((item, index) => {
                    return <Questions key={index} data={item}/>
                })}
            </div>
        )
    }
}

export default Pages;