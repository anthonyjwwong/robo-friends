import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';


class App extends Component {
    //For state.
    constructor() {
       super() 
       this.state = {
           robots: [],
           searchfield: ''
       }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response=>response.json())
            .then(users =>this.setState({ robots: users}))
    }

    onSearchChange= (evt) => {
        this.setState({ searchfield: evt.target.value });
       

    }

    render() {
        const filteredRobot = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        })
        if (this.state.robots.length === 0) {
            return <h1>Loading</h1>
        } else {
            return(
                <div className='tc'>
                    <h1>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary>
                          <CardList robots={filteredRobot} />
                        </ErrorBoundary>
                        
                    </Scroll>
                    
                </div>
            
            )
        }
    }
}

export default App;
