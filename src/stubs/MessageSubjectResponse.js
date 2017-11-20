class MessageSubjectResponse {
    getSubjects() {
        const response = {
            "subjects": [
              {
                "key": "BN",
                "value": "Borrowing Needs"
              },
              {
                "key": "PE",
                "value": "Payment Enquiry"
              },
              {
                "key": "GF",
                "value": "General Feedback"
              },
              {
                "key": "TS",
                "value": "Technical Support"
              },
              {
                "key": "OE",
                "value": "Overdraft Enquiries"
              },
              {
                "key": "CA",
                "value": "Change of address enquiries"
              },
              {
                "key": "CO",
                "value": "Complaints"
              }
            ]
          }
          return response;
    }
}