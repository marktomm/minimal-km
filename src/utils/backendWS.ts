import { BackendApi } from '../api/backend.types';

interface Topics {
  date: BackendApi.DateData;
}

type Handler<T = unknown> = (data: T) => void;

interface Listener<T> {
  topic: keyof Topics;
  handler: Handler<T>;
}

interface ResponseMessage<T = unknown> {
  topic: keyof Topics;
  data: T;
}

export class BackendWS extends WebSocket {
  listeners: Listener<Topics[keyof Topics]>[] = [];

  constructor(url: string, protocols?: string | string[]) {
    super(url, protocols);
    this.#init();
  }

  #init(this: BackendWS) {
    this.onmessage = (response) => {
      const data: ResponseMessage = JSON.parse(response.data);
      this.listeners.forEach(({ topic, handler }) => {
        if (topic === data.topic) {
          handler(data as any);
        }
      });
    };
  }

  listenFor<K extends keyof Topics = keyof Topics, R = Topics[K]>(this: BackendWS, topic: K, handler: Handler<R>) {
    const listener: Listener<R> = {
      topic,
      handler,
    };
    this.listeners.push(listener as any);
  }

  unSub(topic: keyof Topics) {
    this.listeners = this.listeners.filter((listener) => listener.topic !== topic);
  }
}
