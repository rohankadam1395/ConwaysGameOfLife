
import React from 'react';
import './HomePage.css';

import Canvas from './Canvas';
class HomePage extends React.Component{
// constructor(props){
//     super(props);
// }


render(){
    return(<div id="home">
                    <h1>Conway's Game Of Life</h1>

<Canvas />
    </div>)
}
}

export default HomePage;