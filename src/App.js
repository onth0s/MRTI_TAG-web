import { useState } from 'react';

let counter = 0;

function App() {
    const [registry, setRegistry] = useState([]);
    const [input, setInput] = useState('');
    
    const [isTextAreaDisabled, setIsTextAreaDisabled] = useState(false);

    const [tag, setTag] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (input.trim() !== "") {
            setRegistry([...registry, parseTextArea(input)]);
        }
        
        const temp = document.querySelector('.top .output');
        temp.scrollTop = temp.scrollHeight;

        console.log(registry);

        setInput('');
    }
    
    const parseTextArea = (text) => {
        let arr = text.trim().split('\n');

        let arr2 = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === "") {
                arr2.push(<br key={i}/>);
            } else {
                arr2.push(<pre key={i}>{arr[i]}</pre>);
            }         
        }
        counter++

        return (
            <div className="reg" onClick={(e) => {

                console.log(e.currentTarget.innerHTML);
            
            }} key={new Date().getTime().toString()}>
                {arr2}
            </div>
        );
    }

    return (
        <div className="container">
            <div className="top">
                <div className="overlay">
                    <p>A message that will be displayed when you fuck something up.</p>
                    <i className="fas fa-times" onClick={() => {
                        const overlay = document.querySelector('.overlay');
                        overlay.style.animation = 'fade-out 0.4s';
                        overlay.addEventListener("animationend", () => {
                            overlay.style.visibility = 'hidden';
                            overlay.style.animation = 'none';
                        });
                        setIsTextAreaDisabled(false);
                    }}></i>
                </div>

                <div className="output">{registry}</div>

                <div className="column">
                    <div className="tags">
                        <div>palabra</div>
                        <div>idea</div>
                        <div>razón</div>
                        <div>pensar</div>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <textarea name="" id="" value={input} onChange={(e) => {
                    setInput(e.target.value);
                }} onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        handleSubmit(e);
                    }
                }} spellCheck="false" autoFocus disabled={isTextAreaDisabled}></textarea>

                <button onClick={(e) => {
                    handleSubmit(e);
                    document.querySelector('.container form textarea').focus();
                }}>PUSH ↑</button>
            </form>
        </div>
    );
}

export default App;
