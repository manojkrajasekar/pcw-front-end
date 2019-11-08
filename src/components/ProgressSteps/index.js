import React from 'react';
import Steps, { Step } from 'rc-steps';
import "rc-steps/assets/index.css";
import "rc-steps/assets/iconfont.css";

class ProgressSteps extends React.Component {
    render() {
        return (
            <Steps direction="vertical" current={2} status="error">
                <Step
                title="Sign in"
                description="This is the first step on the process of whatever action you're doing."
                />
                <Step
                title="Download data"
                description="Second step on this potentially long running task... please be patient"
                />
                <Step title="Process data" description="Processing your data..." />
                <Step title="Save file" description="Saving your file" />
            </Steps>
        );
    }
}

export default ProgressSteps;