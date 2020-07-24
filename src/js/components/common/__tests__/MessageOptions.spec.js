import getOptionDisplayFunctions from '../MessageOptions';
import { NEW, READ, PENDING, ARCHIVED, SENT, DRAFT } from '../../../constants/StringsConstants';

describe('when in readonly mode & no reply message', () => {
  const messageFunctions = getOptionDisplayFunctions(true, true);

  describe('status is New', () => {
    it('show archive returns false', () => {
      expect(messageFunctions.showArchiveButton(NEW)).toEqual(false);
    });

    it('show delete returns false', () => {
      expect(messageFunctions.showDeleteButton(NEW)).toEqual(false);
    });

    it('show pending returns false ', () => {
      expect(messageFunctions.showPending(NEW)).toEqual(false);
    });

    it('show unarchive returns false ', () => {
      expect(messageFunctions.showUnarchiveButton(NEW)).toEqual(false);
    });

    it('show reply returns false ', () => {
      expect(messageFunctions.showReplyButton(NEW)).toEqual(false);
    });
  });

  describe('status is Read', () => {
    it('show archive returns false', () => {
      expect(messageFunctions.showArchiveButton(READ)).toEqual(false);
    });

    it('show delete returns false', () => {
      expect(messageFunctions.showDeleteButton(READ)).toEqual(false);
    });

    it('show pending returns false ', () => {
      expect(messageFunctions.showPending(READ)).toEqual(false);
    });

    it('show unarchive returns false ', () => {
      expect(messageFunctions.showUnarchiveButton(READ)).toEqual(false);
    });

    it('show reply returns false ', () => {
      expect(messageFunctions.showReplyButton(READ)).toEqual(false);
    });
  });

  describe('status is Archived', () => {
    it('show archive returns false', () => {
      expect(messageFunctions.showArchiveButton(ARCHIVED)).toEqual(false);
    });

    it('show delete returns false', () => {
      expect(messageFunctions.showDeleteButton(ARCHIVED)).toEqual(false);
    });

    it('show pending returns false ', () => {
      expect(messageFunctions.showPending(ARCHIVED)).toEqual(false);
    });

    it('show unarchive returns false ', () => {
      expect(messageFunctions.showUnarchiveButton(ARCHIVED)).toEqual(false);
    });

    it('show reply returns false ', () => {
      expect(messageFunctions.showReplyButton(ARCHIVED)).toEqual(false);
    });
  });

  describe('status is pending', () => {
    it('show archive returns false', () => {
      expect(messageFunctions.showArchiveButton(PENDING)).toEqual(false);
    });

    it('show delete returns false', () => {
      expect(messageFunctions.showDeleteButton(PENDING)).toEqual(false);
    });

    it('show pending returns true ', () => {
      expect(messageFunctions.showPending(PENDING)).toEqual(true);
    });

    it('show unarchive returns false ', () => {
      expect(messageFunctions.showUnarchiveButton(PENDING)).toEqual(false);
    });

    it('show reply returns false ', () => {
      expect(messageFunctions.showReplyButton(PENDING)).toEqual(false);
    });
  });

  describe('status is sent', () => {
    it('show archive returns false', () => {
      expect(messageFunctions.showArchiveButton(SENT)).toEqual(false);
    });

    it('show delete returns false', () => {
      expect(messageFunctions.showDeleteButton(SENT)).toEqual(false);
    });

    it('show pending returns false ', () => {
      expect(messageFunctions.showPending(SENT)).toEqual(false);
    });

    it('show unarchive returns false ', () => {
      expect(messageFunctions.showUnarchiveButton(SENT)).toEqual(false);
    });

    it('show reply returns false ', () => {
      expect(messageFunctions.showReplyButton(SENT)).toEqual(false);
    });
  });

  describe('status is draft', () => {
    it('show archive returns false', () => {
      expect(messageFunctions.showArchiveButton(DRAFT)).toEqual(false);
    });

    it('show delete returns false', () => {
      expect(messageFunctions.showDeleteButton(DRAFT)).toEqual(false);
    });

    it('show pending returns false ', () => {
      expect(messageFunctions.showPending(DRAFT)).toEqual(false);
    });

    it('show unarchive returns false ', () => {
      expect(messageFunctions.showUnarchiveButton(DRAFT)).toEqual(false);
    });

    it('show reply returns false ', () => {
      expect(messageFunctions.showReplyButton(DRAFT)).toEqual(false);
    });
  });
});

