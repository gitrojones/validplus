import {beforeEach, describe, test} from '@jest/globals'
import {expect} from 'chai'

import { DOMMessaging } from 'src/lib/DOMMessaging'
import { VerticalPosition } from 'src/enums/Positions'

describe('DOMMessaging', () => {
  let instance: DOMMessaging;
  beforeEach(async () => {
    instance = new DOMMessaging();
    instance.$MessageAnchor = window.document.createElement('div');
  });

  describe('#GenerateMessageNode', () => {
    test('Should default to the internal $MessageAnchor node if anchor is missing', () => {
      instance.generateMessageNode();

      const anchor: HTMLElement = instance.$MessageAnchor as HTMLElement;
      expect(anchor.children.length).to.equal(1);
      expect(anchor.children[0].className).to.equal(instance.$MessageContainerClassName);
    });

    test('Should set the $MessageAnchor if an element is passed', () => {
      const anchor = window.document.createElement('div');
      const initAnchor = instance.$MessageAnchor as HTMLElement;
      instance.generateMessageNode(anchor);
      expect(anchor.children.length).to.equal(1);
      expect(initAnchor.children.length).to.equal(0);
      expect(anchor.children[0].className).to.equal(instance.$MessageContainerClassName);
    });

    test('Should append the $MessageNode to the $MessageAnchor by default', () => {
      const innerChild = window.document.createElement('div');
      const anchor = instance.$MessageAnchor as HTMLElement;
      anchor.append(innerChild);
      instance.generateMessageNode();
      expect(anchor.children.length).to.equal(2);
      expect(anchor.children[0]).to.equal(innerChild);
    });

    test('Should prepend the $MessageNode to the $MessageAnchor if set', () => {
      const innerChild = window.document.createElement('div');
      const anchor = instance.$MessageAnchor as HTMLElement;
      anchor.append(innerChild);
      instance.generateMessageNode(null, VerticalPosition.top);
      expect(anchor.children.length).to.equal(2);
      expect(anchor.children[1]).to.equal(innerChild);
    });

    test('Should throw if the position passed isnt one of VerticalPosition', () => {
      const innerChild = window.document.createElement('div');
      const anchor = instance.$MessageAnchor as HTMLElement;
      anchor.append(innerChild);
      expect(() => instance.generateMessageNode(null, 'left')).to.throw('Unknown anchor position');
    });

    test('Should throw if anchor is passed but is not an HTMLElement', () => {
      const anchor = {};
      const initAnchor = instance.$MessageAnchor as HTMLElement;
      expect(() => instance.generateMessageNode(anchor)).to.throw('MessageNode anchor must be an HTMLElement');
    });

    test('Should replace the previous $MessageNode if it exists', () => {
      instance.generateMessageNode();
      const messageNode = instance.$MessageNode;
      instance.generateMessageNode();
      expect(instance.$MessageNode).to.not.equal(messageNode);
    });
  });

  describe('#RemoveMessageNode', () => {
    test('Should remove the $MessageNode from the $MessageAnchor', () => {
      instance.generateMessageNode();
      const anchor = instance.$MessageAnchor as HTMLElement;
      expect(anchor.children.length).to.equal(1);
      instance.removeMessageNode();
      expect(anchor.children.length).to.equal(0);
    });

    test('Should throw if $MessageAnchor is unset', () => {
      instance.$MessageAnchor = null;
      expect(() => instance.removeMessageNode()).to.throw('MessageNode does not exist');
    })
  })

  describe('#AddMessage', () => {
    test('Should append a new message to the $MessageNode', () => {
      instance.generateMessageNode();
      const messageNode = instance.$MessageNode as HTMLElement;
      instance.addMessage('Hello World');
      expect(messageNode.children.length).to.equal(1);
      expect(messageNode.children[0].innerHTML).to.equal('Hello World');
    });

    test('Should throw if $MessageNode has not been initialized', () => {
      expect(() => instance.addMessage('')).to.throw('MessageNode must be an HTMLElement');
    })
  });

  describe('#AddMessages', () => {
    test('Should append multiple messages to the $MessageNode', () => {
      instance.generateMessageNode();
      const messageNode = instance.$MessageNode as HTMLElement;
      instance.addMessages(['Hello World', 'Foo bar']);
      expect(messageNode.children.length).to.equal(2);
      expect(messageNode.children[0].innerHTML).to.equal('Hello World');
      expect(messageNode.children[1].innerHTML).to.equal('Foo bar');
    });
  });

  describe('#RemoveMessage', () => {
    test('Should remove a message from the $MessageNode', () => {
      instance.generateMessageNode();
      const messageNode = instance.$MessageNode as HTMLElement;
      instance.addMessage('Hello World');
      instance.removeMessage('Hello World');
      expect(messageNode.children.length).to.equal(0);
    });

    test('Should throw if $MessageNode is not initalized', () => {
      expect(() => instance.removeMessage('')).to.throw('MessageNode must be an HTMLElement');
    });
  });

  describe('#ClearMessages', () => {
    test('Should remove all messages from the $MessageNode', () => {
      instance.generateMessageNode();
      const messageNode = instance.$MessageNode as HTMLElement;
      instance.addMessages(['Hello World', 'Foo Bar']);
      instance.clearMessages();
      expect(messageNode.children.length).to.equal(0);
    });

    test('Should throw if $MessageNode is not initalized', () => {
      expect(() => instance.clearMessages('')).to.throw('MessageNode must be an HTMLElement');
    });
  });
});
