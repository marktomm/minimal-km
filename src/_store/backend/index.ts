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
