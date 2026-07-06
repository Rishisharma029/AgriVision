import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: undefined
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in LeafSense UI:", error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-100 p-6 text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-2">Something went wrong</h2>
          <p className="text-sm text-slate-400 max-w-md mb-4">
            An unexpected error occurred in the application. Try refreshing the page.
          </p>

          {this.state.error && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 max-w-2xl w-full text-left font-mono text-xs text-red-400 mb-6 overflow-auto max-h-60">
              <div className="font-bold border-b border-slate-800 pb-2 mb-2">
                Error: {this.state.error.message}
              </div>
              <pre className="whitespace-pre-wrap">{this.state.error.stack}</pre>
            </div>
          )}

          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold transition-colors"
          >
            Reload Application
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
