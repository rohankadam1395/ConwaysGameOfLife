import React from 'react';
import './Canvas.css';
class Canvas extends React.Component{
constructor(props){
super(props);
this.canvasRef=React.createRef(null);

this.state={
    generations:0,
activeArray:[],
inactiveArray:[],
neighbours:[],
canvas:"",
context:"",
cellSize:25,
timer:"",
left:0,
top:0,
colorUnfilled:"#D4D6B9",
colorfilled:"green",
 width:(window.innerWidth/2)%25<25 ? (window.innerWidth/2)-(window.innerWidth/2)%25 : (window.innerWidth/2)+(100-(window.innerWidth/2)%25),
height:(window.innerHeight/2)%25<25 ? (window.innerHeight/2)-(window.innerHeight/2)%25 : (window.innerHeight/2)+(100-(window.innerHeight/2)%25),
patterns:[],
}

// this.generations=0;
// this.activeArray=[];
// this.inactiveArray=[];
// this.neighbours=[];
// this.canvas="";
// this.context="";
// this.cellSize=50;
// this.timer="";

// this.left=0;
// this.top=0;

this.handleClick=this.handleClick.bind(this);
this.randomize=this.randomize.bind(this);
this.update=this.update.bind(this);
this.stop=this.stop.bind(this);
this.initialize=this.initialize.bind(this);
this.clear=this.clear.bind(this);
this.updateDimensions=this.updateDimensions.bind(this);
this.patternSet=this.patternSet.bind(this);
this.savePattern=this.savePattern.bind(this);
this.handleSubmit=this.handleSubmit.bind(this);
}

stop(){
clearInterval(this.state.timer);
}


updateDimensions(){
    let width=(window.innerWidth/2)%25<25 ? (window.innerWidth/2)-(window.innerWidth/2)%25 : (window.innerWidth/2)+(100-(window.innerWidth/2)%25);
   let  height=(window.innerHeight/2)%25<25 ? (window.innerHeight/2)-(window.innerHeight/2)%25 : (window.innerHeight/2)+(100-(window.innerHeight/2)%25);

setTimeout(()=>{
if(width!=this.state.width || height!=this.state.height){
    this.setState({
        width:width,
        height:height,
        canvas:this.canvasRef.current,
        context:this.canvasRef.current.getContext('2d'),
        cellsX:width/this.state.cellSize,
    cellsY:height/this.state.cellSize,
    left:this.canvasRef.current.getBoundingClientRect().left,
    top:this.canvasRef.current.getBoundingClientRect().top

    },()=>{
        // this.initialize();
        // this.fillArray(temp,this.state.context);
        this.initialize(false);
        // this.fillArray(this.state.activeArray,this.state.context);
    })


}


},500);

   
}

initialize(randomize){
    clearInterval(this.state.timer);
    // this.clear();
    // let activeTemp=this.state.activeArray.slice();
    // let neightTemp=this.state.neighbours.slice();
    let activeTemp=[];
    let neightTemp=[];
    console.log("In Initialize");


    

    for(let i=0;i<this.state.cellsY;i++){

       

        // this.state.activeArray[i]=[];
        // this.state.neighbours[i]=[];
        // console.log(i);
        // console.log(this.state.activeArray[i]);
        if(this.state.activeArray.length){
            // console.log("activeArray length > 0 for i = "+i)
            activeTemp[i]=[];

            // neightTemp[i]=[];

            // activeTemp[i]=this.state.activeArray[i];
            // neightTemp[i]=this.state.neighbours[i];


            for(let j=0;j<this.state.cellsX;j++){
                // console.log(j);
                if(this.state.activeArray[i]){
                    // console.log(">>>>.. i "+i);
                    // console.log("j "+j);
                    // console.log(this.state.activeArray[i][j]);
                    activeTemp[i][j]=this.state.activeArray[i][j];


                    // neightTemp[i][j]=this.state.neighbours[i][j];
        
                }else{
                    // console.log("yyyyy.. i "+i);

                    activeTemp[i][j]=0;
                    // neightTemp[i][j]=0;   
                }
             
            }


        }else{
            console.log("activeArray length ! > 0 for i = "+i)

            activeTemp[i]=[];
            neightTemp[i]=[];



            for(let j=0;j<this.state.cellsX;j++){
                activeTemp[i][j]=0;
                neightTemp[i][j]=0;
    
            }

        }


     
        
        }

        this.setState({
            activeArray:activeTemp,
            neighbours:neightTemp,
            inactiveArray:activeTemp
        },()=>{
            this.fillArray(this.state.activeArray,this.state.context);
            if(randomize){
                this.randomize(this.state.activeArray);

            }

        });
        // this.state.inactiveArray=this.activeArray;

}

randomize(){
    // this.clear();
    let activeTemp=this.state.activeArray.slice();

    for(let i=0;i<this.state.cellsY;i++){
        // this.activeArray[i]=[]
        for(let j=0;j<this.state.cellsX;j++){
            // console.log(Math.round(Math.random()));
            activeTemp[i][j]=Math.round(Math.random());
        // console.log(this.activeArray[i][j]+" >>");
        }
        
        }
        this.setState({
            activeArray:activeTemp,
            inactiveArray:activeTemp,
            generations:0
        },()=>{
            this.fillArray(this.state.activeArray,this.state.context);

        })
// this.state.inactiveArray=this.state.activeArray;

console.log("Randomized");
}

fillArray(activeArray,context){
    for(let i=0;i<this.state.cellsY;i++){
        // this.activeArray[i]=[]
        for(let j=0;j<this.state.cellsX;j++){
            // console.log(Math.round(Math.random()));
        // this.activeArray[i][j]=Math.round(Math.random());
        // console.log(this.activeArray[i][j]+"  ???");
        if(activeArray[i][j]===1){
            // console.log("Hello");
context.fillStyle=this.state.colorfilled;
context.strokeStyle="black";
context.fillRect(j*this.state.cellSize,i*this.state.cellSize,this.state.cellSize-1,this.state.cellSize-1);
context.strokeRect(j*this.state.cellSize,i*this.state.cellSize,this.state.cellSize,this.state.cellSize);

        }else{
        context.fillStyle=this.state.colorUnfilled;
        context.strokeStyle="black";

        context.fillRect(j*this.state.cellSize,i*this.state.cellSize,this.state.cellSize-1,this.state.cellSize-1);
        context.strokeRect(j*this.state.cellSize,i*this.state.cellSize,this.state.cellSize,this.state.cellSize);

            // console.log("Not Hello");

        }
        }
        
        }
}

update(){
clearInterval(this.state.timer);

this.setState({
    timer:setInterval(() => {
        
        this.countNeighbours();
let inactiveTemp=this.state.inactiveArray.slice();



let flag=false;
        for(let i=0;i<this.state.cellsY;i++){
            for(let j=0;j<this.state.cellsX;j++){
                let state=this.checkRules(i,j);
if(this.state.activeArray[i][j]!=state){
flag=true;
}
                inactiveTemp[i][j]=state;

    
            }
        }

        if(flag){
            // console.log("It changed");
            let tempState=this.state.generations;
        this.setState({
            inactiveArray:inactiveTemp,
            activeArray:inactiveTemp,
            generations:++tempState
        },()=>{
            this.fillArray(this.state.activeArray,this.state.context); 
            // this.state.generations++;

        })
        }else{
            // console.log("Now its not");
            clearInterval(this.state.timer);

        }
        
        // this.state.activeArray=this.state.inactiveArray;
        //  this.fillArray(this.state.activeArray,this.state.context); 
// this.state.generations++;
        //  this.setState({
        //      generations:++this.state.generations
        //  })
    }, 300)
})

  /*  this.state.timer=setInterval(() => {
        this.countNeighbours();

        for(let i=0;i<this.state.cellsY;i++){
            for(let j=0;j<this.state.cellsX;j++){
                let state=this.checkRules(i,j);
                 this.state.inactiveArray[i][j]=state;
    
            }
        }
        this.state.activeArray=this.state.inactiveArray;
         this.fillArray(this.state.activeArray,this.state.context); 
this.state.generations++;
        //  this.setState({
        //      generations:++this.state.generations
        //  })
    }, 300);*/
    
}

checkRules(i,j){
    // console.log("Check Rules");
let countOfNeighbours=this.state.neighbours[i][j];
if(this.state.activeArray[i][j]===1){
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
    let neightTemp=this.state.neighbours.slice();
    
for(let i=0;i<this.state.cellsY;i++){
    for(let j=0;j<this.state.cellsX;j++){
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
            topLeft=this.state.activeArray[i-1][j-1];
        }
        
        if(i>0&&j<this.state.cellsX-1){
            topRight=this.state.activeArray[i-1][j+1];
        }
        
        if(i<this.state.cellsY-1&&j>0){
        bottomLeft=this.state.activeArray[i+1][j-1];
        }
        
        if(i<this.state.cellsY-1&&j<this.state.cellsX-1){
            bottomRight=this.state.activeArray[i+1][j+1];
        }
            if(i>0){
                top=this.state.activeArray[i-1][j];
        
            }
            if(i<this.state.cellsY-1){
                 bottom=this.state.activeArray[i+1][j];;
            }
            if(j>0){
                left=this.state.activeArray[i][j-1];;
        
            }
        
            if(j<this.state.cellsX-1){
                 right=this.state.activeArray[i][j+1];
        
            }
        // console.log("Top  "+top+"  Right "+right+" Botttom  "+bottom+" Left  "+left+"  Bottom Left "+bottomLeft+" BottomRight  "+bottomRight+" TopLeft "+topLeft+" TopRight"+topRight);
        count=top+bottom+left+right+topLeft+topRight+bottomLeft+bottomRight;
            // console.log(count);
        // if(count===3){
        //     console.log("*************");
        // }
       
        // this.state.neighbours[i][j]=count;
        neightTemp[i][j]=count;

    }
}

this.setState({
    neighbours:neightTemp
})




}
componentDidMount(){
//  this.state.canvas=this.state.canvasRef.current;
//  this.state.context=this.state.canvas.getContext('2d');
// this.state.cellsX=this.state.context.canvas.width/this.state.cellSize;
// this.state.cellsY=this.state.context.canvas.height/this.state.cellSize;
// this.state.left=this.state.context.canvas.getBoundingClientRect().left;
// this.state.top=this.state.context.canvas.getBoundingClientRect().top;
// this.canvasRef=this.canvasRef.current;'

window.addEventListener("resize",this.updateDimensions);
this.setState({
    canvas:this.canvasRef.current,
    context:this.canvasRef.current.getContext('2d'),
    cellsX:this.canvasRef.current.width/this.state.cellSize,
cellsY:this.canvasRef.current.height/this.state.cellSize,
left:this.canvasRef.current.getBoundingClientRect().left,
top:this.canvasRef.current.getBoundingClientRect().top
},()=>{
    this.initialize(true);

})
console.log(this.canvasRef.current.width);
console.log(window.innerWidth);
console.log(this.canvasRef.current.height);
console.log(window.innerHeight);
console.log(this.canvasRef.current.getBoundingClientRect().left);
console.log(this.canvasRef.current.getBoundingClientRect().right);

// console.log(context.canvas.height);
console.log("CellsX "+this.cellsX);
console.log("CellsY "+this.cellsY);
// const activeArray=[];




// setTimeout(()=>{
// console.log("Time out");
// },500);

    // this.fillArray(this.activeArray,this.context);

// setInterval(() => {

    

    
// }, 500);
  
    






// context.fillRect(i*this.cellSize,0,this.cellSize,this.cellSize);


// context.fillRect(0,0,context.canvas.width,context.canvas.height);

}

componentWillUnmount(){
    window.removeEventListener("resize",this.updateDimensions);
}


clear(){
   
    clearInterval(this.state.timer);
    // let activeTemp=this.state.activeArray.slice();
    // let neightTemp=this.state.neighbours.slice();
    let activeTemp=[];
    let neightTemp=[];
    for(let i=0;i<this.state.cellsY;i++){

       

        // this.state.activeArray[i]=[];
        // this.state.neighbours[i]=[];
        activeTemp[i]=[];
        neightTemp[i]=[];


        for(let j=0;j<this.state.cellsX;j++){
            activeTemp[i][j]=0;
            neightTemp[i][j]=0;

        }
        
        }

        this.setState({
            activeArray:activeTemp,
            neighbours:neightTemp,
            inactiveArray:activeTemp,
            generations:0
        },()=>{
            this.fillArray(this.state.activeArray,this.state.context);
    //  this.randomize(this.state.activeArray);

        });
        // this.state.inactiveArray=this.activeArray;

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
let i=(event.clientX-this.state.canvas.getBoundingClientRect().left)-(event.clientX-this.state.canvas.getBoundingClientRect().left)%this.state.cellSize;
let j=event.clientY-this.state.canvas.getBoundingClientRect().top-(event.clientY-this.state.canvas.getBoundingClientRect().top)%this.state.cellSize;;
// let x=this.context.canvas.getBoundingClientRect().left;
// console.log(i+"  "+j);
// console.log(this.activeArray[j/5][i/5]);
// console.log(i/5+"  "+j/5);
let activeTemp=this.state.activeArray.slice();
activeTemp[j/this.state.cellSize][i/this.state.cellSize]=1;
let tempContext=this.state.context;
tempContext.fillStyle=this.state.colorfilled;
tempContext.fillRect(i+1,j,this.state.cellSize-2,this.state.cellSize-1);
tempContext.strokeStyle="black";
tempContext.strokeRect(j*this.state.cellSize,i*this.state.cellSize,this.state.cellSize,this.state.cellSize);


this.setState({
    activeArray:activeTemp,
    context:tempContext
})
//  this.state.activeArray[j/this.state.cellSize][i/this.state.cellSize]=1;
// this.state.context.fillStyle="#32CD32";
// console.log((event.clientX-x));
// this.state.context.fillRect(i,j,this.state.cellSize-1,this.state.cellSize-1);
// this.context.strokeStyle="blue";

// this.context.strokeRect(j*this.cellSize,i*this.cellSize,this.cellSize,this.cellSize);

// console.log(event.clientY);

}

savePattern(name){
//      let copy=[];
//      copy=this.state.activeArray.slice();
//    let ptrn=this.state.patterns.slice();
//    ptrn.push(copy);

    // let copy=[this.state.activeArray,...this.state.patterns];
    // copy=this.state.patterns;
    // copy.push(this.state.activeArray);
    // console.log(copy);

    let obj=JSON.parse(JSON.stringify(this.state.activeArray));

let old=this.state.patterns;
// old=JSON.parse(JSON.stringify(this.state.patterns));

console.log(obj);

// console.log(old);
let newObj={
    name:name,
    data:obj
}
old.push(newObj);
console.log(old);


this.setState({
patterns:old,
},()=>{
    console.log("Length of array  "+this.state.patterns.length);
    console.log(this.state.patterns);
})
console.log("In Pattern Save");
}

patternSet(index){  
    console.log('in pattern set');
console.log(index);
console.log(this.state.patterns.slice());
/// this.clear();
this.setState({
    activeArray:this.state.patterns[index].data,
    inactiveArray:this.state.patterns[index].data
},()=>{

// this.fillArray(this.state.activeArray,this.state.context);
// this.countNeighbours();
// this.updateDimensions();
//this below state stattement is causing issue
// this.fillArray(this.state.activeArray,this.state.context);
// this.initialize(false);
this.fillArray(this.state.activeArray,this.state.context);
console.log("Pattern Set");

})


}

handleSubmit(event){
    
event.preventDefault();
    // console.log(event.target.patternName.value);
    let name=event.target.patternName.value;
    this.savePattern(name);



}

render(){
    // let width=(window.innerWidth/2)%25<25 ? (window.innerWidth/2)-(window.innerWidth/2)%25 : (window.innerWidth/2)+(100-(window.innerWidth/2)%25);
    // let height=(window.innerHeight/2)%25<25 ? (window.innerHeight/2)-(window.innerHeight/2)%25 : (window.innerHeight/2)+(100-(window.innerHeight/2)%25);

    return (
        <div id="canvasHold" >
 <canvas width={this.state.width} height={this.state.height} id="canvas" ref={this.canvasRef} onClick={this.handleClick} ></canvas>
<button onClick={this.randomize}>Randomize</button>
<div id="displayBox">
    <h4>Generations</h4>
    <h4>{this.state.generations}</h4>
</div>
<button onClick={this.update}>Start</button>
<button onClick={this.stop}>Stop</button>
<button onClick={this.clear}>Clear</button>  
<form onSubmit={this.handleSubmit}>
    <input name="patternName" id="patternNameID" placeholder="Enter Name for pattern"/>
    <button  type="submit">Save Pattern</button>


</form>

<div id="patterns">
<h4>Patterns</h4>
<ul>
    {this.state.patterns.map((data,index)=>{
        // console.log(data);
return <li key={index} onClick={()=>this.patternSet(index)}>
Pattern {
data.name ? data.name : index
} 
</li>
    })}
</ul>

</div>

 
        </div>
       

    )
}

}





export default Canvas;