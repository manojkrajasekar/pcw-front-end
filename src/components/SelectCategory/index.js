import React from 'react';
import Select from 'react-select';
import HomePage from '../../components/HomePage';
import { Switch, BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import './styles.css';
import './stylebc.css';

class SelectCategory extends React.Component {

    state = {
        itemCategory: null,
    }

    handleCategoryChange = (e, value)  => {
        this.setState({
            itemCategory: e.value,
        })
    } 

    render() {
        const options = [
            { value: 'Food', label: 'Food' },
            { value: 'NearFood', label: 'NearFood' },
        ];

        return  (
            <Router>
                <div>
                    <Route exact path="/select-category">
                        <div className="Select__category--title">
                            Select Category
                        </div>
                        <Select 
                            className="Select__category"
                            options={options} 
                            onChange={(event, value) => { this.handleCategoryChange(event, value) }}
                        />
                        <Link 
                            to="/questions"
                            className="link__questions"
                        >
                            Next
                        </Link>   
                    </Route>
                    <Switch>
                        <Route exact path="/questions">
                        <div className="Questions__Page--title">
                            <div className="Questions__Page--walmart"/>
                            <div className="Product__name">PCW</div>
                        </div>
                        <div className="HomePage__Product">
                            <div className="HomePage__Product_container">
                                <div className="HomePage__bardCode" />
                                <div className="HomePage__product_info">
                                    <div className="Product__info">Milkey Milk Drink</div>
                                    <div className="Product__info">Cows Came Home, LLC</div>
                                    <div className="Product__info">John Anderson - US</div>
                                </div>
                            </div>
                           <Link 
                                className="HomePage__Product_save_progress"
                                to="/select-category">
                                Back to Home
                            </Link>
                            <div className="HomePage__Product_save_progress">
                                Save Progress
                            </div>
                        </div>
                            <HomePage />
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default SelectCategory;