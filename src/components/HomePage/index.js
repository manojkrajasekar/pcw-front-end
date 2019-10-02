import React from 'react';
import Pages from '../Pages';
import SampleData from '../../SampleData';
import './styles.css';

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

    render() {
        const totalPageCount = SampleData.pages.length - 1;
        console.log('LENGTH:', totalPageCount);
        return (
            <div className="HomePage">
                <Pages pageData={SampleData.pages[this.state.pageNumber]} />
                <div className="HomePage__footer">
                    <div>
                        {SampleData.pages.map((item, index) => {
                            const isCurrentPage = index === this.state.pageNumber ? true : false;
                            console.log('INDEX:', index);
                            console.log('PAGE NUMBER:', this.state.pageNumber);
                            return (
                                <span 
                                    onClick={() => { this.renderNextPage(index) }} 
                                    className={`PageNumber__box ${isCurrentPage ? 'highlight': ' ' }`}
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

export default HomePage;