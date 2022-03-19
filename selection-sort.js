export const selectionSort = (tab) =>{
    const newtab =  tab.slice(0,tab.length)

    for(let i = 0; i < newtab.length;i++){
        let minIndex = i;
        
        for(let j = i; j < newtab.length;j++){
            if(newtab[minIndex] > newtab[j])
                minIndex = j
        }
        const tmp = newtab[i];
        newtab[i] = newtab[minIndex];
        newtab[minIndex] = tmp;
    }
    return newtab;
}
export async function selectionSortVisualisaction(tab,NodeColumns){
    const newtab =  tab.slice(0,tab.length)
    const changeColorTo = (i,NodeColumns,color,time) =>{
        return new Promise(resolve => {
            NodeColumns[i].style.backgroundColor = color;
             setTimeout(function() {
                 resolve('')
             }, time);
           });
     }
    for(let i = 0; i < newtab.length;i++){
        let minIndex = i;
        await changeColorTo(i,NodeColumns,'#02F771',100)
        for(let j = i+1; j < newtab.length;j++){
            await changeColorTo(j,NodeColumns,'#FAEE68',100)
            if(newtab[minIndex] > newtab[j]){
                NodeColumns[minIndex].style.backgroundColor = 'white';
                await changeColorTo(j,NodeColumns,'#02F771',100)
                minIndex = j;
                continue;
                
            }
        NodeColumns[j].style.backgroundColor = 'white';
        }

        await Promise.all([changeColorTo(minIndex,NodeColumns,'#519998',250),changeColorTo(i,NodeColumns,'#519998',250)]);
        NodeColumns[minIndex].style.backgroundColor = 'white';
        NodeColumns[i].style.backgroundColor = 'white';


        const tmpleft = NodeColumns[i].style.left;
        const tmpNode = NodeColumns[i];
        NodeColumns[i].style.left = NodeColumns[minIndex].style.left;
        NodeColumns[minIndex].style.left = tmpleft;

        NodeColumns[i] = NodeColumns[minIndex];
        NodeColumns[minIndex] = tmpNode;


        const tmp = newtab[i];
        newtab[i] = newtab[minIndex];
        newtab[minIndex] = tmp;
    }
    return newtab;
}