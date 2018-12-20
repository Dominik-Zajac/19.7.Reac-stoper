'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
	_inherits(Stopwatch, _React$Component);

	function Stopwatch(props) {
		_classCallCheck(this, Stopwatch);

		var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, props));

		_this.state = {
			running: false,
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			}
		};
		return _this;
	}

	_createClass(Stopwatch, [{
		key: 'startAndStop',
		value: function startAndStop() {
			var _this2 = this;

			if (!this.state.running) {
				this.setState({
					running: true
				});
				this.state.watch = setInterval(function () {
					return _this2.step();
				}, 10);
			} else {
				this.setState({
					running: false
				});
				clearInterval(this.state.watch);
			};
		}
	}, {
		key: 'step',
		value: function step() {
			if (!this.state.running) return;
			this.calculate();
		}
	}, {
		key: 'calculate',
		value: function calculate() {
			var times = _extends({}, this.state.times);

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
				times: times
			});
		}
	}, {
		key: 'resetTimer',
		value: function resetTimer() {
			this.setState({
				times: {
					minutes: 0,
					seconds: 0,
					miliseconds: 0
				}
			});
		}
	}, {
		key: 'resetList',
		value: function resetList() {
			var resultsList = document.querySelector('#results');
			var resetResult = document.querySelector('#reset-list');
			resultsList.innerHTML = '';
			resetResult.textContent = '';
		}
	}, {
		key: 'addScore',
		value: function addScore() {
			var resetResult = document.querySelector('#reset-list');
			var resultsList = document.querySelector('#results');
			var score = document.querySelector('.stopwatch');
			var scoreText = score.innerText;
			var list = document.createElement('li');
			list.innerHTML = scoreText;
			resultsList.appendChild(list);
			resetResult.textContent = 'Reset list';
		}
	}, {
		key: 'render',
		value: function render() {
			var buttonLabel = this.state.running ? 'Pauza' : 'Start';
			return React.createElement(
				'div',
				{ className: 'container' },
				React.createElement(
					'div',
					{ className: 'stoper' },
					React.createElement(
						'div',
						{ className: 'controls' },
						React.createElement(
							'a',
							{ href: '#', className: 'button', id: 'buttonStart', onClick: this.startAndStop.bind(this) },
							buttonLabel
						),
						React.createElement(
							'a',
							{ href: '#', className: 'button', id: 'buttonStart', onClick: this.addScore.bind(this) },
							'Add score'
						),
						React.createElement(
							'a',
							{ href: '#', className: 'button', id: 'buttonReset', onClick: this.resetTimer.bind(this) },
							'Reset'
						)
					),
					React.createElement(
						'div',
						{ className: 'stopwatch' },
						format(this.state.times)
					)
				),
				React.createElement('ul', { className: 'list', id: 'results' }),
				React.createElement('a', { href: '#', className: 'button', id: 'reset-list', onClick: this.resetList.bind(this) })
			);
		}
	}]);

	return Stopwatch;
}(React.Component);

;

var pad0 = function pad0(value) {
	var result = value.toString();
	if (result.length < 2) {
		result = '0' + result;
	}
	return result;
};

var format = function format(times) {
	return pad0(times.minutes) + ':' + pad0(times.seconds) + ':' + pad0(Math.floor(times.miliseconds));
};

var app = React.createElement(Stopwatch);
ReactDOM.render(app, document.getElementById("app"));
