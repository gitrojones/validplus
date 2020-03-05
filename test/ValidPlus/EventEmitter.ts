/* tslint:disable:no-unused-expression */
// @ts-ignore
import { Validatable } from '@/Validatable'

const { beforeEach } = require('mocha')
const { expect } = require('chai')
const sinon = require('sinon')

// @ts-ignore
export default (Emitter: Validatable) => function () {
  // @ts-ignore
  let VPEmitter: Validatable

  beforeEach(() => {
    VPEmitter = Emitter.clone()
  })

  it('Should be able to emit an arbitrary event', function () {
    const shouldBeCalled = sinon.fake()
    VPEmitter.addEventListener('foo', shouldBeCalled)
    VPEmitter.dispatchEvent('foo', {})

    expect(shouldBeCalled.called).to.eq(true)
  })

  it('Should pass arbitrary data on the event', function () {
    const shouldBeCalled = sinon.fake()
    const data = {
      foo: 'bar'
    }
    VPEmitter.addEventListener('foo', shouldBeCalled)
    VPEmitter.dispatchEvent('foo', data)

    expect(shouldBeCalled.getCall(0).args[1]).to.eq(data)
  })

  it('Should be able to bubble an arbitrary event from the internal element', function () {
    const shouldBeCalled = sinon.fake()
    const CaptureElement: HTMLElement = document.createElement('div')
    CaptureElement.appendChild(VPEmitter.$element)
    CaptureElement.addEventListener('foo', shouldBeCalled)
    VPEmitter.dispatchEvent('foo')

    expect(shouldBeCalled.called).to.eq(true)
  })

  it('Should be able to bubble up an arbitrary number of steps from the internal element', function () {
    const shouldBeCalled = sinon.fake()
    const CaptureElementOne: HTMLElement = document.createElement('div')
    const CaptureElementTwo: HTMLElement = document.createElement('div')
    const CaptureElementThree: HTMLElement = document.createElement('div')
    CaptureElementTwo.appendChild(CaptureElementOne)
    CaptureElementThree.appendChild(CaptureElementTwo)

    CaptureElementOne.appendChild(VPEmitter.$element)
    CaptureElementThree.addEventListener('foo', shouldBeCalled)
    VPEmitter.dispatchEvent('foo')

    expect(shouldBeCalled.called).to.eq(true)
  })

  it('Should be able to cancel the event prior to hitting an upper parent', function () {
    const shouldBeCalled = sinon.fake()
    const CaptureElementOne: HTMLElement = document.createElement('div')
    const CaptureElementTwo: HTMLElement = document.createElement('div')
    const CaptureElementThree: HTMLElement = document.createElement('div')
    CaptureElementTwo.appendChild(CaptureElementOne)
    CaptureElementThree.appendChild(CaptureElementTwo)

    CaptureElementOne.addEventListener('foo', (e: Event) => {
      e.stopPropagation()
      return true
    })
    CaptureElementOne.appendChild(VPEmitter.$element)
    CaptureElementThree.addEventListener('foo', shouldBeCalled)
    VPEmitter.dispatchEvent('foo')

    expect(shouldBeCalled.called).to.eq(false)
  })

  it('Should be able to cancel the event prior to bubbling to DOM parents', function () {
    const shouldNotBeCalled = sinon.fake()
    const CaptureElementOne: HTMLElement = document.createElement('div')
    const CaptureElementTwo: HTMLElement = document.createElement('div')
    const CaptureElementThree: HTMLElement = document.createElement('div')
    CaptureElementTwo.appendChild(CaptureElementOne)
    CaptureElementThree.appendChild(CaptureElementTwo)

    VPEmitter.addEventListener('foo', (e: Event) => {
      e.stopPropagation()
      return true
    })
    CaptureElementOne.appendChild(VPEmitter.$element)
    CaptureElementOne.addEventListener('foo', shouldNotBeCalled)
    CaptureElementTwo.addEventListener('foo', shouldNotBeCalled)
    CaptureElementThree.addEventListener('foo', shouldNotBeCalled)
    CaptureElementThree.addEventListener('foo', shouldNotBeCalled)
    VPEmitter.dispatchEvent('foo')

    expect(shouldNotBeCalled.called).to.eq(false)
  })
}
