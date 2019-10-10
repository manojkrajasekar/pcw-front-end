import React from 'react';
import Select from 'react-select';
import HomePage from '../../components/HomePage';
import { Switch, BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './styles.css';

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
                            <HomePage />
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default SelectCategory;