import React from 'react';
import './App.css';

class App extends React.Component {

  constructor
  (props) {
    super (props)
    this.state = {
      posts: [],
      gpChoice: 'B', gpBody: ''
    }
  }

  componentDidMount() {
    fetch('http://127.0.0.1:8000/api/ghostpost/')
    .then(res => res.json())
    .then(data => this.setState({posts: data}))
  }


  BoastOrRoast(choice) {
    if (choice === 'B') {
      return 'Boast'
    } if (choice === 'R') {
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

  upvotePost = (id) => {
    fetch('http://127.0.0.1:8000/api/ghostpost/' + id + '/Upvote/', {method: 'POST'})
    .then(res => res.json())
    .then(data => this.showAllPosts())
  }

  downvotePost = (id) => {
    fetch('http://127.0.0.1:8000/api/ghostpost/' + id + '/Downvote/', {method: 'POST'})
    .then(res => res.json())
    .then(data => this.showAllPosts())
  }

  handleDropdownChange = (event) => {
    console.log(event.target.value)
    this.setState({gpChoice: event.target.value})
  }

  handleBodyChange = (event) => {
    console.log(event.target.value)
    this.setState({gpBody: event.target.value})
  }

  handleSubmit = (event) => {
    const postOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ ghostpost_choice: this.state.gpChoice, ghostpost_content: this.state.gpBody })
  }
    fetch('http://127.0.0.1:8000/api/ghostpost/', postOptions)
  }

  render() {
  
    return (
      <div>
        <button onClick={this.showAllPosts}>Show All Posts</button>
        <button onClick={this.filterBoasts}>Filter Boasts</button>
        <button onClick={this.filterRoasts}>Filter Roasts</button>
        <button onClick={this.filterPopular}>Most Popular</button>
        
        <hr></hr>
        <div>
          <form id='createPostForm' onSubmit={this.handleSubmit}>

            <select id='ghostpost_choice' onChange={this.handleDropdownChange}>
              <option value='B'>Boast</option>
              <option value='R'>Roast</option>
            </select>
            <br></br>
            <label htmlFor='ghostpost_content'>Body</label>
            <input type='text' id='ghostpost_content' onChange={this.handleBodyChange}></input>
            <input type='submit'></input>
          </form>
        </div>

        <div>
          {this.state.posts.map((p) => {
            return (
              <div>
                <h1>{this.BoastOrRoast(p.ghostpost_choice)}</h1>
                <ul>
                  <li>Body : {p.ghostpost_content}</li>
                  <li>Vote Score : {p.vote_score}</li>
                  <li>Created : {this.ConvertDate(p.creation_date)}</li>
                  <li>Updated : {this.ConvertDate(p.updated)}</li>
                  <label htmlFor='upvoteButton'>{p.upvotes}</label>
                    <button id='upvoteButton' onClick={() => this.upvotePost(p.id)}>Upvote</button>
                  <br></br>
                  <label htmlFor='downButton'>{p.downvotes}</label>
                    <button id='downvoteButton' onClick={() => this.downvotePost(p.id)}>Downvote</button>
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;