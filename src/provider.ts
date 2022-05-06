import {WebSocket}  from "ws";
let NextId = 1;
export type InflightRequest = {
  callback: (error: Error|null, result: any) => void;
  payload: string;
};

export class HyperProvider {
  ws?: WebSocket;
  url: string;
  requests: { [name: string]: InflightRequest };
  constructor(url: string) {
    this.requests = {};
    this.url = url;
  }
  open(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.ws == undefined) {
        this.ws = new WebSocket(this.url);
        this.ws.onopen = (e) => {
          console.log('open successed');
          resolve(e);
        };
        this.ws.onerror = (e) => {
          console.log('open failed');
          reject(e);
        };
        this.ws.onclose = (e) => {
          console.log('close');
        };
        this.ws.onmessage = (messageEvent) => {
          const data = messageEvent.data as string;
          const result = JSON.parse(data);
          console.log(data);
          if (result.id != null) {
            const id = String(result.id);
            const request = this.requests[id];
            delete this.requests[id];

            if (result.result !== undefined) {
              request.callback(null, result.result);
            } else {
              let error: Error | null = null;
              if (result.error) {
                error = new Error(result.error.message || 'unknown error');
              } else {
                error = new Error('unknown error');
              }
              request.callback(error, undefined);
            }
          }
        };
      }
    });
  }
  send(method: string, params?: Array<any>): Promise<any> {
    const rid = NextId++;

    return new Promise((resolve, reject) => {
      function callback(error: Error | null, result: any) {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }

      const payload = JSON.stringify({
        method: method,
        params: params,
        id: rid,
        namespace: 'global',
        jsonrpc: '2.0',
      });

      this.requests[String(rid)] = { callback, payload };

      if (this.ws) {
        this.ws.send(payload);
      }
    });
  }

  getBalance(address: string[]): Promise<any> {
    return this.send('account_getBalance', address);
  }

  async destroy(): Promise<void> {
      if(this.ws){
        // Wait until we have connected before trying to disconnect
        if (this.ws.readyState === WebSocket.CONNECTING) {
          await new Promise((resolve) => {
              if(this.ws){
                this.ws.onopen = function () {
                resolve(true);
                };

                this.ws.onerror = function () {
                resolve(false);
                };
              }
          });
        }

        // Hangup
        // See: https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent#Status_codes
        this.ws.close(1000);
      }

  }
}