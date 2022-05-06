import { HyperProvider } from '../provider';
test('My Greeter', async () => {
  let p = new HyperProvider('ws://192.168.4.196:6066/ws/v1/1111111');
  await p.open();
  let resp = await p.getBalance(['0xf95fec9c556906cb417663c5db8c566523fe631a']);
  console.log(resp);
});
