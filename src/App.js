import React, {Component} from 'react';

export default class App extends Component {
    render () {
        return (
            <div>
                <h1>我是头部</h1>
                {this.props.children}
                <h1>我是尾部</h1>
            </div>
        );
    }
}
