export default function csvSplit(csvString: string) {
  
  const lines=csvString.split("\n");

  const header=lines[0];
  const newHeader=header.split(",");
  const values =lines.slice(1);

  const rows = [];
  const rowVal=[];

    for(let i=0;i<values.length;i++){

        rowVal[i]=values[i].split(",");
        const obj:any={};

        for(let k=0;k<newHeader.length;k++){
            obj[newHeader[k]]=rowVal[i][k];
        }

        rows.push(obj);

    }
console.log(rows);





    return rows;
}