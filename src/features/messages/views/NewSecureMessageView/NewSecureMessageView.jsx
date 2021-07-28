import { FullWidthButtonInput } from '../../components/FullWidthButtonInput';
import s from './NewSecureMessageView.module.css';

function NewSecureMessageView() {
  return (
    <form
      className={s.form}
      onSubmit={(e, data) => {
        e.preventDefault();
        console.log('form submit');
        const { formAction } = e.nativeEvent.submitter || '/send';
        if (formAction.endsWith('/send')) {
          console.log('send');
          /** @todo dispatch send action with message payload */
        } else if (formAction.endsWith('/save')) {
          console.log('save');
          /** @todo dispatch save [as draft] action with message payload */
        } else {
          // error
        }
      }}
    >
      <div className={s.topBar}>
        <h1 className={s.header}>New secure message</h1>
        <div>What's your message about? *</div>
        <div>Choose an account *</div>
      </div>
      <div className={s.bodyContainer}>
        <label>Message *</label>
        <div className={s.textAreaSizer}>
          <textarea className={s.textArea}></textarea>
        </div>
      </div>
      <div className={s.buttonPositioner}>
        <FullWidthButtonInput
          type="submit"
          value="Send"
          primary
          disabled
          formAction="/send"
        />
        <FullWidthButtonInput
          type="submit"
          value="Save as draft"
          formAction="/save"
        />
      </div>
    </form>
  );
}

export { NewSecureMessageView };
