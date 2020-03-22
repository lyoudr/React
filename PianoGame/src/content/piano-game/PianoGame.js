import React from 'react';
import '../../assets/sass/pianogame/PianoGame.scss';
import Vex from 'vexflow';
import ErrorBoundary from '../../services/errorboundary-service/ErrorBoundary';



//Each keyboard
class EachKeyBoard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            datakey: props.datakey,
            datanote: props.datanote,
            keyboardkey: props.keyboardkey,
            class: props.class,
            fired: false
        }
        //This binding is necessary to make `this` work in the callbalck;
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
    }
    handleMouseDown(datakey, event){ 
        let startTime = event.timeStamp;
        this.props.handleMouseDown(datakey, event.type, startTime);
    }
    handleMouseUp(datakey, event){
        let endTime = event.timeStamp;
        this.props.handleMouseUp(datakey, event.type, endTime);
    }
    render(){
        return (
            <div className = {this.state.class} 
                 data-key ={this.state.datakey} 
                 data-note ={this.state.datanote} 
                 onMouseDown = {this.handleMouseDown.bind(this, this.state.datakey)}
                 onMouseUp = {this.handleMouseUp.bind(this, this.state.datakey)}
            >
                <span className="hints">{this.state.keyboardkey}</span>
            </div>
        )
    }
}

//Each Audio
class Audio extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            datakey: props.datakey,
            src: props.src,
            keyboardkey: props.keyboardkey
        }
    }
    render(){
        return(
            <audio data-key={this.state.datakey} keyboardkey={this.state.keyboardkey} src={this.state.src}/>
        )
    }
}

//Rate Area 
class RateArea extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            rateValue: 60,
        }
    }
    updaterateValue(event){
        this.setState({
            rateValue: event.target.value
        })
    }
    render(){
        return(
        <header className ="col-12 col-s-12" style={{textAlign:'center'}}>
            <h1 style={{textAlign:'center'}}>Use your keyboard. Hover for hints.</h1>
            <h2>Show Piano</h2>
            <h3 id="MusicRateArea" style={{display: 'flex'}}> 
                <p style={{marginTop: '3%', fontSize: '34px'}}> Music Rate:</p> 
                <input value={this.state.rateValue} onChange={this.updaterateValue.bind(this)} type="text" placeholder="60 ~ 190"/> 
                <button className="button button5" onClick = {() => {this.props.handleMusicRate(this.state.rateValue)}}>Enter</button> 
            </h3>
        </header>
        )
    }
}

