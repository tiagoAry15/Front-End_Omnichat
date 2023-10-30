import React from "react";
import MenuContent from "./MenuContent";
import { MenuProvider } from "../../contexts/MenuContext";



const Menu = props => {

    document.title = "Omnichat";


    return (
        <MenuProvider>
            <MenuContent t={props.t} />
        </MenuProvider>
    );

}

export default Menu;