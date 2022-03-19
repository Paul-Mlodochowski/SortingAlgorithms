export const quickSort = (tab,lo,hi) =>{
    const partition = (tab,lo,hi) =>{
        let i = lo;
        let j = hi+1;
        const piv = tab[lo];
        while(true){
            while(tab[++i] < piv)
                if(i == hi)
                    break;
            while(tab[--j] > piv)
                if(j == lo)
                    break;
            if(i>=j)
                break;
            const tmp = tab[i];
            tab[i] = tab[j];
            tab[j] = tmp;
        }
        const tmp = tab[lo];
        tab[lo] = tab[j];
        tab[j] = tmp;
        return j;
    }


   if(lo>=hi)
        return;
    const j = partition(tab,lo,hi);
    quickSort(tab,lo,j-1);
    quickSort(tab,j+1,hi);
    return tab;
}


 export async  function quickSortVisalizaction  (tab,lo,hi,NodeColumns){
    async function partition  (tab,lo,hi,NodeColumns){


        const changeColorTo = (i,NodeColumns,color) =>{
            return new Promise(resolve => {
                NodeColumns[i].style.backgroundColor = color;
                 setTimeout(function() {
                     resolve('')
                 }, 100);
               });
         }
         const Swap = (i,NodeColumns) =>{
            return new Promise(resolve => {
                NodeColumns[i].style.backgroundColor = '#519998';
                 setTimeout(function() {
                     resolve('')
                 }, 200);
               });
         }

        let i = lo;
        let j = hi+1;
        const piv = tab[lo];
        NodeColumns[lo].style.backgroundColor = '#9E1D17';
        while(true){

            if(tab[i+1] >= piv) //aby pokazalo że o jeden wiecej sprawdzilo
                await changeColorTo(i+1,NodeColumns,'#02F771');
                
            while(tab[++i] < piv){
               
                await changeColorTo(i,NodeColumns,'#02F771');
                NodeColumns[i].style.backgroundColor = 'white';
                
                if(i == hi)
                    break;
                if(tab[i+1] >= piv) //aby pokazalo że o jeden wiecej sprawdzilo
                await changeColorTo(i+1,NodeColumns,'#02F771');
                 
                
            }

            if(tab[j-1] <= piv){ //aby gdy pokazalo że najpierw sprawdza a pozniej zamienia
                await changeColorTo(j-1,NodeColumns,'#FAEE68');
                NodeColumns[j-1].style.backgroundColor = 'white';
                }

            while(tab[--j] > piv){ 
                await changeColorTo(j,NodeColumns,'#FAEE68');
               NodeColumns[j].style.backgroundColor = 'white';
               if(tab[j-1] <= piv){ //aby pokazalo że o jeden wiecej sprawdzilo
                await changeColorTo(j-1,NodeColumns,'#FAEE68');
                NodeColumns[j-1].style.backgroundColor = 'white';
                }
                if(j == lo)
                    break;
            }

            if(i>=j)
                break;
            

              await Promise.all([Swap(i,NodeColumns), Swap(j,NodeColumns)])
                    const tmpleft = NodeColumns[i].style.left;
                    const tmpNode = NodeColumns[i];
                    NodeColumns[i].style.left = NodeColumns[j].style.left;
                    NodeColumns[j].style.left = tmpleft;
                    NodeColumns[i] = NodeColumns[j];
                    NodeColumns[j] = tmpNode;
                    const tmp = tab[i];
                    tab[i] = tab[j];
                    tab[j] = tmp;
                  NodeColumns[j].style.backgroundColor ='white';
                  NodeColumns[i].style.backgroundColor ='white';
            
        }
        NodeColumns[i].style.backgroundColor ='white';
        await Promise.all([Swap(lo,NodeColumns), Swap(j,NodeColumns)])
        NodeColumns[j].style.backgroundColor ='white';
        NodeColumns[lo].style.backgroundColor = 'white'; // remove pivot color
        const tmpleft = NodeColumns[lo].style.left;
        const tmpNode = NodeColumns[lo];
        NodeColumns[lo].style.left = NodeColumns[j].style.left;
        NodeColumns[j].style.left = tmpleft;
        NodeColumns[lo] = NodeColumns[j];
        NodeColumns[j] = tmpNode;
        
        const tmp = tab[lo];
        tab[lo] = tab[j];
        tab[j] = tmp;
        return j;
    }


   if(lo>=hi)
        return;
    const j = await partition(tab,lo,hi,NodeColumns);
   await quickSortVisalizaction(tab,lo,j-1,NodeColumns);
   await quickSortVisalizaction(tab,j+1,hi,NodeColumns);
    return tab;
}