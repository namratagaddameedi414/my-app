const fetchData = {
  doSomething() {
    try {
      const data = [
        {
          "id": 0,
          "name": "Shelia Goodman",
          "amount": 606.91,
          "transactionDate": "Tue Mar 15 2022 07:51:39 GMT-0400 (Eastern Daylight Time)",
          "tId": 1
        },
        {
          "id": 1,
          "name": "Pena Chase",
          "amount": 299.71,
          "transactionDate": "Mon Mar 14 2022 22:44:59 GMT-0400 (Eastern Daylight Time)",
          "tId": 2
        },
        {
          "id": 2,
          "name": "Graham Jacobs",
          "amount": 324.94,
          "transactionDate": "Tue Feb 01 2022 12:52:42 GMT-0500 (Eastern Standard Time)",
          "tId": 3
        },
        {
          "id": 3,
          "name": "Erika Bush",
          "amount": 799.1,
          "transactionDate": "Mon Feb 28 2022 13:55:16 GMT-0500 (Eastern Standard Time)",
          "tId": 4
        },
        {
          "id": 0,
          "name": "Shelia Goodman",
          "amount": 60,
          "transactionDate": "Mon Apr 18 2022 07:51:39 GMT-0400 (Eastern Daylight Time)",
          "tId": 5
        },
        {
          "id": 1,
          "name": "Pena Chase",
          "amount": 29,
          "transactionDate": "Tue Mar 15 2022 22:44:59 GMT-0400 (Eastern Daylight Time)",
          "tId": 6
        },
        {
          "id": 2,
          "name": "Graham Jacobs",
          "amount": 32,
          "transactionDate": "Wed Feb 02 2022 12:52:42 GMT-0500 (Eastern Standard Time)",
          "tId": 7
        },
        {
          "id": 3,
          "name": "Erika Bush",
          "amount": 79,
          "transactionDate": "Sat Feb 26 2022 13:55:16 GMT-0500 (Eastern Standard Time)",
          "tId": 8
        },
        {
          "id": 0,
          "name": "Shelia Goodman",
          "amount": 6,
          "transactionDate": "Mon Apr 18 2022 07:51:39 GMT-0400 (Eastern Daylight Time)",
          "tId": 9
        },
        {
          "id": 1,
          "name": "Pena Chase",
          "amount": 271,
          "transactionDate": "Tue Mar 15 2022 22:44:59 GMT-0400 (Eastern Daylight Time)",
          "tId": 10
        },
        {
          "id": 2,
          "name": "Graham Jacobs",
          "amount": 34.9,
          "transactionDate": "Wed Feb 02 2022 12:52:42 GMT-0500 (Eastern Standard Time)",
          "tId": 11
        },
        {
          "id": 3,
          "name": "Erika Bush",
          "amount": 79,
          "transactionDate": "Sun Mar 27 2022 13:55:16 GMT-0500 (Eastern Standard Time)",
          "tId": 12
        }
      ];
      return Promise.resolve(data);
    } catch (err) {
      return Promise.reject(err);
    }
  }
};

  export default fetchData;