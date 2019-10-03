import React from 'react';
import Pages from '../Pages';
import SampleData from '../../SampleData';
import './styles.css';

import { connect } from 'react-redux';

class HomePage extends React.Component {

    state = {
        pageNumber: 0,
    };

    renderNextPage = (pageNumber) => {
        this.setState({
            pageNumber: pageNumber,
        })
    }

    renderPreviousPage = () => {
        this.setState({
            pageNumber: this.state.pageNumber -1,
        })
    }
    
    // pageValidationCheck = () => {
    //     this.props.answersData
    // }

    render() {
        const totalPageCount = SampleData.pages.length - 1;
        console.log('ANSWERS DATA:', this.props.answersData);
        // write logic to hide and enable this
        const isDisabled = true;
        return (
            <div className="HomePage">
                <Pages pageData={SampleData.pages[this.state.pageNumber]} />
                <div className="HomePage__footer">
                    <div>
                        {SampleData.pages.map((item, index) => {
                            const isCurrentPage = index === this.state.pageNumber ? true : false;
                            // console.log('INDEX:', index);
                            // console.log('PAGE NUMBER:', this.state.pageNumber);
                            return (
                                <span 

                                    onClick={() => { this.renderNextPage(index) }} 
                                    className={`PageNumber__box ${isCurrentPage ? 'highlight': ' ' } ${isDisabled ? ' ': ' ' }` }
                                >
                                    {index+1}
                                </span>
                            )
                        })}
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

export default connect(mapStateToProps,null)(HomePage);