//KeyBoard
class KeyBoard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            keyboardarray : [
                {datakey: "c/4", datanote: "C", keyboardkey: "A", src: "http://carolinegabriel.com/demo/js-keyboard/sounds/040.wav", className: 'key'},
                {datakey: "c#/4", datanote: "C#", keyboardkey: "W", src: "http://carolinegabriel.com/demo/js-keyboard/sounds/041.wav", className: 'key sharp'},
                {datakey: "d/4", datanote: "D", keyboardkey: "S", src: "http://carolinegabriel.com/demo/js-keyboard/sounds/042.wav", className: 'key' },
                {datakey: "d#/4", datanote: "D#", keyboardkey: "E", src: "http://carolinegabriel.com/demo/js-keyboard/sounds/043.wav", className: 'key sharp'},
                {datakey: "e/4", datanote: "E", keyboardkey: "D", src: "http://carolinegabriel.com/demo/js-keyboard/sounds/044.wav", className: 'key'},
                {datakey: "f/4", datanote: "F", keyboardkey: "F", src: "http://carolinegabriel.com/demo/js-keyboard/sounds/045.wav", className: 'key' },
                {datakey: "f#/4", datanote: "F#", keyboardkey: "T", src: "http://carolinegabriel.com/demo/js-keyboard/sounds/046.wav", className: 'key sharp'},
                {datakey: "g/4", datanote: "G", keyboardkey: "G", src: "http://carolinegabriel.com/demo/js-keyboard/sounds/047.wav", className: 'key'},
                {datakey: "g#/4", datanote: "G#", keyboardkey: "Y", src: "http://carolinegabriel.com/demo/js-keyboard/sounds/048.wav", className: 'key sharp'},
                {datakey: "a/4", datanote: "A", keyboardkey: "H", src: "http://carolinegabriel.com/demo/js-keyboard/sounds/049.wav", className: 'key'},
                {datakey: "a#/4", datanote: "A#", keyboardkey: "U", src: "http://carolinegabriel.com/demo/js-keyboard/sounds/050.wav", className: 'key sharp'},
                {datakey: "b/4", datanote: "B", keyboardkey: "J", src: "http://carolinegabriel.com/demo/js-keyboard/sounds/051.wav", className: 'key'},
                {datakey: "c/5", datanote: "C", keyboardkey: "K", src: "http://carolinegabriel.com/demo/js-keyboard/sounds/052.wav", className: 'key'},
                {datakey: "c#/5", datanote: "C#", keyboardkey: "O", src: "http://carolinegabriel.com/demo/js-keyboard/sounds/053.wav", className: 'key sharp'},
                {datakey: "d/5", datanote: "D", keyboardkey: "L", src: "http://carolinegabriel.com/demo/js-keyboard/sounds/054.wav", className: 'key'},
                {datakey: "d#/5", datanote: "D#", keyboardkey: "P", src: "http://carolinegabriel.com/demo/js-keyboard/sounds/055.wav", className: 'key sharp'},
                {datakey: "e/5", datanote: "E", keyboardkey: ";", src: "http://carolinegabriel.com/demo/js-keyboard/sounds/056.wav", className: 'key'},
            ],
            startTime: null,
            datakey: null
        }
    }
    handleMouseDown(datakey, eventType, startTime){
        this.props.setCounter(0);
        this.setState({ startTime : startTime });
        if(eventType === 'mousedown'){
            let selectedKey = document.querySelector(`audio[data-key= "${datakey}" ]`);
            selectedKey.play();
        }
    }
    handleMouseUp(datakey, eventType, endTime){
        let EachendTime = endTime;
        let timelapse = ((EachendTime - this.state.startTime)/1000);
        if(eventType === 'mouseup'){
            this.props.printNote(timelapse, datakey);
        }
    }

    renderSquare(datakey, datanote, keyboardkey, Eachindex, className){
        return(
            <EachKeyBoard
                class = {className}
                key = {Eachindex}
                datakey = {datakey}
                datanote = {datanote}
                keyboardkey = {keyboardkey}
                handleMouseDown = {(datakey, eventType ,startTime) => { this.handleMouseDown(datakey, eventType ,startTime)}}
                handleMouseUp = {(datakey, eventType ,endTime) => { this.handleMouseUp(datakey, eventType ,endTime)}}
            />
        )
    }
    renderAudio(datakey, src, keyboardkey, Audioindex){
        return(
            <Audio
                key = {Audioindex}
                datakey = {datakey}
                keyboardkey = {keyboardkey}
                src = {src}
            />
        )
    }
    render(){
        return(
        <div id="main" className="col-12 col-s-12">
            <div className="keys">
                {this.state.keyboardarray.map((eachitem , index) => {
                    return this.renderSquare(
                        eachitem.datakey, 
                        eachitem.datanote, 
                        eachitem.keyboardkey,
                        `EachKey${index}`,
                        eachitem.className
                    );
                })}
            </div>
            <div>
                {this.state.keyboardarray.map((eachitem, index) => {
                    return this.renderAudio(
                        eachitem.datakey,
                        eachitem.src,
                        eachitem.keyboardkey,
                        `Audio${index}`,
                    )
                })}
            </div>
        </div>
        )
    }
}

