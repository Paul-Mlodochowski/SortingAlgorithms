export const merge = (tab) =>{

    const mergeSort = (tab1,tab2) =>{

        let newarray = []
        let left = 0;
        let mid = 0;
        for(let i  = 0 ; i < tab2.length+tab1.length; i++){
            if(tab1.length == left)
                newarray.push(tab2[mid++])
            else if(tab2.length == mid)
                newarray.push(tab1[left++])

            else if(tab1[left] < tab2[mid])
                newarray.push(tab1[left++]);
            else if(tab1[left] >= tab2[mid])
                newarray.push(tab2[mid++]);

        }
        return newarray

    }
    if(tab.length == 1)
         return tab;
    const tabone = merge(tab.slice(0,tab.length/2));
    const tabtwo = merge(tab.slice(tab.length/2,tab.length));
    return mergeSort(tabone,tabtwo);
}
const div = document.querySelector('.newarray');
let setleft = 0; 
export  async function mergeVisalizaction  (tab,NodeColumns,NodeIndexs){
    const ChangeToColor = (Node,color) =>{ return new Promise(resolve => {
        
        Node.style.backgroundColor = color;
        setTimeout(function() {
             Node.style.backgroundColor = 'white';
            resolve('')
        }, 100);
      });
   }
   const ChangeFromToColor = (Nodes,color) =>{ return new Promise(resolve => {
    for(let i = 0; i < Nodes.length;i++)    
    Nodes[i].style.backgroundColor = color;
    setTimeout(function() {
        for(let i = 0; i < Nodes.length;i++)    
        Nodes[i].style.backgroundColor = 'white';
        resolve('')
    }, 200);
  });
}
   const addToDiv = (tab,index,color) => {
    return new Promise(resolve => {
    const height = (tab[index-1]*100)/50;
    const column = document.createElement('div');

   
    column.classList.add('column');
    column.style.left = setleft + "%";
    column.style.height = height + "%";

    setleft +=2;
    column.style.backgroundColor = color;
    setTimeout(()=>{
        column.style.backgroundColor = 'white';
        resolve();
    },100)
    div.append(column);
    });
   }
    async function mergeSort (tab1,tab2){

        let newarray = []
        let newNodes = [];
        let left = 0;
        let mid = 0;



        for(let i  = 0 ; i < tab2.length+tab1.length; i++){
            if(tab1.length == left){
                newNodes.push(NodeColumns[tab1.length+mid+NodeIndexs[0]])
                newarray.push(tab2[mid++])
                 
                 await Promise.all([ChangeToColor(NodeColumns[tab1.length+mid+NodeIndexs[0]-1],'#FF9C3D'),addToDiv(tab2,mid,'#FF9C3D')]);

                continue;
        }
            else if(tab2.length == mid){
                newNodes.push(NodeColumns[left+NodeIndexs[0]])
                newarray.push(tab1[left++])
                
                await Promise.all([ChangeToColor(NodeColumns[left+NodeIndexs[0]-1],'#FAEE68'),addToDiv(tab1,left,'#FAEE68')]);
                
                continue;
            }
            await Promise.all([ChangeToColor(NodeColumns[left+NodeIndexs[0]],'#FAEE68'),ChangeToColor(NodeColumns[tab1.length+mid+NodeIndexs[0]],'#FF9C3D')]);
             if(tab1[left] < tab2[mid]){
                newNodes.push(NodeColumns[left+NodeIndexs[0]])
                newarray.push(tab1[left++]);

       
                await Promise.all([ChangeToColor(NodeColumns[left+NodeIndexs[0]-1],'#FAEE68'),addToDiv(tab1,left,'#FAEE68')]);



                continue;
            }
            await Promise.all([ChangeToColor(NodeColumns[left+NodeIndexs[0]],'#FAEE68'),ChangeToColor(NodeColumns[tab1.length+mid+NodeIndexs[0]],'#FF9C3D')]);
             if(tab1[left] >= tab2[mid]){
                newNodes.push(NodeColumns[tab1.length+mid+NodeIndexs[0]])
                newarray.push(tab2[mid++]);


                await Promise.all([ChangeToColor(NodeColumns[tab1.length+mid+NodeIndexs[0]-1],'#FF9C3D'),addToDiv(tab2,mid,'#FF9C3D')]);

                continue;
            }

        }
        
        await Promise.all([ChangeFromToColor(newNodes,'#519998'),ChangeFromToColor(div.children,'#519998')]);
        let lefts = [];
        for(let e of  NodeIndexs)
            lefts.push(NodeColumns[e].style.left)

        for(let i = 0; i< newNodes.length;i++)
            newNodes[i].style.left = lefts[i];
        
        for(let i = 0; i < NodeIndexs.length;i++){
            for(let j = 0; j < NodeIndexs.length;j++){
                const val1 = parseInt(NodeColumns[NodeIndexs[i]].style.left.slice(0,NodeColumns[NodeIndexs[i]].style.left.length-1));
                const val2 = parseInt(NodeColumns[NodeIndexs[j]].style.left.slice(0,NodeColumns[NodeIndexs[j]].style.left.length-1));
                if(val1  < val2){
                    const tmp = NodeColumns[NodeIndexs[i]];
                    NodeColumns[NodeIndexs[i]] = NodeColumns[NodeIndexs[j]];
                    NodeColumns[NodeIndexs[j]] = tmp;
                }
    
            }
    
        }


       


        setleft = 0;
        while(div.childElementCount > 0)
       div.removeChild(div.children[0]);
    

        return newarray

    }
    
    if(tab.length == 1)
         return tab;
    const tabone = await mergeVisalizaction(tab.slice(0,tab.length/2),NodeColumns,NodeIndexs.slice(0,NodeIndexs.length/2));
    const tabtwo = await mergeVisalizaction(tab.slice(tab.length/2,tab.length),NodeColumns,NodeIndexs.slice(NodeIndexs.length/2,NodeIndexs.length));
    return await mergeSort(tabone,tabtwo);
}