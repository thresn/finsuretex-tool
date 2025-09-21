"use client";

import React, { ChangeEvent, useState } from "react";
import csvSplit from "../utils/csvSplit";
import DetailModal from "../DetailModal";


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

    
  return (

     <div>
      <input type="file" accept=".csv" onChange={handleFile} />

{rows.length > 0 && (

      <table>
        <thead>
         <tr>
            {Object.keys(rows[0]).map((col) => (
             <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
                            
        <tbody>
            {rows.map((row, i) => (
              <tr key={i} onClick={() => setSelectedRow(row)}>
                 {Object.values(row).map((val, j) => (
                  <td key={j}>{String(val)}</td>
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
      />
      
      
    </div>


  )
}