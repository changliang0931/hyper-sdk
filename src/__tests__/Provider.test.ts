import { HyperProvider } from '../provider';
import { newWalletFromMnemonic } from '../wallet';
test('My Greeter', async () => {
  const wallet = newWalletFromMnemonic(
    'gauge hole clog property soccer idea cycle stadium utility slice hold chief',
  );
  const p = new HyperProvider('ws://192.168.4.196:6066/ws/v1/1111111',wallet);
  await p.open();
  const address = await p.getAddress();
  console.log(address);
  const resp = await p.getBalance([address]);
  console.log(resp);

  const msg = await p.buildUnsignedTx();
  const raw = await p.signTx(msg);
  console.log(raw);
  const txid = await p.broadcastTx(raw);
  p.subscribe("tx",txid,(e)=>{console.log(e);},true);
  await p.destroy();
});
