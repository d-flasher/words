import Emitter from './emitter'

class TestArgument { }

describe('Emitter', () => {
    test('test', () => {
        const emitter = new Emitter<TestArgument>()

        const fn1 = jest.fn<void, [TestArgument]>()
        emitter.add(fn1)
        expect(fn1).toBeCalledTimes(0)

        const fn2 = jest.fn<void, [TestArgument]>()
        emitter.add(fn2)
        expect(fn1).toBeCalledTimes(0)
        expect(fn2).toBeCalledTimes(0)

        const argument = new TestArgument()
        emitter.emit(argument)
        expect(fn1).toBeCalledTimes(1)
        expect(fn1).toBeCalledWith<[TestArgument]>(argument)
        expect(fn2).toBeCalledTimes(1)
        expect(fn2).toBeCalledWith<[TestArgument]>(argument)

        emitter.remove(fn1)
        expect(fn1).toBeCalledTimes(1)
        expect(fn1).toBeCalledWith<[TestArgument]>(argument)
        expect(fn2).toBeCalledTimes(1)
        expect(fn2).toBeCalledWith<[TestArgument]>(argument)

        const argument2 = new TestArgument()
        emitter.emit(argument2)
        expect(fn1).toBeCalledTimes(1)
        expect(fn2).toBeCalledTimes(2)
        expect(fn2).toBeCalledWith<[TestArgument]>(argument2)
    })
})
