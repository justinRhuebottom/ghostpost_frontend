import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {

  constructor
  (props) {
    super (props)
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    fetch('http://127.0.0.1:8000/api/ghostpost/')
    .then(res => res.json())
    .then(data => this.setState({posts: data}))
  }


  BoastOrRoast(choice) {
    if (choice == 'B') {
      return 'Boast'
    } if (choice == 'R') {
      return 'Roast'
    }
  }

  ConvertDate(creation_date) {
    return creation_date.slice(0,10) + ' ' + creation_date.slice(12,19)
  }

  showAllPosts = () => {
    fetch('http://127.0.0.1:8000/api/ghostpost/')
    .then(res => res.json())
    .then(data => this.setState({posts: data})
  )}

  filterBoasts = () => {
    fetch('http://127.0.0.1:8000/api/ghostpost/Boasts/')
    .then(res => res.json())
    .then(data => this.setState({posts: data})
  )}

  filterRoasts = () => {
    fetch('http://127.0.0.1:8000/api/ghostpost/Roasts/')
    .then(res => res.json())
    .then(data => this.setState({posts: data})
  )}

  filterPopular = () => {
    fetch('http://127.0.0.1:8000/api/ghostpost/Rating/')
    .then(res => res.json())
    .then(data => this.setState({posts: data})
  )}

  createPost = () => {}

  render() {
  
    return (
      <div>
        <button onClick={this.showAllPosts}>Show All Posts</button>
        <button onClick={this.filterBoasts}>Filter Boasts</button>
        <button onClick={this.filterRoasts}>Filter Roasts</button>
        <button onClick={this.filterPopular}>Most Popular</button>
        <button onClick={this.createPost}>Create Post</button>
      {this.state.posts.map(p => (
        <div>
          <h1>{this.BoastOrRoast(p.ghostpost_choice)}</h1>
          <ul>
          <li>Body : {p.ghostpost_content}</li>
          <li>Vote Score : {p.vote_score}</li>
          <li>Created : {this.ConvertDate(p.creation_date)}</li>
          <li>Updated : {this.ConvertDate(p.updated)}</li>
          </ul>
        </div>
      ))}
    </div>
    );
  }
}

export default App;