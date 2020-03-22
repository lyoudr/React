import React from 'react';

// Use "static getDerivedSTateFromError()" to render a fallback UI after an error has been thrown.
// Use "componentDidCatch()" to log error information.
// Note that error boundaries only catch errors in the component below them in the tree.
class ErrorBoundary extends React.Component {
    constructor(props){
        super(props);
        this.state = { hasError: false }
        this.logErrorToMyService.bind(this);
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info){
        //You can also log the error to an error reporting service
        this.logErrorToMyService(error, info);
    }

    logErrorToMyService(error, info){
        console.log('error is =>', error);
        console.log('info is =>', info);
    }
    render() {
        if(this.state.hasError){
            //You can render any custom fallback UI
            return <h1>Something went wrong.</h1>
        }

        return this.props.children;
    }
}

export default ErrorBoundary;