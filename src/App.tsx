import React from 'react';
import { Route } from 'wouter';
import { registerSW } from 'virtual:pwa-register';

// pages
import { home } from './pages/home';
import { view } from './pages/view';
import { Journal } from './pages/journal';

function App() {
    const updateSW = registerSW({
        onNeedRefresh() {
            console.log('onNeedRefresh');
            // show a prompt to user
        },
        onOfflineReady() {
            console.log('offline ready');
            // show a ready to work offline to user
        },
    });
    updateSW();
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
