import _ from  'lodash';
import MessageSubjectEntity from '../entities/MessageSubjectEntity';

/**
 * 
 * @param {array of Messages} parses the service response 
 */
export function parseSubjects(response) {
    const subjects = [];
    const messageSubjectEntity = new MessageSubjectEntity();
    _.forEach(response.subjects, subject => {
       messageSubjectEntity.setSubjects(subject.value);
        subjects.push(subject);
    });
    return subjects;

}
export function parseAccounts(response) {
    const accounts = [];
    _.forEach(response.accounts,account => {
        accounts.push(account.product.name);
    })
    return accounts;
}