describe('when in edit mode & no reply message', () => {
  const messageFunctions = getOptionDisplayFunctions(false, true);

  describe('status is New', () => {
    it('show archive returns false', () => {
      expect(messageFunctions.showArchiveButton(NEW)).toEqual(false);
    });

    it('show delete returns false', () => {
      expect(messageFunctions.showDeleteButton(NEW)).toEqual(false);
    });

    it('show pending returns false ', () => {
      expect(messageFunctions.showPending(NEW)).toEqual(false);
    });

    it('show unarchive returns false ', () => {
      expect(messageFunctions.showUnarchiveButton(NEW)).toEqual(false);
    });

    it('show reply returns false ', () => {
      expect(messageFunctions.showReplyButton(NEW)).toEqual(false);
    });
  });

  describe('status is Read', () => {
    it('show archive returns true', () => {
      expect(messageFunctions.showArchiveButton(READ)).toEqual(true);
    });

    it('show delete returns true', () => {
      expect(messageFunctions.showDeleteButton(READ)).toEqual(true);
    });

    it('show pending returns false ', () => {
      expect(messageFunctions.showPending(READ)).toEqual(false);
    });

    it('show unarchive returns false ', () => {
      expect(messageFunctions.showUnarchiveButton(READ)).toEqual(false);
    });

    it('show reply returns false ', () => {
      expect(messageFunctions.showReplyButton(READ)).toEqual(false);
    });
  });

  describe('status is archived', () => {
    it('show archive returns false', () => {
      expect(messageFunctions.showArchiveButton(ARCHIVED)).toEqual(false);
    });

    it('show delete returns true', () => {
      expect(messageFunctions.showDeleteButton(ARCHIVED)).toEqual(true);
    });

    it('show pending returns false ', () => {
      expect(messageFunctions.showPending(ARCHIVED)).toEqual(false);
    });

    it('show unarchive returns true ', () => {
      expect(messageFunctions.showUnarchiveButton(ARCHIVED)).toEqual(true);
    });

    it('show reply returns false ', () => {
      expect(messageFunctions.showReplyButton(ARCHIVED)).toEqual(false);
    });
  });

  describe('status is pending', () => {
    it('show archive returns false', () => {
      expect(messageFunctions.showArchiveButton(PENDING)).toEqual(false);
    });

    it('show delete returns false', () => {
      expect(messageFunctions.showDeleteButton(PENDING)).toEqual(false);
    });

    it('show pending returns true ', () => {
      expect(messageFunctions.showPending(PENDING)).toEqual(true);
    });

    it('show unarchive returns false ', () => {
      expect(messageFunctions.showUnarchiveButton(PENDING)).toEqual(false);
    });

    it('show reply returns false ', () => {
      expect(messageFunctions.showReplyButton(PENDING)).toEqual(false);
    });
  });

  describe('status is sent', () => {
    it('show archive returns false', () => {
      expect(messageFunctions.showArchiveButton(SENT)).toEqual(false);
    });

    it('show delete returns true', () => {
      expect(messageFunctions.showDeleteButton(SENT)).toEqual(true);
    });

    it('show pending returns false ', () => {
      expect(messageFunctions.showPending(SENT)).toEqual(false);
    });

    it('show unarchive returns false ', () => {
      expect(messageFunctions.showUnarchiveButton(SENT)).toEqual(false);
    });

    it('show reply returns false ', () => {
      expect(messageFunctions.showReplyButton(SENT)).toEqual(false);
    });
  });

  describe('status is draft', () => {
    it('show archive returns false', () => {
      expect(messageFunctions.showArchiveButton(DRAFT)).toEqual(false);
    });

    it('show delete returns true', () => {
      expect(messageFunctions.showDeleteButton(DRAFT)).toEqual(true);
    });

    it('show pending returns false ', () => {
      expect(messageFunctions.showPending(DRAFT)).toEqual(false);
    });

    it('show unarchive returns false ', () => {
      expect(messageFunctions.showUnarchiveButton(DRAFT)).toEqual(false);
    });

    it('show reply returns false ', () => {
      expect(messageFunctions.showReplyButton(DRAFT)).toEqual(false);
    });
  });
});

describe('when in edit mode & allow reply to message', () => {
  const messageFunctions = getOptionDisplayFunctions(false, false);

  describe('status is New', () => {
    it('show reply returns true ', () => {
      expect(messageFunctions.showReplyButton(NEW)).toEqual(true);
    });
  });

  describe('status is Read', () => {
    it('show reply returns true ', () => {
      expect(messageFunctions.showReplyButton(READ)).toEqual(true);
    });
  });

  describe('status is archived', () => {
    it('show reply returns true ', () => {
      expect(messageFunctions.showReplyButton(ARCHIVED)).toEqual(true);
    });
  });

  describe('status is pending', () => {
    it('show reply returns false ', () => {
      expect(messageFunctions.showReplyButton(PENDING)).toEqual(false);
    });
  });

  describe('status is sent', () => {
    it('show reply returns false ', () => {
      expect(messageFunctions.showReplyButton(PENDING)).toEqual(false);
    });
  });

  describe('status is draft', () => {
    it('show reply returns false ', () => {
      expect(messageFunctions.showReplyButton(DRAFT)).toEqual(false);
    });
  });
});
