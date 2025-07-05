import React ,{useState}from "react";
import {useParams } from "react-router-dom";
import Object from "./ApiObject";
export default function DetailTache(){
    // const[liste,setList]=useState(Object)
    let x=useParams()
    // let Rest=setList(liste.filter((e)=>e.id===x.num))
    let Rest=Object.find((e)=>e.id===x.num)
    return(
        <div>
            {Rest.map((elem)=>{return(
                     <div>
                        <fieldset>
                             <h1> Tache id:{elem.id}</h1>
                              <h2>{elem.title}</h2>
                             <h3> completed :
                                       {elem.completed?<input type="checkbox" checked/>:<input type="checkbox" />}
                             </h3> 
                        </fieldset>
                     </div>
            )})}
        </div>
    )
}