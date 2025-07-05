import React,{useState} from "react";
import Object from "./ApiObject";
import { Link,Routes,Route } from "react-router-dom";
import DetailTache from "./DetailTache";
import NonAccomplies from "./NonAccomplies";
export default function Exo2Ctrl(){

    return(
        <div>
             <ul>
                  {
                    Object.map((elt)=>{return(
                        <li> <Link to={`/id/${elt.id}`}>{elt.title}</Link></li>
                    )})
                  }
             </ul>
             <Routes>
                  <Route path="/id/:num" element={<DetailTache/>} />
                  <Route path="/incompleted" element={<NonAccomplies/>} />
             </Routes>
        </div>
    )
}
