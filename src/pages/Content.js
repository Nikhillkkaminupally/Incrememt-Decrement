import React from 'react';
import IncrementCounter from './IncrementCounter';
import IncrementCounterUsingHooks from './IncrementCounterUsingHooks';

export class Content extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showClassBasedCounter: true
        }
    }

    switchCounterView = (event) => {
        this.setState({
            showClassBasedCounter: event.target.checked
        })
    }

    render() {
        const { showClassBasedCounter } = this.state;
        return (
            <div>
                <label class="switch">
                    <input type="checkbox" name="classBased" onClick={this.switchCounterView} checked={showClassBasedCounter} />
                    <span class="slider"></span>
                </label>
                {showClassBasedCounter ? 'Class Based Component' : 'Functional Based Component'}
                {showClassBasedCounter ? <IncrementCounter /> : <IncrementCounterUsingHooks />}

            </div>
        );
    }
}

Content.propTypes = {};

export default Content;
