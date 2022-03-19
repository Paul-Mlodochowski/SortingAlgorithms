export const bubbleSort = (tab) =>{
    const newtab =  tab.slice(0,tab.length)
    for(let i = 0; i < newtab.length;i++){
        for(let j = 0; j < i;j++){
            if(newtab[i] < newtab[j]){
                const tmp = newtab[i]
                newtab[i] = newtab[j]
                newtab[j] = tmp;
            }
        }
    }
    return newtab;
}
export async function bubbleSortVisualization(tab,NodeColumns){
    const newtab =  tab.slice(0,tab.length)
    const changeColorTo = (i,NodeColumns,color,time) =>{
        return new Promise(resolve => {
            NodeColumns[i].style.backgroundColor = color;
             setTimeout(function() {
                 NodeColumns[i].style.backgroundColor = 'white';
                 resolve('')
             }, time);
           });
     }
    for(let i = 0; i < newtab.length;i++){
        for(let j = 0; j < i;j++){
            await Promise.all([changeColorTo(j,NodeColumns,'#FAEE68',80),changeColorTo(i,NodeColumns,'#02F771',80)])
            if(newtab[i] < newtab[j]){
                await Promise.all([changeColorTo(j,NodeColumns,'#519998',200),changeColorTo(i,NodeColumns,'#519998',200)])
                const tmpleft = NodeColumns[i].style.left;
                const tmpNode = NodeColumns[i];
                NodeColumns[i].style.left = NodeColumns[j].style.left;
                NodeColumns[j].style.left = tmpleft;

                NodeColumns[i] = NodeColumns[j];
                NodeColumns[j] = tmpNode;
                const tmp = newtab[i]
                newtab[i] = newtab[j]
                newtab[j] = tmp;
            }
        }
    }
    return newtab;
}