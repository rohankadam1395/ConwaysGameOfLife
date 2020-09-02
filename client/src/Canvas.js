import { useRef } from "react";
import React from 'react';

class Canvas extends React.Component{
constructor(props){
super(props);

this.state={
    canvasRef:React.createRef(null),
}

this.handleClick=this.handleClick.bind(this);

}
componentDidMount(){
    const canvas=this.state.canvasRef.current;
 const context=canvas.getContext('2d');
 this.cellSize=5;
this.cellsX=context.canvas.width/this.cellSize;
this.cellsY=context.canvas.height/this.cellSize;
console.log(context.canvas.width);
console.log(context.canvas.height);
console.log(this.cellsX);
console.log(this.cellsY);
this.activeArray=[];
for(let i=0;i<this.cellsY;i++){
this.activeArray[i]=[]
for(let j=0;j<this.cellsX;j++){
this.activeArray[i].push(0);
}

}
for(let i=0;i<this.cellsY;i++){
    // this.activeArray[i]=[]
    for(let j=0;j<this.cellsX;j++){
        console.log(Math.round(Math.random()));
    this.activeArray[i][j]=Math.round(Math.random());
    console.log(this.activeArray[i][j]+" >>");
    }
    
    }

// setTimeout(()=>{
// console.log("Time out");
// },500);

    for(let i=0;i<this.cellsY;i++){
        // this.activeArray[i]=[]
        for(let j=0;j<this.cellsX;j++){
            // console.log(Math.round(Math.random()));
        // this.activeArray[i][j]=Math.round(Math.random());
        console.log(this.activeArray[i][j]+"  ???");
        if(this.activeArray[i][j]===1){
            console.log("Hello");
context.fillStyle="#FF0000";
context.fillRect(j*this.cellSize,i*this.cellSize,this.cellSize,this.cellSize);
        }else{
            context.fillStyle="#000000";
            context.fillRect(j*this.cellSize,i*this.cellSize,this.cellSize,this.cellSize);

            console.log("Not Hello");

        }
        }
        
        }
    






// context.fillRect(i*this.cellSize,0,this.cellSize,this.cellSize);


// context.fillRect(0,0,context.canvas.width,context.canvas.height);

}




handleClick(event){
console.log(event);
console.log(event.clientX+"  "+event.clientY);
this.context.fillRect(event.clientX,event.clientY,5,5);
// console.log(event.clientY);


}


render(){
    return (
        <canvas id="canvas" ref={this.state.canvasRef} onClick={this.handleClick}></canvas>
    )
}

}





export default Canvas;