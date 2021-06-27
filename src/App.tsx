import React from 'react';
import { Route } from 'wouter';

// pages
import { home } from './pages/home';
import { view } from './pages/view';
import { Journal } from './pages/journal';

function App() {
    return (
        <>
            <Route path="/" component={home} />
            {/* @ts-ignore */}
            <Route path="/view/:id" component={view} />
            <Route path="/journal" component={Journal} />
        </>
    );
}

export default App;
