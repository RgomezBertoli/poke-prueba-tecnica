import React, { Component } from 'react';
import './poke-footer.css';

export default class PokeFooter extends Component {
    render() {
        return (
            <footer className="poke-footer">
                <button onClick={() => this.props.click()}>Catch Them All!</button>
            </footer>
        );
    }
}