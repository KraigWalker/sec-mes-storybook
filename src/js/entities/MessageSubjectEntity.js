
class MessageSubjectEntity {
    constructor() {
            this.subjects = {
                subject : [],
            };
    }
    setSubjects(subject) {
        console.log('Subjects',subject);
        this.subjects.subject.push(subject);
        console.log('After Pusg',this.subject);
    }
    getSubjects() {
        console.log('Array',this.subject);
        return this.subjects;
    }
}
export default MessageSubjectEntity;