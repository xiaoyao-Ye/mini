import { test, expect, describe, vi } from 'vitest';
import { effect, reactive, stop } from '../src';

describe('effect', () => {
  test('effect', () => {
    const user = reactive({ age: 10 });

    let nextAge;
    effect(() => {
      nextAge = user.age + 1;
    });

    expect(nextAge).toBe(11);

    user.age++;
    expect(nextAge).toBe(12);
  });

  test('runner', () => {
    let foo = 10;
    const runner = effect(() => {
      foo++;
      return 'foo';
    });
    expect(foo).toBe(11);
    const r = runner();
    expect(foo).toBe(12);
    expect(r).toBe('foo');
  });

  test('scheduler', () => {
    // 1. 通过 effect 的第二个参数给定一个 scheduler (fn)
    // 2. effect 第一次执行的时候正常执行 fn
    // 3. 当响应式对象 set 的时候, effect 更新不是执行 fn 而是执行 scheduler
    // 4. 当执行 runner 的时候, 会再次执行 fn
    let dummy;
    let run: any;
    const scheduler = vi.fn(() => {
      run = runner;
    });
    const obj = reactive({ foo: 1 });
    const runner = effect(
      () => {
        dummy = obj.foo;
      },
      { scheduler },
    );
    expect(scheduler).not.toHaveBeenCalled();
    expect(dummy).toBe(1);
    // should be called on first trigger
    obj.foo++;
    // manually run
    run();
    // should have run
    expect(dummy).toBe(2);
  });

  test('stop', () => {
    let dummy;
    const obj = reactive({ foo: 1 });
    const runner = effect(() => {
      dummy = obj.foo;
    });
    obj.foo = 2;
    expect(dummy).toBe(2);
    stop(runner);
    obj.foo = 3;
    expect(dummy).toBe(2);

    // stopped effect should still be manually callable
    runner();
    expect(dummy).toBe(3);
  });

  test('onStop', () => {
    const obj = reactive({ foo: 1 });
    const onStop = vi.fn();
    let dummy;
    const runner = effect(
      () => {
        dummy = obj.foo;
      },
      { onStop },
    );

    stop(runner);
    expect(onStop).toBeCalledTimes(1);
  });
});