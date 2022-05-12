import { HyperEvent, HyperTxEvent } from '../Event';
import {HyperProvider} from "../provider";
import {newWalletFromMnemonic} from "../wallet";
test('My Event', () => {
    const wallet = newWalletFromMnemonic(
      'gauge hole clog property soccer idea cycle stadium utility slice hold chief',
    );
  let p = new HyperProvider('ws://192.168.4.196:6066/ws/v1/1111111',wallet);
  let event = new HyperTxEvent(
    'tx',
    'ToBob',
    (value) => {
        //这块代码不对，但不知道怎么写
      expect(value).toBe(10+10);
    },
    true,
    p
  );
  event.on(10);
  
});
