## Getting Started

- ensure docker is running and ensure ports 8080 and 3000 are free.
- start up the backend: `docker run -p 8080:8080 gcr.io/hiring-278615/reposerver:v1.1`
- clone down the frontend repo: `placeholder`
- build the image and run the frontend: `docker build . -t frontend-takehome && docker run -p 3000:3000 -d frontend-takehome`. 
- on a browser go to: `http://localhost:3000/`


### Packages added
- react-table: table utility. Facilitated the creation of the list component that allows sorting.
- react-select: select component library. Facilitated the creation of the autocomplete drop down requirement.
- lodash: utility library. Used to debounce requests to the github api.
- @mui: component library. Used to make professional looking buttons. 


### About the app
- Start searching for repos using the search input component.
- The auto complete will make suggestions based on the search string. The suggestions are response payloads from the github api. 
- Click on the repo that you like and using the add button to the right will add to the repo to the list component below. 
- The list component allows sorting. Except for the last column. 
- The last column, should data rows exist, is reserved for deletion.
- If at any point the page is refreshed, the list that we have so far is persisted.
- If at any point we decide to add duplicates, the backend will error. As a quick mean to handle errors, an alert will present itself to the user.
- Basic unit tests were added.

### If I had more time
- More unit tests. We can always use better unit tests.
- Better error handling. While an alert does the job, it is not recommended in a production.
