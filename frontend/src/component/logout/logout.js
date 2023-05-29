import React,{useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.clear();
        navigate(`/login`)
        window.reload()
    }, []);

    return (
        <div>
            Çıkış yapıldı. Tüm yerel veriler silindi.
        </div>
    );
};

export default Logout;