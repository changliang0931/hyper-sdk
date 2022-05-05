import { HyperEvent } from '../Event';
test('My Event', () => {
  let event = new HyperEvent(
    'tx',
    'ToBob',
    (value) => {
        //这块代码不对，但不知道怎么写
      expect(value).toBe(123);
    },
    true,
  );
  event.on();
  
});
