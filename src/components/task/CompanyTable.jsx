import React, { Component } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import Select from 'react-select';

import {
    TableCell,
    TableRow,
    TableHead,
    Card, CardContent, Typography
} from "@material-ui/core";
import TableData from "./TableData";
import TablePages from "./TablePages";

const sortButtonStyle = {
  width: '100%',
  textAlign: 'center',

};

class CompanyTable extends Component {
   constructor(props) {
      super(props);
      this.data = props.companies.filter((item) => item.returned === false);
      // eslint-disable-next-line
      this.data.map((data, ind) => //converts all the prices to NZD because of the aussumption in the email that prices are recorded in their origin currency
        {
          switch(data.country) {
            case "USA":
              data.value = Math.round((data.value / props.rates["USD"]) * 100) / 100;
              break;
            case "AUS":
              data.value = Math.round((data.value / props.rates["AUD"]) * 100) / 100;
              break;
            default:
              data.value = Math.round((data.value / 1) * 100) / 100;
              break;
          }
        }
      );
      this.countries = [...new Set(this.data.map(item => item.country))].map((x,y) => ({ value: x, label: x }));
      this.countries.unshift({ value: '', label: 'ALL' });
      this.rates = Object.keys(props.rates).map((key) => ({ value: props.rates[key], label: key }));
      this.rates.unshift({value: 1, label: 'NZD'});
      this.state = {
        companies: this.data,
        sortColumn: 'store',
        sortAsc: true,
        rate: 1,
        activePage: 1,
        pageData: [{}],
        pages: Math.ceil(this.data.length / 10),
        countrySelected: this.countries[0],
        currencySelected: this.rates[0],
      }

      this.loadPage = this.loadPage.bind(this);

   }

  componentDidMount() {
    this.filter();
  }
      
  compareBy(key) {
        this.setState({sortAsc: !this.state.sortAsc});
        let val = 1;
        this.state.sortAsc === true ? val = 1 : val = -1;
        return function (a, b) {
          if (a[key] < b[key]) return val;
          if (a[key] > b[key]) return -val;
          return 0;
        };
      }

    sortBy(key){
        let arrayCopy = this.state.companies.sort(this.compareBy(key));
        this.setState({companies: arrayCopy,
          sortColumn: key}, function(){
            this.loadPage(this.state.activePage);
          });
        
    }

    filter(){
        var store = document.getElementById('storeFilter').value;
        var transaction = document.getElementById('transactionFilter').value;
        var country = this.state.countrySelected.value; //document.getElementById('countryFilter').value;
        let arrayCopy = this.data.filter((item) => item['store'].toLowerCase().indexOf(store.toLowerCase()) > -1)
                                .filter((item) => item['country'].toLowerCase().indexOf(country.toLowerCase()) > -1)
                                .filter((item) => item['id'].toLowerCase().indexOf(transaction.toLowerCase()) > -1);
        this.setState({sortAsc: !this.state.sortAsc}, function() { //doesn't invert sorting retains it while filtering
          arrayCopy.sort(this.compareBy(this.state.sortColumn));
        });
        this.setState({pages: Math.ceil(arrayCopy.length / 10),
          companies: arrayCopy}, function() { //ensures it's filtered before loading the page...
          this.loadPage(1);
        });
    }

  changeRate(){
    var rate = this.state.currencySelected.value;
    let arrayCopy = this.state.companies;
    // eslint-disable-next-line 
    arrayCopy.map((data, ind) =>
        {
        let base = data.value / this.state.rate;
        data.value = Math.round((base * rate) * 100) / 100; // should round this properly
        }
      )
    this.setState({rate: rate,
        companies: arrayCopy});
  }

  loadPage(pageNo){
    let arrayCopy = this.state.companies.slice((pageNo - 1)* 10, (pageNo) * 10);
    this.setState({activePage: pageNo,
                  pageData: arrayCopy});
  }

  resetFilters(){
    this.setState({
      currencySelected: this.rates[0],
      countrySelected: this.countries[0]}, function(){
        document.getElementById('storeFilter').value = '';
        document.getElementById('transactionFilter').value = '';
        this.filter();
      });
  }

  handleCountry = countrySelected => {
    this.setState({countrySelected: countrySelected}, function() {
      this.filter();
    });
  };

  handleCurrency = currencySelected => {
    this.setState({currencySelected: currencySelected}, function() {
      this.changeRate();
    });
  };

  

   render() {
      const  countrySelected  = this.state.countrySelected;
      const  currencySelected  = this.state.currencySelected;
        return(
        <Card>
          <CardContent>
            <Typography>Company Sales Data <br/>
            You can sort by clicking on column headers also filter with the dropdowns and text box!

            </Typography>
            <br/>
            <Button style={sortButtonStyle} variant="outline-danger" onClick={() => this.resetFilters()}>Reset Filters</Button>
            <Table striped bordered hover>
                <TableHead>
                    <TableRow>

                    <TableCell>
                    <Button style={sortButtonStyle} variant="outline-dark" onClick={() => this.sortBy('id')}>Transaction ID</Button>
                    <FormControl id='transactionFilter' onChange={() => this.filter()}
                          placeholder="Type to filter transaction ids"
                        />
                    </TableCell>
                        <TableCell>

                        <Button style={sortButtonStyle} variant="outline-dark" onClick={() => this.sortBy('store')}>Store</Button>
                        <FormControl id='storeFilter' onChange={() => this.filter()}
                          placeholder="Type to filter stores"
                        />
                        </TableCell>

                        <TableCell>

                          <Button style={sortButtonStyle} className="sortButton" variant="outline-dark" onClick={() => this.sortBy('country')}>Country</Button>

                          { /* <select key={`countries`} id='countryFilter' onChange={() => this.filter()}>
                          <option value=''>All</option>{this.countries.map((x,y) => <option key={`country_${x}`}>{x}</option>)}
                          </select> */ }

                          <Select
                            value={countrySelected}
                            onChange={this.handleCountry}
                            options={this.countries}
                          />

                          </TableCell>

                        <TableCell>

                        <Button style={sortButtonStyle} variant="outline-dark" onClick={() => this.sortBy('value')}>Value</Button>

                       { /* <select key={`rates`} id='rates' onChange={() => this.changeRate()}>
                          <option value='1'>NZD</option>{Object.keys(this.rates).map((x,y) => <option key={`currency_${x}`} value={this.rates[x]}>{x}</option>)}
                          </select> */ }

                          <Select
                            value={currencySelected}
                            onChange={this.handleCurrency}
                            options={this.rates}
                          />

                        </TableCell>

                    </TableRow>
                </TableHead>
                { this.state.pageData.length ? <TableData companies={this.state.pageData} columns={['id', 'store', 'country', 'value']}/> : null }{ /* prevents it loading data before the api call to stop the null key errors */ } 
            </Table>
            <TablePages pageCount={this.state.pages} active={this.state.activePage} loadPage={this.loadPage} />
        </CardContent>
    </Card>

        );

    }
}

export default CompanyTable //exporting a compo