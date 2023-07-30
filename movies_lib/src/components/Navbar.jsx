import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { BiCameraMovie, BiSearchAlt2 } from 'react-icons/bi';
import "./Navbar.css";


const Navbar = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleSubmmit = (e)=>{
        e.preventDefault();
        if(!search) return;

        navigate(`/search?q=${search}`);
        setSearch("");
    }

    return (
        <>
            <nav id="navbar">
                <h2><Link to="/"> <BiCameraMovie /> Movie Lab</Link></h2>
                <form onSubmit={handleSubmmit}>
                    <input 
                        type="text" 
                        placeholder='Busque por um filme' 
                        onChange={(e) => setSearch(e.target.value)} 
                        value={search}
                    />
                    <button type='submit'>< BiSearchAlt2 /></button>
                </form>
            </nav>
        </>
    );
}

export default Navbar;