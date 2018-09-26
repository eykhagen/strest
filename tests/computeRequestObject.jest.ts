import * as fs from 'fs';
import { computeRequestObject } from '../src/test';

test('Compute Request Object should replace values', () => {
    const obj = {
        notConnected:'first value',
        connected:'connected Value(first.value)',
    };
    const responses = {first:{value:'sucess'}};
    const res = computeRequestObject(obj,responses);
    expect(obj.notConnected).toEqual('first value');
    expect(obj.connected).toEqual('connected sucess');
});

test('Compute Request Object should replace fake', () => {
    const obj = {
        notConnected:'first value',
        faked:'connected Fake(name.lastName)',
    };
    const responses = {first:{value:'sucess'}};
    const res = computeRequestObject(obj,responses);
    expect(obj.notConnected).toEqual('first value');
    expect(obj.faked).not.toContain('Fake');
    expect(obj.faked).not.toContain('string parameter is required!');
    expect(obj.faked).not.toContain('connected Fake({{name.lastName}})');
});

test('Compute Request Object should replace file', () => {
    const obj = {
        notConnected:'first value',
        fileKey:'File(tests/strest.png)',
    };
    const responses = {first:{value:'sucess'}};
    const res = computeRequestObject(obj,responses);
    expect(obj.notConnected).toEqual('first value');
    expect(obj.fileKey).toBeInstanceOf(fs.ReadStream);
});

test('Compute Request Object should replace Environment', () => {
    process.env.fromEnvironment = 'fromEnvironmentValue';
    const obj = {
        notConnected:'first value',
        fromEnvironment:'from environment Env(fromEnvironment)',
    };
    const responses = {first:{value:'sucess'}};
    const res = computeRequestObject(obj,responses);
    expect(obj.notConnected).toEqual('first value');
    expect(obj.fromEnvironment).toEqual('from environment fromEnvironmentValue');
})