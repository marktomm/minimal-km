import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createEvent, createStore } from 'effector';
import { useStore, useGate } from 'effector-react';
import { $storeVar, $wsDateStore, ComponentLoadedGate } from '../src/_store/backend';

const App = () => {
  const updateEvent = createEvent<number>();
  const $counter = createStore(0).on(updateEvent, (state, payload) => state + payload);

  const Counter = () => {
    const count = useStore($counter);
    useGate(ComponentLoadedGate);
    const store = useStore($storeVar);
    const wsStore = useStore($wsDateStore);
    return (
      <div>
        Date: {wsStore?.date}
        PostId: {store?.postId}
        Count: {count}
        <button onClick={() => updateEvent(1)}>Increase</button>
      </div>
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <>
          <Route path="/" element={<Counter />} />
        </>
      </Routes>
    </BrowserRouter>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
