import React, { Component } from "react";
import {Card, CardContent, Typography} from "@material-ui/core";
import ExchangeRateCard from "./ExchangeRateCard";
import CompanyTable from "./CompanyTable";
import Spinner from 'react-bootstrap/Spinner';


// import data from "../../data";

// Use the following url to access the data for all stores
// http://www.mocky.io/v2/5d4caeb23100000a02a95477
// If you have trouble with this, you can access the data through the uncommenting import "data" file above
// console.log(data);


class Task extends Component {
    constructor(props){
        super(props);
        this.state = {
            base: null,
            rates: {
                USD: null,
                AUD: null,
            },
            companies: [{}],
        };
        this.data = [];
    }
    

    componentDidMount() {
        // fetch API to get base exchange rates for USD  / NZD / AUS
        fetch("http://www.mocky.io/v2/5d4cb480310000c503a95480")
            .then(response => response.json())
            .then(response => this.setState({ ...response }));
        //fetch API to get the data
        fetch("http://www.mocky.io/v2/5d4caeb23100000a02a95477")
            .then(response => response.json())
            .then(data => this.setState({companies: data}));
            

    }

    render() {
        return(
            <div>
                <Card>
                    <CardContent>
                        <Typography>
                            <b>Fetch the following URL to access the data: </b>
                        </Typography>

                        <Typography>
                        <i>http://www.mocky.io/v2/5d4caeb23100000a02a95477</i>
                        </Typography>

                        <Typography>
                            If you have trouble with doing this, you can access the data through by importing the "data".
                        </Typography>

                        <Typography>
                            A table with the exchange rates and an example table with some random data has been provided.
                            Replace the example table with your solution below.
                        </Typography>
                    </CardContent>
                </Card>
                <ExchangeRateCard rates={this.state.rates} base={this.state.base} />
                { /* Waits till the api call has been finished and states are set */ }
                {this.state.companies.length > 1 && this.state.base ? <CompanyTable companies={this.state.companies} rates={this.state.rates}/> : <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '10vh'}} ><Spinner animation="grow" /></div> }

             
            </div>
        );
    }
};

export default Task;

