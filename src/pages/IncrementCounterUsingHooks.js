import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { decrementValue, incrementValue, resetValue } from '../actions/counterActions';
import { buttontextMapping, numPattern } from './IncrementCounter';

const IncrementCounterUsingHooks = (props) => {

    let intervalObj = null;;
    const [stateCounter, setStateCounter] = useState(0);
    const [userStateValue, setUserStateValue] = useState(0);
    const [userReduxValue, setUserReduxValue] = useState(0);


    useEffect(() => {
        enableAutoIncrement();
        return function cleanup() {
            props.resetValue();
            clearInterval(intervalObj);
        }
    }, []);

    const modifyInputValue = (event) => {
        const val = event.target.value;
        if (numPattern.test(val) || !val) {
            switch (event.target.name) {
                case 'stateCounterVal':
                    setUserStateValue(val);
                    break;

                case 'reduxCounterVal':
                    setUserReduxValue(val);
                    break;
            }
        }
    }

    const modifyCounter = (event) => {
        switch (event.target.innerText) {
            case buttontextMapping.INCREMENT_STATE_COUNTER:
                if (!numPattern.test(userStateValue)) return;
                setStateCounter(stateCounter + Number(userStateValue));
                break;
            case buttontextMapping.DECREMENT_STATE_COUNTER:
                if (!numPattern.test(userStateValue)) return;
                setStateCounter(stateCounter - Number(userStateValue));
                break;
            case buttontextMapping.INCREMENT_REDUX_COUNTER:
                if (!numPattern.test(userReduxValue)) return;
                props.incrementCounter(userReduxValue);
                break;

            case buttontextMapping.DECREMENT_REDUX_COUNTER:
                if (!numPattern.test(userReduxValue)) return;
                props.decrementCounter(userReduxValue);
                break;
        }
    }

    const enableAutoIncrement = () => {
        intervalObj = setInterval(() => {
            setStateCounter((stateCounter) => stateCounter + 1);
            props.incrementCounter(1);
        }, 5000);
    }

    return (
        <div>
            <Card>
                <CardContent>
                    <h1>State Counter</h1> : {stateCounter}
                    &nbsp;
                    <input
                        type="text"
                        name="stateCounterVal"
                        onChange={modifyInputValue}
                        value={userStateValue}
                    ></input>
                    <button onClick={modifyCounter}>{buttontextMapping.INCREMENT_STATE_COUNTER}</button>
                    <button onClick={modifyCounter}>{buttontextMapping.DECREMENT_STATE_COUNTER}</button>
                </CardContent>
                <CardContent>
                    <h1>Redux Counter</h1> : {props.reduxCounter}
                    &nbsp;
                    <input
                        type="text"
                        name="reduxCounterVal"
                        onChange={modifyInputValue} value={userReduxValue}
                    ></input>
                    <button onClick={modifyCounter}>{buttontextMapping.INCREMENT_REDUX_COUNTER}</button>
                    <button onClick={modifyCounter}>{buttontextMapping.DECREMENT_REDUX_COUNTER}</button>
                </CardContent>
            </Card>
        </div>
    );
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

IncrementCounterUsingHooks.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(IncrementCounterUsingHooks);
