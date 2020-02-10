import React, {Component} from "react";
import '../styles/App.css';
import imgKings from '../img/task-kings.png';
import imgTime from '../img/task-time.png';
import imgTournaments from '../img/task-tournaments.png';
import imgBackgroundScreen from '../img/background-screen.png';
import imgContent from '../img/background.png'
import ImgHeader from '../img/header.png';
import moment from 'moment';
import Task from './Task.js';
import axios from 'axios';
import 'bootstrap';

function Timer(props) {
    return (
        <div className='col-2 timer-times'>
            <p>{props.data.val + props.data.devider}</p>
            <p className='timer-days-label'>{props.data.label}</p>
        </div>
    )
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinnerStyle:'spinner',
            endsAt:new Date(),
            timer:{
                timer:new Date(),
                days:{val:0,label:'дней',devider:' :'},
                hours:{val:0,label:'часов',devider:':'},
                minutes:{val:0,label:'минут',devider:':'},
                seconds:{val:0,label:'сукунд',devider:''}
            },
            tasks:[{
                type:'',
                progress:0
            }]
        };
        this.getNowDate = this.getNowDate.bind(this);
        this.getRespOnServer = this.getRespOnServer.bind(this);
    }
    getNowDate(){

        if(this.state.endsAt){
            const endsAt = this.state.endsAt;

            setInterval(()=>{
                let nowDate = new Date();
                let nDaysLeft = endsAt > nowDate ? ((endsAt.getTime() - nowDate.getTime()) / (1000 * 3600 * 24)) : 0;
                let timer = {
                    timer:new Date(endsAt - nowDate),
                    days: {val:nDaysLeft.toFixed(0),label:'дней',devider:':'},
                    hours: {val:moment(endsAt.getTime() - nowDate.getTime()).format('hh'),label:'часов',devider:':'},
                    minutes: {val:moment(endsAt.getTime() - nowDate.getTime()).format('mm'),label:'минут',devider:':'},
                    seconds: {val:moment(endsAt.getTime() - nowDate.getTime()).format('ss'),label:'секунд',devider:''}
                };
                this.setState({timer:timer})
            },1000)
        }
    }
    getRespOnServer(){
        axios.get('http://sol-tst.herokuapp.com/api/v1/tasks/')
            .then(data=>{
                console.log("!!==>",new Date(data.data.endsAt));
                this.setState({endsAt:new Date(data.data.endsAt)});
                this.setState({tasks:data.data.tasks});
                this.setState({spinnerStyle:'spinner-hidden'});
                this.getNowDate();
            }).catch(e=>{
                console.log(e);
                this.setState({spinnerStyle:'spinner'});
        });

    }
    componentDidMount() {
        this.getRespOnServer();
        // this.getNowDate();

    }

    render() {
        return (
                <div className='content'>
                    <img src={imgContent} className='content-img' alt='Подложка для контента'/>
                    <div className='header'>
                        <img src={ImgHeader} className='header-img' alt='Название'/>
                    </div>
                    <div  className='timer'>
                        {/*<div className='row'>*/}
                            <Timer data={this.state.timer.days}/>
                            <Timer data={this.state.timer.hours}/>
                            <Timer data={this.state.timer.minutes}/>
                            <Timer data={this.state.timer.seconds}/>
                        {/*</div>*/}

                        <div id='spinner'>
                            <div className={this.state.spinnerStyle}></div>
                        </div>
                    </div>
                    <div className='container-tasks'>
                        {this.state.tasks.map((d,i)=>{
                            if(i<4){
                                return <Task key={i} data={d}/>
                            }
                        })}
                    </div>
                </div>

        );
    }
}

export default App;