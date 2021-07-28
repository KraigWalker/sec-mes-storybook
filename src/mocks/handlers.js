import { rest } from 'msw';

/**
 * @todo Can we read this from `public/config.json`?
 * OR can we pretend it's the int3 url?
 */
//const baseUrl = 'https://localhost:8888/ibapi/v2';
//https://localhost:8888/ibapi/v2/banks/:bankId/auth/provider/oauth2/token/exchange/jwt"

export const handlers = [
  // Mock cookie response for development mode that sets an ibjwt cookie in document.cookie
  rest.get(
    'https://localhost:8888/mock-jwt-token',
    (request, response, context) => {
      return response(
        context.cookie(
          'ibjwt',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.VSeAGgj19UBhOkoHye8YylGME-xofB-2ouemo2EFVXQ'
        )
      );
    }
  ),
  // Handles a GET `/banks/(cb|yb)/securemessages` request
  rest.get(
    'https://localhost:8888/ibapi/v2/banks/cb/securemessages',
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
                id: '7dffa37f-1afe-4365-8aa6-46fc86168492',
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
  rest.post(
    'https://localhost:8888/ibapi/v2/banks/:bankId/auth/provider/oauth2/token/exchange/jwt',
    (request, response, context) => {
      return response(
        context.status(200),
        context.json(
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.VSeAGgj19UBhOkoHye8YylGME-xofB-2ouemo2EFVXQ'
        )
      );
    }
  ),
  rest.get(
    'https://localhost:8888/ibapi/v2/banks/auth/provider/oauth2/jwt/publickey',
    (request, response, context) => {
      return response(
        context.status(200),
        context.json({
          public_key:
            'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArEknHZaI38opEHj/xN5xHO+66WQIA3qb87EqNqH54b4iDQdyoxF3pSbT/4dm69oUQ8ROEJW/ndReEVsrdalfACXehz6VPx2zSXIFFobF2tPumQOxgWdlO4ogMEPfGu8qugEVWHkNmO0yCSpLjE/MEKgqeK26ZsvWgv0i97Zya01SAaoA0g0pRAw+W5O2vnhEXxRGRm+jL6fF8aEJaIXWsk6jR8YWVTvJeqkTL9Y/syi1EwKy3V/fv44KHzg+DCSINOHeewEPFg9FTdKnU65pLj0M6WD3Nc6aF6jC2RWokNMwUE05lPogd2Xhk8jVio17Hl8v+YuT80WhRC5yt09QXQIDAQAB',
        })
      );
    }
  ),
  rest.get(
    'https://localhost:8888/ibapi/v2/banks/cb/accounts/default',
    (request, response, context) => {
      return response(
        context.status(200),
        context.json({
          accounts: [
            {
              type: 'current',
              number: '823000-00010566',
              product: {
                code: '136',
                name: 'B Current',
                description: 'DYB CURRENT ACCOUNT',
              },
              actions_available: {
                '/account/alerts': true,
                '/account/consent': false,
                '/account/payments/transfer/in': true,
                '/account/mandates/so/write': true,
                '/account/statements/order': true,
                '/account/mandates/so/read': true,
                '/account/books/cheque/reorder': true,
                '/account/transactions/readwrite': false,
                '/account/sweeps': true,
                '/account/beneficiaries/read': true,
                '/account/beneficiaries/delete': true,
                '/account/sweeps/transfer/out': false,
                '/account/beneficiaries/biller/write': true,
                '/account/read': true,
                '/account/projections': true,
                '/account/payments/uk/ics/in': false,
                '/account/books/payin/reorder': true,
                '/account/beneficiaries/account/readwrite': true,
                '/account/mandates/dd/read': true,
                '/account/preferences/paperstatementoptout': true,
                '/account/statements/read': true,
                '/account/payments/uk/default/out': true,
                '/account/payments/transfer/out': true,
                '/account/transactions/write': true,
                '/account/transactions/read': true,
                '/account/pots': false,
                '/account/mandates/dd/write': true,
                '/account/balance/available': true,
              },
              bank_id: 'CB',
              metadata: {
                display_name: null,
                display_order: 3,
              },
              id: '7dffa37f-1afe-4365-8aa6-46fc86168492',
            },
            {
              type: 'current',
              number: '827001-00010244',
              product: {
                code: '136',
                name: 'B Current',
                description: 'DYB CURRENT ACCOUNT',
              },
              actions_available: {
                '/account/alerts': true,
                '/account/consent': false,
                '/account/payments/transfer/in': true,
                '/account/mandates/so/write': true,
                '/account/statements/order': true,
                '/account/mandates/so/read': true,
                '/account/books/cheque/reorder': true,
                '/account/transactions/readwrite': false,
                '/account/sweeps': true,
                '/account/beneficiaries/read': true,
                '/account/beneficiaries/delete': true,
                '/account/sweeps/transfer/out': false,
                '/account/beneficiaries/biller/write': true,
                '/account/read': true,
                '/account/projections': true,
                '/account/payments/uk/ics/in': false,
                '/account/books/payin/reorder': true,
                '/account/beneficiaries/account/readwrite': true,
                '/account/mandates/dd/read': true,
                '/account/preferences/paperstatementoptout': true,
                '/account/statements/read': false,
                '/account/payments/uk/default/out': true,
                '/account/payments/transfer/out': true,
                '/account/transactions/write': true,
                '/account/transactions/read': true,
                '/account/pots': false,
                '/account/mandates/dd/write': true,
                '/account/balance/available': true,
              },
              bank_id: 'CB',
              metadata: {
                display_name: null,
                display_order: 2,
              },
              balances: [
                {
                  type: 'current',
                  amount: {
                    value: 98585.97,
                    currency: 'GBP',
                  },
                },
                {
                  type: 'available',
                  amount: {
                    value: 98585.97,
                    currency: 'GBP',
                  },
                },
              ],
              id: '052bc152-8ece-439c-a55d-a532e63726b8',
            },
            {
              type: 'savings',
              number: '823000-00010574',
              product: {
                code: '138',
                name: 'B Instant Savings',
                description: 'DYB SAVINGS ACCOUNT',
              },
              actions_available: {
                '/account/alerts': false,
                '/account/consent': false,
                '/account/payments/transfer/in': true,
                '/account/mandates/so/write': false,
                '/account/statements/order': true,
                '/account/mandates/so/read': false,
                '/account/books/cheque/reorder': false,
                '/account/transactions/readwrite': false,
                '/account/sweeps': false,
                '/account/beneficiaries/read': false,
                '/account/beneficiaries/delete': false,
                '/account/sweeps/transfer/out': true,
                '/account/beneficiaries/biller/write': false,
                '/account/read': true,
                '/account/projections': false,
                '/account/payments/uk/ics/in': false,
                '/account/books/payin/reorder': false,
                '/account/beneficiaries/account/readwrite': false,
                '/account/mandates/dd/read': false,
                '/account/preferences/paperstatementoptout': true,
                '/account/statements/read': true,
                '/account/payments/uk/default/out': false,
                '/account/payments/transfer/out': true,
                '/account/transactions/write': true,
                '/account/transactions/read': true,
                '/account/pots': true,
                '/account/mandates/dd/write': false,
                '/account/balance/available': false,
              },
              bank_id: 'CB',
              metadata: {
                display_name: null,
                display_order: 4,
              },
              balances: [
                {
                  type: 'current',
                  amount: {
                    value: 201,
                    currency: 'GBP',
                  },
                },
                {
                  type: 'available',
                  amount: {
                    value: 201,
                    currency: 'GBP',
                  },
                },
              ],
              id: '7e0ab046-4648-4f2d-a018-2aa961c4c9db',
            },
          ],
        })
      );
    }
  ),
];
