import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { render, fireEvent, act, waitFor } from '@testing-library/react';
import fetchData from './services/rewardsService'

describe('my function or component', () => {
  let container;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  
  afterEach(() => {
    document.body.removeChild(container);
    ReactDOM.unmountComponentAtNode(container);
    container = null;
  });
  it('renders without crashing', async() => {

      const callApi = jest.spyOn(fetchData, 'getCustomersList').mockReturnValue(Promise.resolve(
      [
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
        }
      ]));
      const {getAllByTestId } = render(<App />);
      expect(await waitFor(() => getAllByTestId(/^row-*/).length)).toBe(3);
      // expect((await waitFor(() => getByTestId('reward-list'))).children).toHaveLength(3);
      // console.log(listNode.children)
      // expect(listNode.children).toHaveLength(3);
  });

  it('should show Loading when there is no data', async() => {
    const div = document.createElement('div');
    const callApi = jest.spyOn(fetchData, 'getCustomersList').mockReturnValue(Promise.resolve([]));
    const {queryByText} = render(<App />);
    expect(await waitFor(() => queryByText('No record found'))).toBeTruthy();
    // ReactDOM.unmountComponentAtNode(div);
  });

  it('should show Loading when there is no dataxxxxx', async() => {
    const callApi = jest.spyOn(fetchData, 'getCustomersList').mockReturnValue(Promise.resolve(
      [
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
        }
      ]));
      const {getAllByTestId, getAllByText, queryByText } = render(<App />);
      const firstId = await waitFor(() => getAllByText("+"));
      act(() =>{
        fireEvent.click(firstId[0]);
        // expect(getAllByText(/TransactionDate/i)).toBeTruthy();
      });
      expect(await waitFor(() => getAllByText(/TransactionDate/i))).toBeTruthy();
  
  });
});



