// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {buttonChange: false, minutes: 25, seconds: 0, newMinute: 25}

  onClickStartButton = () => {
    this.setState({buttonChange: true})
    this.timerId = setInterval(this.statusChange, 1000)
  }

  statusChange = () => {
    const {newMinute, seconds} = this.state
    if (newMinute === 0 && seconds === 0) {
      clearInterval(this.timerId)
    } else {
      const second = newMinute * 60 - 1 + seconds
      const minute = Math.floor(second / 60)
      const sec = second % 60
      this.setState({seconds: sec, newMinute: minute})
    }
  }

  onClickPauseButton = () => {
    this.setState({buttonChange: false})
    clearInterval(this.timerId)
  }

  timerReset = () => {
    clearInterval(this.timerId)
    this.setState({
      buttonChange: false,
      seconds: 0,
      newMinute: 25,
      minutes: 25,
    })
  }

  onIncrement = () => {
    const {buttonChange} = this.state
    if (!buttonChange) {
      this.setState(prevState => ({
        minutes: prevState.minutes + 1,
        newMinute:
          prevState.seconds === 0
            ? prevState.newMinute + 1
            : prevState.newMinute,
      }))
    }
  }

  onDecrement = () => {
    const {buttonChange, minutes} = this.state
    if (!buttonChange) {
      if (minutes > 1) {
        this.setState(prevState => ({
          minutes: prevState.minutes - 1,
          newMinute:
            prevState.seconds === 0
              ? prevState.newMinute - 1
              : prevState.newMinute,
        }))
      }
    }
  }

  render() {
    const {buttonChange, seconds, minutes} = this.state
    let {newMinute} = this.state
    if (!buttonChange && seconds === 0) {
      newMinute = minutes
    }
    const result =
      seconds > 9 ? `${newMinute}:${seconds}` : `${newMinute}:0${seconds}`
    const status = buttonChange ? 'Running' : 'Paused'
    return (
      <div className="app-container">
        <h1 className="main-heading">Digital Timer</h1>
        <div className="sub-container">
          <div className="round-container">
            <div className="content-container">
              <h1 className="timer-text">{result}</h1>
              <p className="status">{status}</p>
            </div>
          </div>
        </div>
        <div className="side-container">
          {!buttonChange && (
            <div className="start-container">
              <button
                className="btn"
                type="button"
                onClick={this.onClickStartButton}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                  alt="play icon"
                  className="icon"
                />
                Start
              </button>
            </div>
          )}
          {buttonChange && (
            <div className="start-container">
              <button
                className="btn"
                type="button"
                onClick={this.onClickPauseButton}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                  alt="pause icon"
                  className="icon"
                />
                Pause
              </button>
            </div>
          )}

          <div className="reset-container">
            <button className="btn" type="button" onClick={this.timerReset}>
              <img
                src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                alt="reset icon"
                className="icon"
              />
              Reset
            </button>
          </div>
        </div>
        <p className="set-limit">Set Timer limit</p>
        <div className="limit-setter">
          <button
            className="set-button"
            type="button"
            onClick={this.onDecrement}
          >
            -
          </button>
          <p className="time-set">{minutes}</p>
          <button
            className="set-button"
            type="button"
            onClick={this.onIncrement}
          >
            +
          </button>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
