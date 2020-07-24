import { getNextLimit, shouldShowThatsAllMessage } from './limits';

describe('SecureMessageList > limits, messagelimits tests', () => {
  describe('getNextLimit', () => {
    it('current limit is 0, but there are more messages', () => {
      const nextLimit = getNextLimit({
        currentLimit: 0,
        messageCount: 10,
      });
      expect(nextLimit).toBe(20);
    });

    it('current limit is 20, but there are more messages', () => {
      const nextLimit = getNextLimit({
        currentLimit: 20,
        messageCount: 21,
      });
      expect(nextLimit).toBe(150);
    });

    it('current limit is 500, but there are more messages', () => {
      const nextLimit = getNextLimit({
        currentLimit: 500,
        messageCount: 510,
      });
      expect(nextLimit).toBe(510);
    });
  });

  describe('shouldShowThatsAllMessage', () => {
    it('Messages available > current limit', () => {
      const thatsAll = shouldShowThatsAllMessage({
        currentLimit: 20,
        messageCount: 21,
      });
      expect(thatsAll).toBe(false);
    });

    it('when there are no messages', () => {
      const thatsAll = shouldShowThatsAllMessage({
        currentLimit: 20,
        messageCount: 0,
      });
      expect(thatsAll).toBe(false);
    });

    it('message count is the same as the limit', () => {
      const thatsAll = shouldShowThatsAllMessage({
        currentLimit: 20,
        messageCount: 20,
      });
      expect(thatsAll).toBe(true);
    });

    it('there are less messages available than the limit', () => {
      const thatsAll = shouldShowThatsAllMessage({
        currentLimit: 20,
        messageCount: 18,
      });
      expect(thatsAll).toBe(true);
    });
  });
});
