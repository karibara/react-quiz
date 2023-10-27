import logoImg from '../assets/poirot-logo.png';

export default function Header() {
    return (
        <header>
        <img src={logoImg} alt="Agatha Christie Quiz logo"/>
        <h1>'Queen of Crime' QUIZ</h1>
    </header>
        ) 
}