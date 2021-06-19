import React from 'react';
import { Link, Route } from 'wouter';

// pages
import { home } from './pages/home';
import { viewJournal } from './pages/view-journal';
import { journal } from './pages/journal';

function App() {
    return (
        <>
            <div>
                <ul>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/journal">Journal</Link>
                    </li>
                    <li>
                        <Link href="/view/1">View</Link>
                    </li>
                </ul>
            </div>
            <Route path="/" component={home} />
            <Route path="/view/:id" component={viewJournal} />
            <Route path="/journal" component={journal} />
        </>
    );
}

export default App;
