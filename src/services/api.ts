import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import * as qs from 'querystring';
import * as io from 'socket.io-client'
import {baseUrl} from "../config";

function isEmptyObject(obj: object) {
  return Object.keys(obj).length === 0;
}

function parseUrl(url: string, query: object): string {
  return isEmptyObject(query) ? `${baseUrl + url}` : `${baseUrl + url}?${qs.stringify(query)}`;
}

const initialConfig: AxiosRequestConfig = {
  timeout: 1000
};

export const get = async (url: string, query: object = {}, config: AxiosRequestConfig = initialConfig): Promise<AxiosResponse> => {
  const URL = parseUrl(url, query);
  try {
    const res = await axios.get(URL, config);
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const post = async (url: string, data: object, query: object = {}, config: AxiosRequestConfig = initialConfig): Promise<AxiosResponse> => {
  const URL = parseUrl(url, query);
  try {
    return await axios.post(URL, data, config);
  } catch (e) {
    throw e;
  }
};

interface Socket {
  socket: SocketIOClient.Socket;
  namespace: string;
}

let sockets: Socket[] = [];

type Callback = (data: any, socket?: SocketIOClient.Socket) => void;

export const init = (namespace: string, option: SocketIOClient.ConnectOpts) => {
  const url = namespace.startsWith('/') ? baseUrl.slice(0, baseUrl.length - 1) + namespace : baseUrl + namespace;
  const socket: SocketIOClient.Socket = io.connect(url, option);
  sockets.push({socket, namespace});
  return socket;
};


export const listen = (namespace: string, event: string, callback: Callback) => {
  let socket: SocketIOClient.Socket;
  const exist = sockets.find(socket => socket.namespace === namespace);
  socket = exist ? exist.socket : init(namespace, {});
  socket.on(event, (data: any) => {
    callback(data, socket);
  })
};

export const send = (namespace: string, event: string, message: any) => {
  let socket: SocketIOClient.Socket;
  const exist = sockets.find(socket => socket.namespace === namespace);
  socket = exist ? exist.socket : init(namespace, {});
  socket.emit(event, message);
};
