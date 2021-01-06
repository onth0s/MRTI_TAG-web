import { useState } from 'react';

let counter = 0;

function App() {
    const [registry, setRegistry] = useState([]);
    const [input, setInput] = useState('');
    
    const [isTextAreaDisabled, setIsTextAreaDisabled] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (input.trim() !== "") {
            setRegistry([...registry, parseTextArea(input)]);
        }
        
        const temp = document.querySelector('.top .output');
        temp.scrollTop = temp.scrollHeight;

        setInput('');
    }
    
    const parseTextArea = (text) => {
        let arr = text.trim().split('\n');

        let arr2 = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === "") {
                arr2.push(<br/>);
            } else {
                // arr2.push(<pre key={i}>[{counter}] {arr[i]}</pre>);
                arr2.push(<pre key={i}>{arr[i]}</pre>);
            }         
        }
        counter++

        return <div className="reg" onClick={(e) => {
            console.log(e.target);
            e.target.style.backgroundColor = 'red';
        }} key={new Date().getTime().toString()}>{arr2}</div>;
    }

    return (
        <div className="container">
            <div className="top">
                <div className="overlay">
                    <p>A message that will be displayed when you fuck something up.</p>
                    <i className="fas fa-times" onClick={() => {
                        document.querySelector('.overlay').style.visibility = 'hidden';
                        setIsTextAreaDisabled(false);
                    }}></i>
                </div>

                <div className="output">
                    {registry}
                </div>

                <div className="column"></div>
            </div>

            <form onSubmit={handleSubmit}>
                <textarea name="" id="" value={input} onChange={(e) => {
                    setInput(e.target.value);
                }} onKeyPress={(e) => {
                    if (e.keyCode === 13) {
                        console.log('this is working');
                    }
                }} spellCheck="false" autoFocus disabled={isTextAreaDisabled}></textarea>

                <button onClick={(e) => {
                    handleSubmit(e);
                    document.querySelector('.container form textarea').focus();
                }}>Long Button Name</button>
            </form>
        </div>
    );
}

export default App;
