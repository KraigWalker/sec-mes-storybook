import s from './NewSecureMessageView.module.css';

function NewSecureMessageView() {
  return (
    <div>
      <form
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
          <h1 style={{ margin: 0 }}>New secure message</h1>
          <section>
            <div>What's your message about? *</div>
            <div>Choose an account *</div>
          </section>
        </div>
        <section>
          <label>Message *</label>
          <div>
            <textarea></textarea>
          </div>
        </section>

        <input type="submit" value="Send" disabled formAction="/send" />
        <input type="submit" value="Save as draft" formAction="/save" />
      </form>
    </div>
  );
}

export { NewSecureMessageView };
