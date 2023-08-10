import logo from "../../assets/logo.png"
import sun from "../../assets/icon-sun.svg"
import moon from "../../assets/icon-moon.svg"
import profile from "../../assets/image-avatar.jpg"
import "../../sass/styles.scss"
function Header(){
    return(
        <header>
            <img src={logo} className="logo"/>
            <div className="icon-wrapper">
                <img src={moon}className="toggle"/>
                <span></span>
                <img src={profile}className="profile"/>
            </div>
        </header>
    )
}

export default Header