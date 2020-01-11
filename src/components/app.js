"use strict"

import React from 'react';
import {Switch, Route} from 'react-router-dom';

import {Header} from './header.js';
import {Home} from './home.js';
import {BookList} from '../components/BookList';
import BookStore from '../stores/bookStore';
import {AuthorList} from '../components/AuthorList';
import AuthorStore from '../stores/authorStore';
 
export class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            book:{
                bookList: [],
                readState:{
                    pending:false,
                    success:false,
                    failure:false
                },
                error: 'this is an error man'
            },
            author:{
                authorList: [],
                readState:{
                    pending:false,
                    success:false,
                    failure:false
                },
                error: 'this is an error man'
            }
        }
    }

    render() {
        return(
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/books' render={(props) => (<BookList {...props} book={this.state.book} />)}/>
                    <Route path='/authors' render={(props) => (<AuthorList {...props} author={this.state.author} />)}/>
                </Switch>
            </div>
        );
    }

    componentDidMountBook(){
        BookStore.addChangeListener(this._onBookChange.bind(this));
    }

    componentDidMountAuthor(){
        BookStore.addChangeListener(this._onAuthorChange.bind(this));
    }

    componentWillUnmountBook(){
        BookStore.removeChangeListener(this._onBookChange.bind(this));
    }

    componentWillUnmountAuthor(){
        AuthorStore.removeChangeListener(this._onAuthorChange.bind(this));
    }

    _onBookChange(){
        this.setState({book: BookStore.getAllBooks()});
    }

    _onAuthorChange(){
        this.setState({author: AuthorStore.getAllAuthors()});
    }
}