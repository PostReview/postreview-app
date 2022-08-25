<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

# PostReview

PostReview is a platform for anyone to post their opinions about research papers, post-publication. The app is build via
[Blitz.js](https://github.com/blitz-js/blitz).

## Code of Conduct

We welcome anyone who wants to contribute. That said, we ask you to follow our [Code of Conduct](https://github.com/nsunami/postreview-app/blob/main/CODE_OF_CONDUCT.md) when you are in our space.

## How to Run the App Locally

1. Clone the repository
2. Setup the environemnt variables. Note that the app currently uses Google OAuth, which requires a client ID, secret, and callback URL.

Ensure the `.env.local` file has required environment variables:

```
DATABASE_URL=postgresql://<YOUR_DB_USERNAME>@localhost:5432/postreview-app
GOOGLE_CLIENT_ID=****
GOOGLE_CLIENT_SECRET=***
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback
ALGOLIA_APP_ID
ALGOLIA_API_SEARCH_KEY
ALGOLIA_API_ADMIN_KEY
ALGOLIA_PREFIX
POSTMARK_TOKEN
UPLOADCARE_PUBLIC_KEY
```

3. Run your app in the development mode.

```
blitz dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to access the app.

## Managing App on Heroku

- To reset the database, run `heroku pg:reset`
- To seed the database, run `heroku run blitz db seed`

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/coglebed"><img src="https://avatars.githubusercontent.com/u/73071333?v=4?s=100" width="100px;" alt=""/><br /><sub><b>coglebed</b></sub></a><br /><a href="#design-coglebed" title="Design">🎨</a> <a href="https://github.com/PostReview/postreview-app/issues?q=author%3Acoglebed" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://chjh.nl"><img src="https://avatars.githubusercontent.com/u/2946344?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Chris Hartgerink</b></sub></a><br /><a href="#mentoring-chartgerink" title="Mentoring">🧑‍🏫</a> <a href="https://github.com/PostReview/postreview-app/issues?q=author%3Achartgerink" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/jazellemaira"><img src="https://avatars.githubusercontent.com/u/42837484?v=4?s=100" width="100px;" alt=""/><br /><sub><b>jazellemaira</b></sub></a><br /><a href="https://github.com/PostReview/postreview-app/commits?author=jazellemaira" title="Code">💻</a> <a href="#design-jazellemaira" title="Design">🎨</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
