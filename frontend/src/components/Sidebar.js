import React, { useState } from 'react';
import logo from "../pages/logo.png";
import  "./Sidebar.css";
import {           //l'importation des different icons grace a la bibliotheque react-routes/fa
    FaBars,  
    FaUserAlt,
    FaUtensils,
    FaChair,
    FaClipboardList,
    FaChartLine

} from "react-icons/fa";
import  {NavLink}  from 'react-router-dom';   //importation de navlink proveant de la bibliotheque react-routes-dom

const Sidebar = ({children}) =>{    //le composant sidebar est defini ici comme une fonction qui prend en parametre children qui fait reference au contenu a l'interier du composant
    const[isOpen,setIsOpen] = useState(false);  //utilisation de usestate pour crrer une variable isOpen et une fonction setisopen pour mettre a jour cette variable
    const toggle = () => setIsOpen(!isOpen) //la fonction toggle pour inverser la valeur de isOpen lorsqu'elle est appelee
     const menuItem = [
        {
            path: "/",               //ici on a une tableau contenant les elements du menu chaque element a un objet avec les proprite path , name , icon 
            name: "Dashboard",
            icon: <FaChartLine/>
        },
        {
            path: "/commande",
            name: "Commande",
            icon: <FaClipboardList/>
        },  
              {
            path: "/table",
            name: "Table",
            icon: <FaChair/>
        },   
        {
            path: "/employe",
            name: "Employe",
            icon: <FaUserAlt/>
        },
        {
            path: "/menu",
            name: "Menu",
            icon: <FaUtensils />
        }


    ]
       return(    //rendu du jsx
        <div className="container">
        <div style={{width: isOpen ? "180px" : "50px"}} className="sidebar">
            <div className="top_section">
                <h1 style={{display: isOpen ? "block" : "none"}} className="logo"><img className='logo' src={logo} alt="log" /> </h1>
                <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                    <FaBars  style={{marginLeft: isOpen ? "-30px" : "0px"}} onClick={toggle} />
                </div>
            </div>
        {
        menuItem.map((item, index) =>  
        (
         <NavLink to={item.path} key={index} className="link" activeclassName="active">
             <div className="icon">{item.icon}</div>
             <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
         </NavLink> 
        ))
}
     </div>

     <main>{children}</main>
    </div>
  );
};

export default Sidebar;



