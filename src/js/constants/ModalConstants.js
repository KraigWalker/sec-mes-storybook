export const NO_MODAL = 0;
export const DELETE_MODAL = 1;
export const ARCHIVE_MODAL = 2;
export const UNARCHIVE_MODAL = 3;

export const getSuccessModalMessage = (modalType, content) => {
  switch (modalType) {
    case ARCHIVE_MODAL: {
      return content.messageArchived;
    }
    case UNARCHIVE_MODAL: {
      return content.messageUnarchived;
    }
    case DELETE_MODAL:
    default: {
      return content.messageDeleted;
    }
  }
};
