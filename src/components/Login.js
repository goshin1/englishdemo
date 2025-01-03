import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useRef, useState } from 'react';
import logoExtend from '../imgs/englishnoteLogoExtend.png';
import Moon from '../imgs/Moon.png';
import Sun from '../imgs/Sun.png'
import axios from 'axios';
import "./login.css"
import eye from '../imgs/eye.png';
import eyeClose from '../imgs/eyeClose.png'

export default function Login(){
    const location = useLocation();
    const navigate = useNavigate();
    const idRef = useRef();
    const pwdRef = useRef();
    const [pwd, setPwd] = useState(true);
    const [thema, setThema] = useState(location.state === null ? true : location.state.thema);

    const login =  (event) => {
        
        navigate('/list', {
            state : {
                id : "test",
                thema : thema
            }
        });
    }

    if(thema){
        document.body.style.backgroundColor = '#ffffff';
    } else {
        document.body.style.backgroundColor = '#202020';
    }

    return <form id='loginForm'>
        
        <img id='logo' src={logoExtend} alt='logo'/>
        <input type="text" name="id" placeholder='Id' ref={ idRef }
            style={ thema ? { color : '#202020' } : { color : '#ffffff' }}/>
        <label className='pswLabel'>
            <input type="password" id="psw" name="psw" placeholder='Password' ref={ pwdRef } autoComplete="off"
                style={ thema ? { color : '#202020' } : { color : '#ffffff' }}/>
            <input type='button' className='typeBtn' onClick={(event)=>{
                if(pwd){
                    document.getElementById('psw').type = "text";
                    event.currentTarget.style.backgroundImage = `url(${eye})`;
                } else {
                    document.getElementById('psw').type = "password";
                    event.currentTarget.style.backgroundImage = `url(${eyeClose})`;
                }
                setPwd(!pwd);
            }}  style={ {backgroundColor : 'rgba(0,0,0,0)'} }/>
        </label>
        <a id='loginBtn' onClick={ event => {
            login(event);  
        }} style={ thema ? { color : '#202020' } : { color : '#ffffff' }}>로그인</a>
        <Link to="/sign" id='signBtn' style={ thema ? { color : '#202020' } : { color : '#ffffff' }}
            state={{ thema : thema }}>회원가입</Link>


        <div id='colorChange' style={thema ? {
                backgroundColor : '#ffffff'
            } : {
                backgroundColor : '#272727'
            }}>
            <div id='colorIcon' style={thema ? {
                    backgroundImage : `url(${Sun})`,
                    marginLeft : '5px'
                } : {
                    backgroundImage : `url(${Moon})`,
                    marginLeft : '75px'
                }} onClick={(event) => {
                    setThema(!thema);
                }}></div>
        </div>
    </form>
}