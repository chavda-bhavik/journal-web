import React from 'react';
import { Route } from 'wouter';
import { registerSW } from 'virtual:pwa-register';

// pages
import { home } from './pages/home';
import { view } from './pages/view';
import { Journal } from './pages/journal';
import { Gallary } from './pages/gallary';

function App() {
    registerSW();

    return (
        <>
            <Route path="/" component={home} />
            {/* @ts-ignore */}
            <Route path="/view/:id" component={view} />
            <Route path="/journal" component={Journal} />
            <Route path="/gallary" component={Gallary} />
        </>
    );
}

export default App;
