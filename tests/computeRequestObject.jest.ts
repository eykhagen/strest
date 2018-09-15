import { computeRequestObject } from '../src/test';

test('Compute Request Object', () => {
    const obj = {
        notConnected:'first value',
        connected:'connected Value(first.value)',
        faked:'connected Fake(name.lastName)',
    };
    const responses = {first:{value:'sucess'}};
    const res = computeRequestObject(obj,responses);
    expect(obj.notConnected).toEqual('first value');
    expect(obj.connected).toEqual('connected sucess');
    expect(obj.faked).not.toContain('Fake');
    expect(obj.faked).not.toContain('string parameter is required!');
    expect(obj.faked).not.toContain('connected Fake({{name.lastName}})');
});