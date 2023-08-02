import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createEvent, createStore } from 'effector';
import { useStore } from 'effector-react';

const App = () => {
  const updateEvent = createEvent<number>();
  const $counter = createStore(0).on(updateEvent, (state, payload) => state + payload);

  const Counter = () => {
    const count = useStore($counter);
    return (
      <div>
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
