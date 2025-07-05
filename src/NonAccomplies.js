import React from "react";
import Object from "./ApiObject";
import { useState } from "react";
export default function NonAccomplies(){
    const[liste,setList]=useState(Object)
    setList(liste.filter(elt=>elt.completed==false))
    return(
        <div>
             <h1>Liste de taches non accomplies</h1>
             <ul>
                  {liste.map((elt)=>{return(
                      <li>{elt.title}</li>
                  )})}
             </ul>
        </div>
    )
}