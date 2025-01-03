import './playSet.css';
import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setWords } from '../noteSlice';
import axios from "axios";
import Moon from '../imgs/Moon.png';
import Sun from '../imgs/Sun.png'

export default function PlaySet(){
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const wordRef = useRef();
    const [limit, setLimit] = useState(3);
    const [thema, setThema] = useState(location.state.thema);
    const words = useSelector(state => {return state.note.words});

    if(words.length === 0){
        // axios.post(`${process.env.REACT_APP_ROUTER_HOST}load`, {
        //     data : {
        //         id : location.state.id,
        //         text : 'select num, word, mean from wordlist where mid = $1 order by num asc'
        //     }
        // })
        // .then((res) => {
        //     dispatch(setWords(res.data));
        // });
    }
    const randomMean = (mean) => {
        let means = [mean];
        let leng = words.length; 
        
        while(means.length < 4){
            let random = Math.floor(Math.random() * leng);
            if(!means.includes(words[random].mean)){
                means.push(words[random].mean);
            }
        }
        let temp = means[0];
        let rad = Math.floor(Math.random() * means.length);
        means[0] = means[rad];
        means[rad] = temp;
        return means;
    };

    const randomWord = (word) => {
        let ans = [word];
        let leng = words.length; 
        
        while(ans.length < 4){
            let random = Math.floor(Math.random() * leng);
            if(!words.includes(words[random].word)){
                ans.push(words[random].word);
            }
        }
        let temp = ans[0];
        let rad = Math.floor(Math.random() * ans.length);
        ans[0] = ans[rad];
        ans[rad] = temp;
        return ans;
    };

    const randomChar = (word, num) => {
        let cnt = word.length < 5 ? word.length : 5;
        let ans = [];
        let ansP = [];
        while(ans.length < cnt){
            let random = Math.floor(Math.random() * word.length);
            if(word[random] !== '_'){
                ansP.push(word.indexOf(word[random]))
                ans.push(word[random]);
                word = word.replace(word[random], '_');
            }
        }
        ansP.sort()
        return { num : num, word : word, ans : ans, ansP : ansP};
    }

    // 단어를 보고 뜻을 맞추기
    const quizSet = (target) => {
        let temp = [ ...words ];
        let res = [];
        let answers = [];
        let leng = Number(wordRef.current.value);
        for(let i = 0; i < leng; i++){
            let num = Math.floor(Math.random() * temp.length);
            answers.push(randomMean(temp[num].mean));
            res.push(temp.splice(num, 1)[0]);
        }
        navigate(target, {
            state : {
                id : location.state.id,
                count : wordRef.current.value,
                limit : limit,
                quiz : res, 
                answers : answers,
                thema : thema
            }
        })
    };

    // 뜻을 보고 단어를 맞추기
    const quizMeanSet = (target) => {
        let temp = [ ...words ];
        let res = [];
        let answers = [];
        let leng = Number(wordRef.current.value);
        for(let i = 0; i < leng; i++){
            let num = Math.floor(Math.random() * temp.length);
            answers.push(randomWord(temp[num].word));
            res.push(temp.splice(num, 1)[0]);
        }
        navigate(target, {
            state : {
                id : location.state.id,
                count : wordRef.current.value,
                limit : limit,
                quiz : res, 
                answers : answers,
                thema : thema
            }
        })
    };

    const quizSpellSet = (target) => {
        let temp = [ ...words ];
        let res = [];
        let answers = [];
        let leng = Number(wordRef.current.value);
        for(let i = 0; i < leng; i++){
            let num = Math.floor(Math.random() * temp.length);
            let word = temp.splice(num, 1)[0];
            answers.push(randomChar(word.word, word.num));
            res.push(word);
        }
        
        navigate(target, {
            state : {
                id : location.state.id,
                count : wordRef.current.value,
                limit : limit,
                quiz : res,
                answers : answers,
                thema : thema
            }
        })
    };

    // const quizWordSet = (target) => {
    //     let temp = [ ...words ];
    //     let res = [];
    //     let leng = Number(wordRef.current.value);
    //     for(let i = 0; i < leng; i++){
    //         let num = Math.floor(Math.random() * temp.length);
    //         res.push(temp.splice(num, 1)[0]);
    //     }
    //     navigate(target, {
    //         state : {
    //             id : location.state.id,
    //             count : wordRef.current.value,
    //             limit : limit,
    //             quiz : res,
    //             thema : thema
    //         }
    //     })
    // };

    if(thema){
        document.body.style.backgroundColor = '#ffffff';
        document.body.style.color = '#202020';
    } else {
        document.body.style.backgroundColor = '#202020';
        document.body.style.color = '#ffffff';
    }
    
    return <div id='playDiv'>
        <header id='setHeader'>
            단어 학습 설정
        </header>
        <label id='quizCount'>
            <span>문제 개수</span>
            <input id='quizNumber' type='text' ref={wordRef} defaultValue='1' onChange={(event) => {
                if(isNaN(event.currentTarget.value)){
                    alert('숫자를 입력해주세요.')
                    event.currentTarget.value = 1;
                }

                if(event.currentTarget.value > location.state.leng){
                    event.currentTarget.value = location.state.leng;
                }
                if(event.currentTarget.value < 1){
                    event.currentTarget.value = 1;
                }
            }} style={thema ? { color : '#202020' } : { color : '#ffffff' }}/>
        </label>
        <label id='quizLimit'>
            <span>제한 시간</span>
            <label className='radioLabel'><input type='radio' name='limit' value='3' defaultChecked onChange={()=>{setLimit(3)}}/>3초</label>
            <label className='radioLabel'><input type='radio' name='limit' value='5' onChange={()=>{setLimit(5)}}/>5초</label>
            <label className='radioLabel'><input type='radio' name='limit' value='10' onChange={()=>{setLimit(10)}}/>10초</label>
        </label>

        <div id='links'>
            <div className='playSite' onClick={()=>{quizSpellSet ('/spellFill')}}>스펠링 채우기</div>
            <div className='playSite' onClick={()=>{quizSet('/spell')}}>단어 맞추기</div>
            <div className='playSite' onClick={()=>{quizMeanSet('/mean')}}>영어단어 맞추기</div>
            <div className='playSite' onClick={()=>{quizMeanSet('/spellInsert')}}>영어 맞추기</div>
        </div>
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
    </div>
}