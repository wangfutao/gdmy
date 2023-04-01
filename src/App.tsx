import React, {Component} from 'react';
import './App.css';
import {Animate} from "@wangft/animate.js";

const texts = [
    '功德 +1',
    '财富 +1',
    '幸福感 +1',
    '幸运 +1',
    '智慧 +1',
    '爱情 +1',
    '快乐 +1',
    '健康 +1',
    '成功 +1',
    '喜悦 +1',
    '舒适 +1',
    '机会 +1',
    '开心 +1',
    '烦恼 -1',
    '痛苦 -1',
    '焦虑 -1',
    '压力 -1',
    '悲伤 -1',
    '孤独 -1',
    '恐惧 -1',
    '难过 -1',
    '懒惰 -1',
    '失败 -1',
]


export default class App extends Component<any, any> {

    eleHammer: HTMLImageElement | null = null;
    eleVoice: HTMLImageElement | null = null;
    eleText: HTMLDivElement | null = null;

    isPlaySound: boolean = true;

    timer: number = 0;

    componentDidMount() {
        let eleHammer = this.eleHammer as HTMLImageElement;
        let eleVoice = this.eleVoice as HTMLImageElement;
        let eleText = this.eleText as HTMLDivElement;


        let hammerAnimate = new Animate();
        hammerAnimate.addRule({
            easingFunction: 'custom',
            type: 'rotate',
            from: Math.PI / 9,
            to: 0,
            customEasingFunction: (x: number) => {
                if (x < 0.5) {
                    return x * 2;
                }
                return -x * 2 + 2;
            }
        });

        let textAnimate = new Animate();
        textAnimate.addRule({
            easingFunction: 'linear',
            type: 'translate',
            direction: 'y',
            from: 0,
            to: -50
        });

        let blinkVoice = () => {
            eleVoice.style.display = 'block';

            setTimeout(() => {
                eleVoice.style.display = 'none';
            }, 100)
        }

        let t1 = new Date().getTime();
        const updateTextOpacity = () => {
            let t2 = new Date().getTime();
            let progress = 0;

            if (t2 - t1 < 500) {
                progress = (t2 - t1) / 500;
            } else {
                progress = (1000 - (t2 - t1)) / 500;
            }

            eleText.style.opacity = '' + progress;

            requestAnimationFrame(updateTextOpacity);
        }

        let blinkText = () => {
            let index = Math.floor(Math.random() * texts.length);
            if (index < 0 || index >= texts.length) index = 0;
            eleText.innerText = texts[index];

            void textAnimate.run(eleText, 1000);
            t1 = new Date().getTime();
            requestAnimationFrame(updateTextOpacity);
        }

        let sound = new Audio(require('./assets/sound/wooden-fish.MP3'));
        let playSound = () => {
            if (this.isPlaySound) {
                void sound.play();
            }
        }

        let execute = () => {
            let duration = 400;

            void hammerAnimate.run(eleHammer, duration);

            setTimeout(() => {
                blinkVoice();
                blinkText();
                playSound();
            }, duration / 2);
        }

        eleHammer.style.transformOrigin = 'bottom right';

        execute();
        this.timer = setInterval(execute, 900) as unknown as number;

    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        return (
            <div className="App">
                <div className="wooden-fish">
                    <img src={require('./assets/imgs/wooden-fish.png')} alt="" onClick={()=>{
                        this.isPlaySound = !this.isPlaySound;
                    }}/>
                    <div className="hammer">
                        <img ref={ref => {
                            this.eleHammer = ref
                        }} src={require('./assets/imgs/hammer.png')} alt=""/>
                    </div>
                    <div className="voice">
                        <img ref={ref => {
                            this.eleVoice = ref
                        }} src={require('./assets/imgs/voice.png')} alt=""/>
                    </div>
                    <div ref={ref => {
                        this.eleText = ref
                    }} className={'text'}>功德+1
                    </div>
                </div>
            </div>
        );
    }
}
