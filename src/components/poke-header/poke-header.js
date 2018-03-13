import React, { Component } from 'react';
import './poke-header.css';

export default class PokeHeader extends Component {
    render() {
        return (
            <header className="main-header">
                <h1 className="title">Pokedex</h1>
            </header>
        );
    }
}