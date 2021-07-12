import React from 'react';
import { Route, Switch } from 'wouter';
import { registerSW } from 'virtual:pwa-register';

// pages
import { home } from './pages/home';
import { view } from './pages/view';
import { Journal } from './pages/journal';
import { Gallary } from './pages/gallary';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function App() {
    registerSW();

    return (
        <div className="flex justify-center items-center bg-brown-light">
            <TransitionGroup>
                <CSSTransition classNames="fade" timeout={300}>
                    <Switch>
                        <Route path="/" component={home} />
                        {/* @ts-ignore */}
                        <Route path="/view/:id" component={view} />
                        <Route path="/journal" component={Journal} />
                        <Route path="/gallary" component={Gallary} />
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        </div>
    );
}

export default App;
