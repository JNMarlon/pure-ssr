import React from 'react';
import { Helmet } from 'react-helmet';
import { Route, Routes } from 'react-router-dom';
import { Home } from './loadable';

//client entrypoint
export default function App() {
    return (
        <div>
            <Helmet>
                <title>title</title>
            </Helmet>
            <Routes>
                <Route path={'/'} element={<Home />} />
            </Routes>
        </div>
    );
}
