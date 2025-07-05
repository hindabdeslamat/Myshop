import React,{useState} from "react";
import Object from "./ApiObject";
export default function Exo1Ctrl(){

    const[liste,setList]=useState(Object)
    return(
        <div>
             <h1>Liste de taches</h1>
             <table border="3">
                  <tr>
                       <th>userId</th>
                       <th>id</th>
                       <th>title</th>
                       <th>completed</th>
                  </tr>
                  {liste.map((elt)=>{return(
                      <tr>
                          <td>{elt.userId}</td>
                          <td>{elt.id}</td>
                          <td>{elt.title}</td>
                          <td>{elt.completed.toString()}</td>
                      </tr>
                  )})}
             </table>
        </div>
    )
}
