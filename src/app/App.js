import React, { Component } from 'react';
import Shield from '../components/shield/shield';
import PokeHeader from '../components/poke-header/poke-header';
import InputSearch from '../components/input/input';
import PokeList from '../components/poke-list/poke-list';
import PokeFooter from '../components/poke-footer/poke-footer';
import { AjaxRequest } from '../services/ajax';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showShield: false,
      pokemons: []
    };
  }

  componentDidMount() {
    this._init();
  }

  _init() {
    this._showShield();
    const service = {
      method: 'GET',
      endpoint: 'pokemon/',
      queryParams: {
        limit: 3
      }
    };

    new AjaxRequest({ service })
      .makeRequest()
      .then(response => this._handlePaginationResponse(response))
      .then((allPokeData) => {
        this._removeShield();
        this.setState({
          filteredPokemons: allPokeData,
          pokemons: allPokeData
        });
      })
      .catch(() => this.removeShield());
  }

  _handlePaginationResponse(response){
    this.pagination = {
      count: response.count,
      next: response.next
    };

    const getAllPokeDatas = response.results.map(poke => this._getPokemonByUrl(poke.url));

    return Promise.all(getAllPokeDatas);
  }

  filterPokemons(value){
    if(value){
      const filter = this.state.pokemons.filter(pokemon => pokemon.name.includes(value.toLowerCase()));
      this.setState({filteredPokemons: filter});
    } else {
      this.setState({filteredPokemons: this.state.pokemons});
    }
  }

  _getPokemonByUrl(url) {
    return new Promise((resolve, reject) => {
      new AjaxRequest({ url })
        .makeRequest()
        .then(resolve)
        .catch(reject);
    });
  }

  _getMorePokemons(){
    this._showShield();    
    const url = this.pagination.next;

    this._getPokemonByUrl(url)
        .then(response => this._handlePaginationResponse(response))
        .then(morePokeData => {
          const pokemons = this.state.pokemons;
          const newPokemons = pokemons.concat(morePokeData);
          
          this.setState({pokemons: newPokemons});
          this._removeShield();
        })
        .catch(() => this.removeShield());
  }

  _showShield() {
    this.setState({ showShield: true });
  }

  _removeShield() {
    this.setState({ showShield: false });
  }

  render() {
    const pokemonsToShow = this.state.filteredPokemons || [];

    return (
      <main>
        <div className="main-wrapper">
          <PokeHeader />
          <InputSearch handle={(data) => this.filterPokemons(data)} />
          <PokeList pokemons={pokemonsToShow} />
          <PokeFooter click={() => this._getMorePokemons()} />
        </div>
        <Shield show={this.state.showShield} />
      </main>
    );
  }
}

export default App;
