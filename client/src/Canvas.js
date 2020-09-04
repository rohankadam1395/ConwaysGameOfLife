import React from 'react';
import './Canvas.css';
class Canvas extends React.Component{
constructor(props){
super(props);

this.state={
    canvasRef:React.createRef(null),
    generations:0
}
this.handleClick=this.handleClick.bind(this);
this.activeArray=[];
this.inactiveArray=[];
this.neighbours=[];
this.canvas="";
this.context="";
this.cellSize=50;
this.timer="";
this.randomize=this.randomize.bind(this);
this.update=this.update.bind(this);
this.stop=this.stop.bind(this);
this.initialize=this.initialize.bind(this);
this.left=0;
this.top=0;


}

stop(){
clearInterval(this.timer);
}

initialize(){
    clearInterval(this.timer);
    for(let i=0;i<this.cellsY;i++){
        this.activeArray[i]=[];
        this.neighbours[i]=[];


        for(let j=0;j<this.cellsX;j++){
        this.activeArray[i][j]=0;
        this.neighbours[i][j]=0;

        }
        
        }
        this.inactiveArray=this.activeArray;
        this.fillArray(this.activeArray,this.context);

}

randomize(){
    for(let i=0;i<this.cellsY;i++){
        // this.activeArray[i]=[]
        for(let j=0;j<this.cellsX;j++){
            // console.log(Math.round(Math.random()));
        this.activeArray[i][j]=Math.round(Math.random());
        // console.log(this.activeArray[i][j]+" >>");
        }
        
        }
this.inactiveArray=this.activeArray;
        this.fillArray(this.activeArray,this.context);
}

fillArray(activeArray,context){
    for(let i=0;i<this.cellsY;i++){
        // this.activeArray[i]=[]
        for(let j=0;j<this.cellsX;j++){
            // console.log(Math.round(Math.random()));
        // this.activeArray[i][j]=Math.round(Math.random());
        // console.log(this.activeArray[i][j]+"  ???");
        if(activeArray[i][j]===1){
            // console.log("Hello");
context.fillStyle="#32CD32";
context.fillRect(j*this.cellSize,i*this.cellSize,this.cellSize,this.cellSize);
        }else{
        context.fillStyle="#000000";
        context.fillRect(j*this.cellSize,i*this.cellSize,this.cellSize,this.cellSize);

            // console.log("Not Hello");

        }
        }
        
        }
}

update(){
clearInterval(this.timer);

    this.timer=setInterval(() => {
        this.countNeighbours();

        for(let i=0;i<this.cellsY;i++){
            for(let j=0;j<this.cellsX;j++){
                let state=this.checkRules(i,j);
                 this.inactiveArray[i][j]=state;
    
            }
        }
        this.activeArray=this.inactiveArray;
         this.fillArray(this.activeArray,this.context); 
    }, 300);
    
}

checkRules(i,j){
    // console.log("Check Rules");
let countOfNeighbours=this.neighbours[i][j];
if(this.activeArray[i][j]===1){
if((countOfNeighbours===2||countOfNeighbours===3)){
return 1;
}else{
    return 0;
}

}else{
    // console.log("Dead");
if(countOfNeighbours===3){
    // console.log("true--->>>>>>");
   return 1; 
}else{
    return 0;
}
}
    //  console.log("i  "+i+"  j   "+j+"   count " +countOfNeighbours);
}  

countNeighbours(){

    
for(let i=0;i<this.cellsY;i++){
    for(let j=0;j<this.cellsX;j++){
        let count=0;
        let top=0;
        let bottom=0;
        let left=0;
        let right=0;
        let topLeft=0;
    let topRight=0;
    let bottomLeft=0;
    let bottomRight=0;
        if(i>0&&j>0){
            topLeft=this.activeArray[i-1][j-1];
        }
        
        if(i>0&&j<this.cellsX-1){
            topRight=this.activeArray[i-1][j+1];
        }
        
        if(i<this.cellsY-1&&j>0){
        bottomLeft=this.activeArray[i+1][j-1];
        }
        
        if(i<this.cellsY-1&&j<this.cellsX-1){
            bottomRight=this.activeArray[i+1][j+1];
        }
            if(i>0){
                top=this.activeArray[i-1][j];
        
            }
            if(i<this.cellsY-1){
                 bottom=this.activeArray[i+1][j];;
            }
            if(j>0){
                left=this.activeArray[i][j-1];;
        
            }
        
            if(j<this.cellsX-1){
                 right=this.activeArray[i][j+1];
        
            }
        // console.log("Top  "+top+"  Right "+right+" Botttom  "+bottom+" Left  "+left+"  Bottom Left "+bottomLeft+" BottomRight  "+bottomRight+" TopLeft "+topLeft+" TopRight"+topRight);
        count=top+bottom+left+right+topLeft+topRight+bottomLeft+bottomRight;
            // console.log(count);
        // if(count===3){
        //     console.log("*************");
        // }
        
        this.neighbours[i][j]=count;

    }
}




}
componentDidMount(){
 this.canvas=this.state.canvasRef.current;
 this.context=this.canvas.getContext('2d');
this.cellsX=this.context.canvas.width/this.cellSize;
this.cellsY=this.context.canvas.height/this.cellSize;
this.left=this.context.canvas.getBoundingClientRect().left;
this.top=this.context.canvas.getBoundingClientRect().top;

// console.log(this.context.canvas.width);
// console.log(window.innerWidth);
// console.log(this.context.canvas.getBoundingClientRect().left);
// console.log(this.context.canvas.getBoundingClientRect().right);

// // console.log(context.canvas.height);
// console.log("CellsX "+this.cellsX);
// console.log("CellsY "+this.cellsY);
// const activeArray=[];

this.initialize(this.activeArray);



// setTimeout(()=>{
// console.log("Time out");
// },500);

this.randomize(this.activeArray);
    // this.fillArray(this.activeArray,this.context);

// setInterval(() => {

    

    
// }, 500);
  
    






// context.fillRect(i*this.cellSize,0,this.cellSize,this.cellSize);


// context.fillRect(0,0,context.canvas.width,context.canvas.height);

}




handleClick(event){
// console.log(event);
// console.log(event.clientX+"  "+event.clientY);
// console.log(this.canvas.getBoundingClientRect().left);
// console.log(this.canvas.getBoundingClientRect().top);
// console.log((event.clientX-this.canvas.getBoundingClientRect().left));

// console.log((event.clientX-this.canvas.getBoundingClientRect().left)-(event.clientX-this.canvas.getBoundingClientRect().left)%5);
// console.log(event.clientY-this.canvas.getBoundingClientRect().top);
// console.log((event.clientY-this.canvas.getBoundingClientRect().top)%5);
// console.log(event.clientY-this.canvas.getBoundingClientRect().top-(event.clientY-this.canvas.getBoundingClientRect().top)%5);

// console.log("/////");
let i=(event.clientX-this.canvas.getBoundingClientRect().left)-(event.clientX-this.canvas.getBoundingClientRect().left)%this.cellSize;
let j=event.clientY-this.canvas.getBoundingClientRect().top-(event.clientY-this.canvas.getBoundingClientRect().top)%this.cellSize;;
// let x=this.context.canvas.getBoundingClientRect().left;
// console.log(i+"  "+j);
// console.log(this.activeArray[j/5][i/5]);
// console.log(i/5+"  "+j/5);
 this.activeArray[j/this.cellSize][i/this.cellSize]=1;
this.context.fillStyle="#32CD32";
// console.log((event.clientX-x));
this.context.fillRect(i,j,this.cellSize,this.cellSize);

// console.log(event.clientY);

}


render(){
    return (
        <div id="canvasHold" >
 <canvas width="800" height="400" id="canvas" ref={this.state.canvasRef} onClick={this.handleClick} ></canvas>
<button onClick={this.randomize}>Randomize</button>
<div id="displayBox">
    <h4>Generations</h4>
    <h4>{this.state.generations}</h4>
</div>
<button onClick={this.update}>Start</button>
<button onClick={this.stop}>Stop</button>
<button onClick={this.initialize}>Clear</button>    
        </div>
       

    )
}

}





export default Canvas;