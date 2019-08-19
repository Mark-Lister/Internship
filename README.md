## fed-intern-test-2019

Test for prospective FED interns

To begin:

```
cd fed-intern-test-2019

npm install

npm start
```
# Internship
Sort data by clicking on the buttons on column headers also there's search and dropdown filters and a reset filter button. Currencies are converted to NZD from their countries currencies (As the assumption in the email said values are recorded in their countrys currency) when the table is initialized so all data is viewed in NZD until the dropdown for currency is changed to another. Also note there's pages numbers down the bottom.

## Summary
This is my first time using react so it was a bit foreign to me but it was quite interesting I think even if I don't get the internship I will continue to play with it. I thought about using bootstrap-table-next2 to create my tables but decided to implement all the features my self to try show my abilities and learn more on the way. I decided the table would be rendered after the API calls were complete so that I could put all the needed data in the constructor. I used Set and Map to extract the unquie countries and Object.Keys to get the exchange rates so I could use both these values in dropdowns for sorting and changing the rate. This should be able to work if there's data from other countries. If there's new rates the rate will have to be mapped to the country eg 'AUD' = 'AUS' in the constructor. I also decided to add pagination as it make it look a lot tider exspecially if more data is added. I used react-select for dropdowns which made my code a little messier but I think the end result is worth it because it looks much nicer.It was worth it putting the table in a seperate component so the whole page doesnt have to rerender while filtering or sorting. One step futher I woulld've liked to attempt if I had time was to make only the rows rerender while filtering and not the entire table. Overall I am happy with the way it looks and functions I enjoyed spending time to learn this new framework/library and thank you for the opportunity!
