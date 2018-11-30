import './JokeList.css';
import React from 'react';
import axios from 'axios';


class JokeList extends React.Component {
    state = { jokes: '' }

    componentDidMount(){
        
        axios.get('http://localhost:8888/api/jokes', {headers: {authorization: localStorage.getItem('jwt')}})
             .then(res => {
                 console.log(res)
                this.setState({jokes: res.data})
             })
             .catch(err => console.log('error JokeList',err))
    }
    render() { 
        return ( 
            <div>
            {this.state.jokes ? this.state.jokes.map((joke,index) =>  
                       (<div className="jokecard"key={index} >
                            <div>{joke.setup}</div>
                            <div>{joke.punchline}</div>
                       </div>)
            ) : 'Jokes.'}
            </div>
         );
    }
}
 
export default JokeList;