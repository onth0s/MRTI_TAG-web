import { useState } from 'react';

let counter = 0;

function App() {
    const [input, setInput] = useState('');
    const [isTextAreaDisabled, setIsTextAreaDisabled] = useState(false);
 
    const [registry, setRegistry] = useState([]);
    const [tags, setTags] = useState([{tag: 'tag_name', description : 'This is the description for this test tag.'}]);
    const [links, setLinks] = useState([{tag: 'tag_name', description : 'This is the description for this test tag.'}]);

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
                arr2.push(<br key={i}/>);
            } else {
                arr2.push(<pre key={i}>{arr[i]}</pre>);
            }         
        }
        // console.log(Math.floor(Math.random() * 10000));
        counter++

        return (arr2);
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

                <div className="output">
                    {registry.map((val, i) => (
                        <div className="reg" onClick={(e) => {

                            
                            // TODO 
                        
                        }} key={i}>
                            {val}
                        </div>
                    ))}
                </div>

                <div className="column">
                    <h2>TAGS</h2>

                    <div className="tags">
                        {/* <div>palabra</div>
                        <div>idea</div>
                        <div>razón</div>
                        <div>pensar</div> */}
                        {tags.map((val, i) => (
                            <div key={i}>
                                {val.tag}
                            </div>
                        ))}
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
