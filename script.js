class Stopwatch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			running: false,
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			}
		};
	}


	startAndStop() {
		if (!this.state.running) {
			this.setState({
				running: true
			})		
			this.state.watch = setInterval(() => this.step(), 10);
		} else {
			this.setState({
				running: false
			})
			clearInterval(this.state.watch);
		};
	}


	step() {
		if (!this.state.running) return;
		this.calculate();
	}

    calculate() {
    	const times = {...this.state.times}
      
        times.miliseconds += 1;
        if (times.miliseconds >= 100) {
            times.miliseconds = 0;
            times.seconds += 1;
        }
        if (times.seconds >= 60) {
            times.seconds = 0;
            times.minutes += 1;
        }
        this.setState({
            times
        })
    }

	resetTimer() {
		this.setState({
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			}
		});
	}
	

	resetList() {
		let resultsList = document.querySelector('#results');
		let resetResult = document.querySelector('#reset-list');
		resultsList.innerHTML = '';
		resetResult.textContent = '';
	}

	addScore() {
		let resetResult = document.querySelector('#reset-list');
		let resultsList = document.querySelector('#results');
		const score = document.querySelector('.stopwatch');
		const scoreText = score.innerText;
		let list = document.createElement('li');
  		list.innerHTML = scoreText;
  		resultsList.appendChild(list);
  		resetResult.textContent = 'Reset list';
	}
	  render () {
        const buttonLabel = this.state.running ? 'Pauza' : 'Start';
        return (
        	<div className='container'>
          		<div className='stoper'>
            		<div className='controls'>            
              			<a href='#' className='button' id='buttonStart' onClick={this.startAndStop.bind(this)}>{buttonLabel}</a>
              			<a href='#' className='button' id='buttonStart' onClick={this.addScore.bind(this)}>Add score</a>
              			<a href='#' className='button' id='buttonReset' onClick={this.resetTimer.bind(this)}>Reset</a>
              		</div>
              		<div className='stopwatch'>{format(this.state.times)}</div>
            	</div>
              	<ul className="list" id="results"></ul>
              	<a href='#' className='button' id='reset-list' onClick={this.resetList.bind(this)}></a>
            </div>
          );
    }
};


const pad0 = value => {
	let result = value.toString();
	if (result.length < 2) {
		result = '0' + result;
	}
	return result;
}

const format = times => `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
	

var app = React.createElement(Stopwatch);
ReactDOM.render(app, document.getElementById("app"));