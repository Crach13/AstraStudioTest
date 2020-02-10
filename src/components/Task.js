import React,{Component} from 'react'
import '../styles/Task.css';
import imgKings from "../img/task-kings.png";
import imgTime from "../img/task-time.png";
import imgTournaments from "../img/task-tournaments.png";

export default class Task extends Component{
    constructor(props) {
        super(props);
        this.state = {
            style:'task',
            title:'',
            imgType:''
        };
        this.btnClick = this.btnClick.bind(this);
    }
    btnClick() {
        this.setState({style:'task-hidden'});
    }
    componentDidMount() {
        let imgType = imgKings;
        let title = '';
        switch (this.props.data.type) {
            case "kings": {
                imgType = imgKings;
                title = 'Выйграть три игрый каждую менее чем за 3 минуты';
                break;
            }
            case "time": {
                imgType = imgTime;
                title = 'Выйграть пять турниров подряд';
                break;
            }
            case "tournaments": {
                imgType = imgTournaments;
                title = 'Выиграть три игры разложив всех королей';
                break;
            }
        }
        this.setState({title:title});
        this.setState({imgType:imgType});
    }

    render(){
        return (
            <div className={this.state.style}>
                <img className='task-image' src={this.state.imgType}></img>
                <div className='task-block'>
                    <p className='task-title'>{this.state.title}</p>
                    <div className="progress">
                        <div className="progress-value" style={{
                            width: this.props.data.progress + '%'
                        }}
                        ></div>
                    </div>
                </div>
                <div className='task-block-btn'>
                    <button className='btn' onClick={this.btnClick}>Поставить рубашку</button>
                </div>
            </div>
        )
    }
}


