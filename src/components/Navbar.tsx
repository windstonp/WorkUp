import style from '../styles/components/Navbar.module.css';
export function Navbar(){
    return(
        <nav className={style.Navbar}>
            <div>
                <img src="/icons/nav-logo.svg" alt="logo"/>
            </div>
            <div className={style.LinksContainer}>
                <a href="/Home" className={style.selected}>
                    <img src="/icons/house.svg" alt="Home"/>
                </a>
            </div>
        </nav>
    );
}