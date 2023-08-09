import { createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { backendAPI } from '../../api/backend';
import { BackendApi } from '../../api/backend.types';

export const ComponentLoadedGate = createGate('Component Loaded Gate');

export const $storeVar = createStore<BackendApi.SimpleGetData | null>(null);

export const getAccountInfoFx = createEffect(backendAPI.simpleGet);

$storeVar.on([getAccountInfoFx.done], (_, response) => response.result.data);

sample({
  clock: ComponentLoadedGate.open,
  target: getAccountInfoFx,
});

import { BackendWS } from '../../utils/backendWS';

export const dateEv = createEvent<BackendApi.DateData>();

export const $wsDateStore = createStore<BackendApi.DateData | null>(null).on(dateEv, (_, response) => response);

export const WsConnection = createEffect(
  (): Promise<void> =>
    new Promise((res, rej) => {
      const { protocol } = window.location;
      const wsProtocol = protocol === 'https:' ? 'wss:' : 'ws:';
      const wsConnection = new BackendWS(`${wsProtocol}//localhost:18000`);

      wsConnection.onopen = () => {
        console.log('WS Connected');

        wsConnection.send('{ "topic": "date", "interval": "1" }');
        wsConnection.listenFor('date', dateEv);
        res();
      };

      wsConnection.onerror = rej;
    }),
);

export const WsDisconnect = createEffect((client: BackendWS | null) => {
  if (!client) return null;

  client.send('{ "topic": "date", "interval": "-1" }');
  console.log('Closing WS connection');
  return client.close();
});

sample({
  clock: ComponentLoadedGate.open,
  target: WsConnection,
});

sample({
  clock: ComponentLoadedGate.close,
  target: WsDisconnect,
});
