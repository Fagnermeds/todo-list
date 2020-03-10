import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoList from './todoList'
import TodoForm from './todoForm'

const URL = 'http://localhost:3003/api/todos';

export default class Todo extends Component{

    constructor(props){
        super(props);
        this.state = { description: '', list: []}
        
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this);
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleClear = this.handleClear.bind(this);

        this.listTask = [];
        this.refresh();

    }
    
    refresh(description = ''){

        const search = description ? `&description__regex=/${description}/` : '';

     
        
        axios.get(`${URL}?sort=-createdAt${search}`)
        .then(res => {
                
                if(search === '') this.clearInput();

                this.setState({...this.state, description, list: res.data});

            }).catch(err => {

                console.error('error: ', err);

            });

    }

    handleSearch(){

        this.refresh(this.state.description);

    }

    handleChange(e){

        this.setState({description: e.target.value});

    }

    handleAdd(){

        this.listTask.push(this.state.description);

        this.setState({list: this.listTask});

        axios.post(URL, {description: this.state.description})
            .then(res =>{

                this.refresh();

            }).catch(err => {

                console.log(err);

            });
        

    }

    handleDelete(todo){

        axios.delete(URL + '/' + todo._id)
            .then(res => {  
                
                this.refresh(this.state.description);

            }).catch(err => {

                console.error('error: ', err);

            });

    }

    clearInput(){
        document.getElementById('description').value = '';
    }

    handleClear(){

        this.refresh();

    }

    handleMarkAsDone(todo){

        axios.put(`${URL}/${todo._id}`, {...todo, done: true})
            .then(res=>{

                this.refresh(this.state.description);

            }).catch(err => {

                console.error('error: ', err);

            });

    }

    handleMarkAsPending(todo){

        axios.put(`${URL}/${todo._id}`, {...todo, done: false})
            .then(res => {

                this.refresh(this.state.description);

            }).catch(err => {

                console.error('error: ', err);

            })

    }

    render(){

        return (
            <div>
                <PageHeader name='Tarefas' small='Cadastro'></PageHeader>
                <TodoForm 
                    handleAdd={this.handleAdd} 
                    handleChange={this.handleChange}
                    handleSearch={this.handleSearch}
                    handleClear={this.handleClear}
                ></TodoForm>
                <TodoList 
                    list={this.state.list}
                    handleDelete={this.handleDelete}
                    handleMarkAsDone = {this.handleMarkAsDone}
                    handleMarkAsPending = {this.handleMarkAsPending}
                ></TodoList>
            </div>
        )

    }

}