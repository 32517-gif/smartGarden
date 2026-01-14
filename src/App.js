import React from "react";

export default function App() {
  return React.createElement('div', {className: 'min-h-screen flex items-center justify-center bg-emerald-50 p-6'},
    React.createElement('div', {className: 'max-w-xl w-full bg-white shadow-md rounded-lg p-8 text-center'},
      React.createElement('h1', {className: 'text-2xl font-semibold text-emerald-800 mb-2'}, 'Smart Garden AI'),
      React.createElement('p', {className: 'text-emerald-600 mb-4'}, 'App loaded successfully.'),
      React.createElement('div', {className: 'text-sm text-slate-600'}, 'If you still see the fallback message, open the browser console to inspect errors.')
    )
  );
}
