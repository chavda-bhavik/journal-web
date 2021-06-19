import React from 'react';
import { Route } from 'wouter';

// pages
import { home } from './pages/home';
import { viewJournal } from './pages/view-journal';
import { journal } from './pages/journal';

function App() {
    return (
        <>
            <Route path="/" component={home} />
            <Route path="/view/:id" component={viewJournal} />
            <Route path="/journal" component={journal} />
        </>
    );
}

export default App;
