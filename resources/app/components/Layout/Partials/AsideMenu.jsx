import AsideMenuItem from "@/components/Layout/Partials/AsideMenuItem";
import menus from "@/components/Layout/Partials/menus";
import {useState} from "react";

const AsideMenu = ({children}) => {
    const [active, setActive] = useState(null)
    const setActivePath = (path) => {
        !active?.startsWith(path) ? setActive(path): setActive(null)
    }
    return (
        <ul className=''>
            {
                menus.map((menu, i)=>
                    <AsideMenuItem
                        {...menu}
                        path={`${i}`}
                        active={active}
                        setActive={setActivePath}
                        key={i}
                    />)
            }
        </ul>
    )
}

export default AsideMenu