//Top Area
class PianoGame extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            rate:60,
            executed: false,
            sheetnumber: 1,
            note_data: [],
            Measure: 0,
            startTime: null,
            fired: false // Just trigger one keydown event by adding fired flag:
        }
        this.keydown = this.keydown.bind(this);
        this.keyup = this.keyup.bind(this);
    }
    
    componentDidMount(){ 
        window.addEventListener('keydown', this.keydown);
        window.addEventListener('keyup', this.keyup);
    }
    keydown(event){
        if(event.keyCode == 65 || event.keyCode == 87 || event.keyCode == 83 || event.keyCode == 69 || event.keyCode == 68 || event.keyCode == 70 || event.keyCode == 84 || event.keyCode == 71 || event.keyCode == 89 || event.keyCode == 72 || event.keyCode == 85 || event.keyCode == 74 || event.keyCode == 75 || event.keyCode == 79 || event.keyCode == 76|| event.keyCode == 80 || event.keyCode == 186){
            if(!this.state.fired){
                //在第一次按壓鍵盤後，將 flag 設為 true;
                this.setState({fired: true});
                this.setCounter(0);
                this.setState({ startTime : event.timeStamp });
                let selectedKey = document.querySelector(`audio[keyboardkey= "${event.key}" ]`);
                selectedKey.play();
            }
        } else {
            return;
        }
    }
    keyup(event){
        if(event.keyCode == 65 || event.keyCode == 87 || event.keyCode == 83 || event.keyCode == 69 || event.keyCode == 68 || event.keyCode == 70 || event.keyCode == 84 || event.keyCode == 71 || event.keyCode == 89 || event.keyCode == 72 || event.keyCode == 85 || event.keyCode == 74 || event.keyCode == 75 || event.keyCode == 79 || event.keyCode == 76|| event.keyCode == 80 || event.keyCode == 186){
            let EachendTime = event.timeStamp;
            let timelapse = ((EachendTime - this.state.startTime)/1000);
            let keyboarddatakey  = document.querySelector(`audio[keyboardkey= "${event.key}" ]`).getAttribute('data-key');
            this.printNote(timelapse, keyboarddatakey);
        } else {
            return;
        }
    }
    handleMusicRate(rate){
        this.setState({rate: rate})
    }

    setCounter(timelapse){
        if (this.state.executed === true) { 
            return 
        } else if(this.state.executed === false && timelapse === 0 ){ 
            //Set Measure
            this.setState({ executed: true });
            //計算每個小節所佔的總秒數
            let Measure = ((60/this.state.rate)*4*1000)+1000;
            //當時間經過一個小節，小節數會 + 1
            let Timer = () => {
                //Create an SVG renderer and attach it to the DIV element named "sheet"
                let VF = Vex.Flow;
                let div = document.getElementById('sheet');
                let renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
                // Configure the rendering context.
                renderer.resize(500, 500);
                var context = renderer.getContext();
                context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
                // Create a stave of width 400 at position 10, 40 on the canvas.
                var stave = new VF.Stave(10, 20, 300);
                // Add a clef and time signature.
                stave.addClef("treble").addTimeSignature("4/4");
                // Connect it to the rendering context and draw!
                stave.setContext(context).draw();
                // 抓取此小節存的樂譜
                let note_data = this.state.note_data;
                var formatter = new Vex.Flow.Formatter();
                var voice = new VF.Voice({num_beats: 4,  beat_value: 4}).addTickables(note_data);
                formatter.joinVoices([voice]).formatToStave([voice], stave);
                voice.draw(context, stave);
                //Initialize this.state.note_data
                this.setState({note_data : []});
            }
            setTimeout(Timer, Measure);
        }
    }

    printNote(timelapse, datakey){
        let VF = Vex.Flow;
        //Rate 
        //設定節拍
        let beat1 = (60/this.state.rate)*4;
        let beat3 = (60/this.state.rate)*3;
        let beat2 = (60/this.state.rate)*2;
        let beat4 = (60/this.state.rate);
        let beat8 = (60/this.state.rate/2);
        let beat16 = (60/this.state.rate/4);

        //將音高和音符輸出給 note_data 儲存
        let SetNote = (datakey, duration) => {
            //1. datakey 是否含有 # 或是 b
            let accidentalvalue = datakey.match(/#/i) || datakey.match(/b/i);
            //2. duration 是否有 d
            let dvalue = duration.match(/d/i);
            if(dvalue === null){
                if(accidentalvalue){
                    if(accidentalvalue[0] === "#"){
                        this.setState(prevState => ({ 
                            note_data: [... prevState.note_data, new VF.StaveNote({clef: "treble", keys: [`${datakey}`], duration: duration})
                                .addAccidental(0, new VF.Accidental("#"))]  
                        }));
                    }else if(accidentalvalue[0] === "b"){
                        this.setState(prevState => ({ 
                            note_data: [... prevState.note_data, new VF.StaveNote({clef: "treble", keys: [`${datakey}`], duration: duration}).
                                addAccidental(0, new VF.Accidental("b"))
                            ]  
                        }));
                    }
                } else {
                    this.setState(prevState => ({ 
                        note_data: [... prevState.note_data, new VF.StaveNote({clef: "treble", keys: [`${datakey}`], duration: duration})
                        ]  
                    }));
                }
            } else if(dvalue){
            //如果是含有點的節拍，需要加上點
                if(accidentalvalue){
                    if(accidentalvalue === "#"){
                        this.setState(prevState => ({ 
                            note_data: [... prevState.note_data, new VF.StaveNote({clef: "treble", keys: [`${datakey}`], duration: duration}).
                                addAccidental(0, new VF.Accidental("#")).addDotToAll()
                            ]  
                        }));
                    }else if(accidentalvalue === "b"){
                        this.setState(prevState => ({ 
                            note_data: [... prevState.note_data, new VF.StaveNote({clef: "treble", keys: [`${datakey}`], duration: duration}).
                                addAccidental(0, new VF.Accidental("b")).addDotToAll()
                            ]  
                        }));
                    }
                } else {
                    this.setState(prevState => ({ 
                        note_data: [... prevState.note_data, new VF.StaveNote({clef: "treble", keys: [`${datakey}`], duration: duration}).
                            addDotToAll()
                        ]  
                    }));
                }
            }
        }

        //判斷音符長度
        if(timelapse === beat1 || timelapse > beat1){
            //4 拍，全音符
            SetNote(datakey, "w");
        } else if(timelapse === beat3){
            //3 拍，3分音符
            SetNote(datakey, "2d");
        }else if(timelapse === beat2){
            //2 拍，2分音符
            SetNote(datakey, "2");
        }else if(timelapse > beat4 && timelapse < beat2){
            //1 拍半，4分音符逗點
            SetNote(datakey, "4d");
        } else if(timelapse === beat4){
            //1 拍，4分音符
            SetNote(datakey, "4");
        }else if(timelapse > beat8 && timelapse < beat4){
            //3/4 拍，8分音符逗點
            SetNote(datakey, "8d");
        }else if(timelapse === beat8){
            //半拍，8分音符
            SetNote(datakey, "8");
        }else if(timelapse < beat8 && timelapse > beat16){
            //3/8 拍，16分音符逗點
            SetNote(datakey, "16d");
        }else if(timelapse === beat16){
            //1/4 拍，16 分音符
            SetNote(datakey, "16");
        }else if(timelapse < beat16){
            //1/8 拍，32 分音符
            SetNote(datakey, "32");
        }

        
    }
    componentWillUnmount(){
        console.log('destory piano');
        window.removeEventListener('keydown', this.keydown);
        window.removeEventListener('keyup', this.keyup);
    }
    render(){
        return(
            <div className="pianogame main">
                <ErrorBoundary>
                    <RateArea 
                        handleMusicRate = {(rate) => this.handleMusicRate(rate)}
                    />
                    <div className="col-12 col-s-12 nowplaying"></div>
                    <KeyBoard
                        setCounter = {(timelapse) => this.setCounter(timelapse)}
                        printNote = {(timelapse, datakey) => this.printNote(timelapse, datakey)}
                    />
                    <div id="sheet" className="col-12 col-s-12 sheet">
                        <div id="sheet1"></div>
                    </div>
                </ErrorBoundary>
            </div>
        )
    }
}

export default PianoGame