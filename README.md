# Treenation

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs all project dependencies

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### Implementation

This is a React App with Typescript which gives you information about Species for any Plantation Ptojects.

- You see a filter on the top which is a dropdown to select your desired project. First one is selected by default.
- On the basis of project selected, a list of species is displayed below. It is a paginated table.
- On click of one of those species, you are redirected to its detail page for more information. You can also visit the detail page with the path `/species/{species_id}`
- There is also a request counter which updates as you make an API call. It is also maintained in local storage.

Application level cache is enabled which also helps user to save requests.

### Libraries Used

- `Redux` for state management.
- `Axios` for API calls
- `React Router` for navigation.
- `Material UI` for designing.
- `Jest` for unit testing

### Miscellaneous

With the time limit and my current commitments, I've been able to build up a reasonable application fulfilling the mentioned constraints.

It is obviously not perfect and has some known issues.

It was fun doing this exercise. Thank you!