import React from 'react';
import { Route } from 'wouter';

// pages
import { home } from './pages/home';
import { view } from './pages/view';
import { journal } from './pages/journal';

function App() {
    return (
        <>
            <Route path="/" component={home} />
            <Route path="/view/:id" component={view} />
            <Route path="/journal" component={journal} />
        </>
    );
}

export default App;
