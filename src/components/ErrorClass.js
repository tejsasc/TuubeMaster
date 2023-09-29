import React from "react";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true, error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>{this.state.error.toString()}</p>
          {/* <p>{this.state.errorInfo.componentStack}</p> */}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
