/* tslint:disable:no-unused-expression */
// @ts-ignore
import { Validatable } from '@/Validatable'

const { describe } = require('mocha')
const { expect } = require('chai')

// @ts-ignore
export default (Messagable: Validatable) => function () {
  const ErrorMessage = 'Not Valid'

  // @ts-ignore
  let VPMessagable: Validatable
  let ArbitraryAnchor: HTMLElement
  let InnerElement: HTMLElement

  beforeEach(() => {
    VPMessagable = Messagable.clone()
    ArbitraryAnchor = document.createElement('div')
    InnerElement = VPMessagable.$MessageNode as HTMLElement
  })

  describe('DOM Assertions', function () {
    it('Should inject the Messaging Node to the anchor element on creation', function () {
      const ArbitraryAnchor = document.createElement('div')
      VPMessagable.generateMessageNode(ArbitraryAnchor)

      expect(ArbitraryAnchor.querySelector('.VPMessages')).to.be.instanceOf(HTMLElement)
    })

    it('If anchor is changed, should not mount to the root element', function () {
      const ArbitraryAnchor = document.createElement('div')
      VPMessagable.generateMessageNode(ArbitraryAnchor)

      expect(InnerElement.parentElement).to.be.null
    })

    it('If anchor is changed, should not inject a Messaging Node to the root element on validation', function () {
      const ArbitraryAnchor = document.createElement('div')
      VPMessagable.generateMessageNode(ArbitraryAnchor)
      VPMessagable.isValid()

      expect(InnerElement.parentElement).to.be.null
      expect(ArbitraryAnchor.querySelector('.VPMessages')).to.be.instanceOf(HTMLElement)
    })

    it('Should utilize the Messaging Node on validation (if errors)', function () {
      VPMessagable.$options.CustomRules.push(() => ErrorMessage)
      VPMessagable.isValid()

      expect((InnerElement.querySelector('.VPMessage') as HTMLElement).innerHTML).to.eq(ErrorMessage)
    })

    it('Should remove Messaging inner Message nodes on re-validation', function () {
      const otherErrorMessage = 'Not Valid Again!'
      let isValid: (string | boolean) = ErrorMessage
      console.log('Rules', VPMessagable.$options.CustomRules)
      VPMessagable.$options.CustomRules.push(() => isValid)
      VPMessagable.isValid()
      expect((InnerElement.querySelector('.VPMessage') as HTMLElement).innerHTML).to.eq(ErrorMessage)
      isValid = otherErrorMessage
      VPMessagable.isValid()
      expect((InnerElement.querySelector('.VPMessage') as HTMLElement).innerHTML).to.eq(otherErrorMessage)
      isValid = true
      VPMessagable.isValid()
      expect(InnerElement.querySelectorAll('.VPMessage').length).to.eq(0)
    })

    it('Should allow reassignment of the Messaging Node', function () {
      VPMessagable.generateMessageNode(ArbitraryAnchor)

      expect(InnerElement.querySelector('.VPMessages')).to.be.null
      expect(VPMessagable.$MessageAnchor === ArbitraryAnchor)
    })
  })
}
