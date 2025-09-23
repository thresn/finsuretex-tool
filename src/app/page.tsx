"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import csvSplit from "../utils/csvSplit";
import DetailModal from "../components/DetailModal";
import exportToCSV from "../utils/exportToCsv";


export default function Page() {
    const [rows, setRows] = useState<any[]>([]);
    const [selectedRow, setSelectedRow] = useState<Record<string, string> | null>(null);//modal için

 
    function handleFile(e) {
        const file = e.target.files[0]//files arrayınden ilk seçilen file

        const reader = new FileReader();

        reader.onload=(ev)=>{//kaydet,okununca buraya dön(onload)
            const fileText=ev.target.result as string;
            const data =csvSplit(fileText);
            setRows(data);
            console.log(fileText);
        };
        
        reader.readAsText(file);
    }


      function handleSave(updatedRow: Record<string, string>) {
        
        setRows(
          rows.map(r => {
           
            if (r.id === updatedRow.id) {
              return updatedRow;   
            } else {
              return r;            
            }

          })
        );

setSelectedRow(null); // modal kapanır
        }

    
  return (

     <div className="table-wrapper">
      <input type="file" accept=".csv" onChange={handleFile} />

        <button onClick={() => exportToCSV(rows)}>
          Export CSV
        </button>


{rows.length > 0 && (

      <table className="table">
        <thead className="">
          
         <tr>
            {Object.keys(rows[0]).map((col) => (
             <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
                            
        <tbody>
         {rows.map((row) => (
             <tr key={row.id ?? JSON.stringify(row)} onClick={() => setSelectedRow(row)}>
                {Object.entries(row).map(([colKey, val]) => (
                 <td key={colKey}>{String(val)}</td>
             ))}
            </tr>
            ))}
        </tbody>



      </table>

      )}

      <DetailModal 
        open={!!selectedRow} 
        data={selectedRow} 
        onClose={() => setSelectedRow(null)} 
        onSave={handleSave}
      />

      
      
      
    </div>


  )
}