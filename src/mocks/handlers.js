import { rest } from 'msw';

/**
 * @todo Can we read this from `public/config.json`?
 * OR can we pretend it's the int3 url?
 */
//const baseUrl = 'https://localhost:8888/ibapi/v2';

export const handlers = [
  // Handles a GET `/banks/(cb|yb)/securemessages` request
  rest.get(
    'https://localhost:8888/ibapi/v2/bank/cb/securemessages',
    (request, response, context) => {
      // Check if the user is authenticated in this session
      // const isAuthenticated = sessionStorage.getItem('is-authenticated')

      // if (!isAuthenticated) {
      //   // If not authenticated, respond with a 403 error
      //   return res(
      //     ctx.status(403),
      //     context.json({
      //       errorMessage: 'Not authorized',
      //     })
      //   );

      // If authenticated, return a mocked user details
      return response(
        context.status(200),
        context.json({
          meta: {
            total_no: 3,
            count_by_status: { DRAFT: 0, READ: 1, NEW: 0, SENT: 2 },
          },
          secure_messages: [
            {
              id: '19660666-dae6-4baa-8e16-a62230be0529',
              thread_id: '2365d0fc-fd1b-48c3-a774-1d1f99e6361b',
              reference: 'S20002473',
              subject: 'Payment Enquiries',
              user: null,
              account: {
                id: 'cc2d6f01-f5fc-488a-a711-bc9174b4eab0',
                number: '821107-40012636',
              },
              payload: { body: { data: 'cgcg' }, headers: [] },
              date_created: '2018-10-17T13:11:31.000+0000',
              status: 'SENT',
              no_reply: false,
            },
            {
              id: 'CB20001669',
              thread_id: 'd15c6df7-c8de-453d-9ee2-b8fea1b5523c',
              reference: 'CB20001646',
              subject: 'Borrowing Needs',
              user: null,
              account: null,
              payload: {
                body: {
                  data: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
                },
                headers: [],
              },
              date_created: '2018-05-17T16:01:12.000+0000',
              status: 'READ',
              no_reply: false,
            },
            {
              id: 'CB20001670',
              thread_id: 'd15c6df7-c8de-453d-9ee2-b8fea1b5523c',
              reference: 'CB20001646',
              subject: 'Borrowing Needs',
              user: null,
              payload: {
                body: {
                  data: 'Test reply from Deimos to msg received from BOW on 1st May ',
                },
                headers: [],
              },
              account: {
                id: '7dffa37f-1afe-4365-8aa6-46fc86168492',
                number: '823000-00010566',
              },
              date_created: '2018-05-01T16:01:12.000+0000',
              status: 'DRAFT',
              no_reply: false,
            },
            {
              id: 'CB20001672',
              thread_id: 'd15c6df7-c8de-453d-9ee2-b8fea1b5523c',
              reference: 'CB20001646',
              subject: 'New document available',
              user: null,
              account: null,
              payload: {
                body: {
                  data: 'A new document is available for you to view, download and/or print in the Document library.',
                },
                headers: [],
              },
              date_created: '2018-05-17T16:01:12.000+0000',
              status: 'READ',
              document: {
                id: '12345678',
                display_label: 'Advice of credit',
                file_size: '8Mb',
              },
              category: 'Letters',
              priority: 'High',
              no_reply: true,
            },
            {
              id: '1a51e31a-f8e6-4b41-a7b0-da8714bcea24',
              thread_id: '9664a502-edd3-415a-9aeb-54768d51a8fc',
              reference: null,
              subject: 'Borrowing Needs',
              user: null,
              account: {
                id: '408a3274-8dcc-492e-908e-5a479ab2c6aa',
                number: '825404-00010464',
              },
              payload: {
                body: {
                  data: 'Tanvi new msg from BOW application on 17th may',
                },
                headers: [],
              },
              date_created: '2018-05-17T14:50:05.000+0000',
              status: 'SENT',
              no_reply: false,
            },
            {
              id: '1a51e31a-f8e6-4b41-a7b0-da8714bcea25',
              thread_id: '9664a502-edd3-415a-9aeb-54768d51a8fc',
              reference: null,
              subject: 'Technical Support',
              user: null,
              account: {
                id: '408a3274-8dcc-492e-908e-5a479ab2c6aa',
                number: '825404-00010464',
              },
              payload: {
                body: {
                  data: 'Tanvi new msg from BOW application on 12th may',
                },
                headers: [],
              },
              date_created: '2018-05-12T14:50:05.000+0000',
              status: 'ARCHIVED',
              no_reply: false,
            },
          ],
        })
      );
    }
  ),
];
