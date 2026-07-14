/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './views/Home';
import Characters from './views/Characters';
import Timeline from './views/Timeline';
import Gallery from './views/Gallery';
import Lore from './views/Lore';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="characters" element={<Characters />} />
          <Route path="timeline" element={<Timeline />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="lore" element={<Lore />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

