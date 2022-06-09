import React from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { decrementValue, incrementValue, resetValue } from '../actions/counterActions';

export const buttontextMapping = {
    INCREMENT_STATE_COUNTER: 'Increment State Counter',
    DECREMENT_STATE_COUNTER: 'Decrement State Counter',
    INCREMENT_REDUX_COUNTER: 'Increment Redux Counter',
    DECREMENT_REDUX_COUNTER: 'Decrement Redux Counter',
};

export const numPattern = /[0-9]/;

export class IncrementCounter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stateCounter: 0,
            userStateValue: 0,
            userReduxValue: 0
        };
        this.intervalObj = null;
    }

    componentDidMount() {
        this.enableAutoIncrement();
    }

    modifyInputValue = (event) => {
        const val = event.target.value;
        if (numPattern.test(val) || !val) {
            switch (event.target.name) {
                case 'stateCounterVal':
                    this.setState({ userStateValue: val });
                    break;

                case 'reduxCounterVal':
                    this.setState({ userReduxValue: val });
                    break;
            }
        }
    }

    modifyCounter = (event) => {
        const { userStateValue = 1, userReduxValue = 1 } = this.state;
        switch (event.target.innerText) {
            case buttontextMapping.INCREMENT_STATE_COUNTER:
                if (!numPattern.test(userStateValue)) return;
                this.setState({
                    stateCounter: this.state.stateCounter + Number(userStateValue)
                });
                break;
            case buttontextMapping.DECREMENT_STATE_COUNTER:
                if (!numPattern.test(userStateValue)) return;
                this.setState({
                    stateCounter: this.state.stateCounter - Number(userStateValue)
                });
                break;
            case buttontextMapping.INCREMENT_REDUX_COUNTER:
                if (!numPattern.test(userReduxValue)) return;
                this.props.incrementCounter(userReduxValue);
                break;

            case buttontextMapping.DECREMENT_REDUX_COUNTER:
                if (!numPattern.test(userReduxValue)) return;
                this.props.decrementCounter(userReduxValue);
                break;
        }
    }

    enableAutoIncrement = () => {
        this.intervalObj = setInterval(() => {
            this.setState({
                stateCounter: this.state.stateCounter + 1
            });
            this.props.incrementCounter(1);
        }, 5000);
    }

    componentWillUnmount() {
        this.props.resetValue();
        clearInterval(this.intervalObj)
    }

    render() {
        const { stateCounter, userStateValue, userReduxValue } = this.state;
        const { reduxCounter } = this.props;
        return (
            <div>
                <Card>
                    <CardContent>
                        <h1>State Counter</h1> : {stateCounter}
                        &nbsp;
                        <input
                            type="text"
                            name="stateCounterVal"
                            onChange={this.modifyInputValue}
                            value={userStateValue}
                        ></input>
                        <button onClick={this.modifyCounter}>{buttontextMapping.INCREMENT_STATE_COUNTER}</button>
                        <button onClick={this.modifyCounter}>{buttontextMapping.DECREMENT_STATE_COUNTER}</button>
                    </CardContent>
                    <CardContent>
                        <h1>Redux Counter</h1> : {reduxCounter}
                        &nbsp;
                        <input
                            type="text"
                            name="reduxCounterVal"
                            onChange={this.modifyInputValue} value={userReduxValue}
                        ></input>
                        <button onClick={this.modifyCounter}>{buttontextMapping.INCREMENT_REDUX_COUNTER}</button>
                        <button onClick={this.modifyCounter}>{buttontextMapping.DECREMENT_REDUX_COUNTER}</button>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        reduxCounter: state.counterReducer.counter,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        incrementCounter: (args) => dispatch(incrementValue(args)),
        decrementCounter: (args) => dispatch(decrementValue(args)),
        resetValue: (args) => dispatch(resetValue(args)),
    }
}

IncrementCounter.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(IncrementCounter);
