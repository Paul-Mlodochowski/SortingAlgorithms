import {bubbleSort,bubbleSortVisualization} from "./bubble-sort.js";
import {selectionSort,selectionSortVisualisaction} from "./selection-sort.js";
import {merge,mergeVisalizaction} from "./merge-sort.js";
import {quickSort,quickSortVisalizaction} from "./quick-sort.js";
const ul = document.querySelector('#ros');
const rand = document.querySelector('#rand');
const mal = document.querySelector('#mal');
let li = document.createElement('li');



const tabs = {
    lowToHi:[],
    random:[],
    HiToLow:[]
}; 

    


  
  const sorting = (el,tab, dir,ul) =>{
    let perStart = 0;
    let perStop = 0;
    //--
perStart  = performance.now() 
bubbleSort(tab.slice(0));
perStop = performance.now()
li.textContent=`czas wykonania Bubble sort dla ${el} elementów (${dir}) wynosi: ` + (perStop - perStart) + " milisekund"
ul.append(li); 
li = document.createElement('li');
//



//--
perStart  = performance.now()
 selectionSort(tab.slice(0));
perStop = performance.now()

li.textContent=`czas wykonania selectionSort dla ${el} elementów (${dir}) wynosi: ` + (perStop - perStart) + " milisekund"
ul.append(li);
li = document.createElement('li');
//

//--
perStart  = performance.now()
 merge(tab.slice(0));
perStop = performance.now()


li.textContent=`czas wykonania mergeSort dla ${el} elementów (${dir}) wynosi: ` + (perStop - perStart) + " milisekund"
ul.append(li);
li = document.createElement('li');
//
//--
perStart  = performance.now()
 quickSort(tab.slice(0),0,tab.length-1);
perStop = performance.now()

li.textContent=`czas wykonania quickSort dla ${el} elementów (${dir}) wynosi: ` + (perStop - perStart) + " milisekund"
ul.append(li);
li = document.createElement('li');
//
}


// --------- 100 rosnąco ---------
for(let i = 0; i < 100; i++)
    tabs.lowToHi.push(i);

   sorting(100,tabs.lowToHi,"rosnąco",ul)
    tabs.lowToHi = [];
// --------- 1000 rosnąco ---------
for(let i = 0; i < 1000; i++)
    tabs.lowToHi.push(i);

    sorting(1000,tabs.lowToHi,"rosnąco",ul)
    tabs.lowToHi = [];
// --------- 10000 rosnąco ---------
for(let i = 0; i < 10000; i++)
    tabs.lowToHi.push(i);

    sorting(10000,tabs.lowToHi,"rosnąco",ul)

//- --- -- -- - 

// --------- 100 radnom ---------
for(let i = 0; i < 100; i++)
    tabs.random.push(Math.floor(Math.random() * 100));

    sorting(100,tabs.random,"random",rand)
tabs.random = []

// --------- 1000 radnom ---------
for(let i = 0; i < 1000; i++)
    tabs.random.push(Math.floor(Math.random() * 1000));

   sorting(1000,tabs.random,"random",rand)
tabs.random = []
// --------- 10000 radnom ---------
for(let i = 0; i < 10000; i++)
tabs.random.push(Math.floor(Math.random() * 10000));

    sorting(10000,tabs.random,"random",rand)

//---- ===

// --------- 100 malejaco ---------
for(let i = 100; i >= 0; i--)
    tabs.HiToLow.push(i);

     sorting(100,tabs.HiToLow,"malejaco",mal)
    tabs.HiToLow = [];
// --------- 1000 malejaco ---------
for(let i = 1000; i >= 0; i--)
    tabs.HiToLow.push(i);

     sorting(1000,tabs.HiToLow,"malejaco",mal)
    tabs.HiToLow = [];
// --------- 10000 malejaco ---------
for(let i = 10000; i >= 0; i--)
    tabs.HiToLow.push(i);
    
    sorting(10000,tabs.HiToLow,"malejaco",mal)




// console.log(bubbleSort(tabs.random));
// console.log(selectionSort(tabs.random));
// console.log(merge(tabs.random.slice(0)));
// console.log(quickSort(tabs.random.slice(0,tabs.random.length),0,tabs.random.length-1));


//--- Wizualizacja


//--Tworzenie kolumn
let tabOfNumbers = [];
while(tabOfNumbers.length < 50){
    let ranNum = Math.floor(Math.random()*50 +1)
    while(tabOfNumbers.find((e)=>{return e === ranNum}))
        ranNum = Math.floor(Math.random()*50 +1)
    tabOfNumbers.push(ranNum);
}
//--Ustawianie kolumn

let NodeColumns = [];
let NodeColumnsQuick = [];
let NodeColumnsMerge = [];
let NodeColumnsSelection = [];
let NodeColumnsBubble = [];


let setleft = 0; 
const boxQuick = document.querySelector('.quick');
const boxMerge = document.querySelector('.merge');
const boxSelection = document.querySelector('.selection');
const boxBubble = document.querySelector('.bubble');

tabOfNumbers.forEach(e => {
    const height = (e*100)/50;
    const column = document.createElement('div');
    const column2 = document.createElement('div');
    const column3 = document.createElement('div');
    const column4 = document.createElement('div');
    NodeColumns.push(column,column2,column3,column4);

    NodeColumns.forEach(e=>{
    e.classList.add('column');
    e.style.left = setleft + "%";
    e.style.height = height + "%";
    })
    NodeColumns = []; // to reset array

    setleft +=2;
    NodeColumnsQuick.push(column);
    NodeColumnsMerge.push(column2);
    NodeColumnsSelection.push(column3);
    NodeColumnsBubble.push(column4);

    boxSelection.append(column3);
    boxBubble.append(column4);
    boxMerge.append(column2);
    boxQuick.append(column);
});


// XD([...NodeColumnsMerge])

async function visualizaction() {
    async function startEnding(NodeColumns){
        const ending=(e)=>{
            return new Promise(r=>{
                e.style.backgroundColor = "#02F771";
                e.style.borderWidth = "1px"
              setTimeout(()=>{
                  r();
              },30);
            })
        }
        for(let i = 0; i < NodeColumns.length;i++)
             await ending(NodeColumns[i])
      
      
    }

    let MergeIndexs = [];
    tabOfNumbers.forEach((e,i) => {
        MergeIndexs.push(i);
    });

    // Starty algotytmow
        mergeVisalizaction(tabOfNumbers.slice(0),NodeColumnsMerge,MergeIndexs).then(()=>{startEnding(NodeColumnsMerge)})
        quickSortVisalizaction(tabOfNumbers.slice(0),0,tabOfNumbers.length-1,NodeColumnsQuick).then(()=>{startEnding(NodeColumnsQuick)})
        selectionSortVisualisaction(tabOfNumbers.slice(0),NodeColumnsSelection).then(()=>{startEnding(NodeColumnsSelection)});
        bubbleSortVisualization(tabOfNumbers.slice(0),NodeColumnsBubble).then(()=>{startEnding(NodeColumnsBubble)});
}
visualizaction()