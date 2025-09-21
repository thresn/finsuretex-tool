"use client";

import React, { ChangeEvent } from "react";

export default function Page() {
    const reader = new FileReader();


    function handleFile(e) {
        const file = e.target.files[0]//files arrayınden ilk seçilen file

        reader.onload=(ev)=>{//kaydet,okununca buraya dön(onload)
            const fileText=ev.target.result;
            console.log(fileText);
        };
        
        reader.readAsText(file);
        
        
    }

    
  return (

     <div>
      <input type="file" accept=".csv" onChange={handleFile} />

      
    </div>


  )
}