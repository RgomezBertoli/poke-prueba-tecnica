import React, { Component } from 'react';
import PokeSpec from '../poke-spec/poke-spec';
import './poke-list.css';

export default class PokeList extends Component {
    render() {
        return (
            <ul className="poke-list">
                {this.props.pokemons.map(pokemon => <PokeSpec key={pokemon.name} pokemon={pokemon} />)}
            </ul>
        );
    }
}