import { useState } from 'react';

function App() {
    const [input, setInput] = useState('');
    const [isTextAreaDisabled, setIsTextAreaDisabled] = useState(false);
    const [display, setDisplay] = useState(false);
    
    const [registry, setRegistry] = useState([]);
    const [registryIndex, setRegistryIndex] = useState(0);
    // const [tags, setTags] = useState([{tag: 'tag_name', description : 'This is the description for this test tag.'}]);
    const [tags, setTags] = useState([{}]);
    const [tagsInput, setTagsInput] = useState('');
    
    const [links, setLinks] = useState([{}]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (input.trim() !== "") {
            if (input[0] === '[') {
                console.log("SOMETHING");
            }

            setRegistry([...registry, parseTextArea(input)]);
        }
        
        const temp = document.querySelector('.top .output-top');
        temp.scrollTop = temp.scrollHeight;

        let arr_tags = tagsInput.trim().split(' ');
        console.log(arr_tags);
        setTagsInput('');

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
                    <div className="output-top">
                        {registry.map((val, i) => (
                            <div className="reg" onClick={(e) => {
    
                                setRegistryIndex(i);
                                // TODO 
                            
                            }} key={i}>
                                {val}
                            </div>
                        ))}
    
                    </div>

                    <div className="tags-display">
                        {!display ? 
                            <input type="text" value={tagsInput} onChange={(e) => {
                                setTagsInput(e.target.value);
                            }}/> : 
                            <p style={{backgroundColor: 'white'}}>some text</p>
                        }
                    </div>
                </div>

                <div className="column">
                    <h2>TAGS</h2>

                    <p>REG [{registryIndex}]</p>

                    <div className="tags">
                        {/* <div>palabra</div>
                        <div>idea</div>
                        <div>razón</div>
                        <div>pensar</div>
                        <div>virtual</div>
                        <div>verdad</div> */}
                    
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
                    if (e.key === 'Enter' && !e.shiftKey) {
                        handleSubmit(e);
                    }
                    /* TODO Crear carácteres de entrada al input que desaparezcan
                        una vez han sido introducidos.
                    */
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
