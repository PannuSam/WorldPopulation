Here I am using below RapidAPI

https://rapidapi.com/aldair.sr99/api/world-population/

It has three endpoints,
1. Get Country population
 - Gives Country's data when Passed with Country's name

 Note: CountryName argument is case sesnsitive for api. So, we cannot perform ignore case.

 2. World Population
  - Gives total Population and this api is fetching this info from worldometer site (https://www.worldometers.info/).

 3. All Countries Name
  - This endpoint gives Countries name only.
  - I have used this api to fetch country's name and then call to first api to get that country's data
  - So, here I have used two API's data to fetch all countries details. 