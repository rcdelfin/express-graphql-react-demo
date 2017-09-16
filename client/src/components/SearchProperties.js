import React, { Component } from 'react';
import { gql, withApollo } from 'react-apollo';
import { Jumbotron, Button, Table } from 'react-bootstrap';

class SearchProperties extends Component {

  state = {
    properties: [],
    searchText: ''
  }

  render() {
    return (
      <Jumbotron>
        <h1>Search Properties</h1>
        <input
          type='text'
          onChange={(e) => this.setState({ searchText: e.target.value })}
        />
        <Button bsStyle="primary" onClick={() => this._executeSearch()}>Search</Button>
        <p><small>Hint: Utah, Oregon, Alabama, Greentown</small></p>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Street</th>
              <th>City</th>
              <th>State</th>
              <th>Zip</th>
              <th>Rent</th>
            </tr>
          </thead>
          <tbody>
            { this.state.properties.map( prop => 
              (
                <tr key={prop.id}>
                  <td>{prop.id}</td>
                  <td>{prop.street}</td>
                  <td>{prop.city}</td>
                  <td>{prop.state}</td>
                  <td>{prop.zip}</td>
                  <td>{prop.rent}</td>
                </tr>                
              )
            )}            

          </tbody>
        </Table>
      </Jumbotron>        
    )
  }

  _executeSearch = async (e) => {
    console.log("Searching:", this.state.searchText);

    const { searchText } = this.state;

    if (!searchText) {
      this.setState({ properties: [] });
      return;
    }
    
    const ALL_PROPERTIES_SEARCH_QUERY = gql`
      query AllPropertiesSearchQuery($searchText: String!) {
        getProperties(
          filter: {
            OR: [
              { id_contains: $searchText }
              { street_contains: $searchText }
              { city_contains: $searchText }
              { state_contains: $searchText }
              { zip_contains: $searchText }            
            ]
          }
        ) {
          id
          street
          city
          state
          zip
          rent
        }
      }
    `;    

    const result = await this.props.client.query({
      query: ALL_PROPERTIES_SEARCH_QUERY,
      variables: { searchText },
    });
    const properties = result.data.getProperties;
    this.setState({ properties });    
  }

}

export default withApollo(SearchProperties);