import React, { Component } from 'react';
import './poke-spec.css';

export default class PokeSpec extends Component {
    render() {
        const pokemon = this.props.pokemon;
        return (
            <li className="poke-spec">
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                <p className="name-container"><span>{pokemon.name}</span></p>
                <p className="tags-container">{
                    pokemon.types.map((elem, index) => (
                        <span key={index} className={'type-tag ' + elem.type.name}>{elem.type.name}</span>)
                    )
                }</p>
            </li>
        );
    }
}