import React, { Component } from 'react';
import './input.css';

export default class InputSearch extends Component {
    
    handleChange(e){
        const value = e.target.value;
        this.props.handle(value)
    }
    
    render() {
        return (
            <form className="input-search">
                <input placeholder="Filtra por nombre" onChange={(e) => this.handleChange(e)} />
            </form>
        );
    }
}