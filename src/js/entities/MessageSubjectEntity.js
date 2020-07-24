class MessageSubjectEntity {
  constructor() {
    this.subjects = {
      subject: [],
    };
  }
  setSubjects(subject) {
    this.subjects.subject.push(subject);
  }
  getSubjects() {
    return this.subjects;
  }
}
export default MessageSubjectEntity;
