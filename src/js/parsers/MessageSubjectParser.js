import _ from  'lodash';
// import MessageSubjectEntity from '../entities/MessageSubjectEntity';

/**
 * 
 * @param {array of Messages} parses the service response 
 */
export function parseSubjects(response) {
    console.log(response);
    const subjects = [];
    _.forEach(response.subjects, subject => {
        //const messageSubjectEntity = new MessageSubjectEntity();
       // messageSubjectEntity.setSubjects(subject.value);
        subjects.push(subject);
    });
    return subjects;

}
export function parseAccounts(response) {
    console.log('Accounts',response);
    const accounts = [];
    _.forEach(response.accounts,account => {
        accounts.push(account.product.name);
    })
    return accounts;
}