# Documentation Hub

Kele Pool Documentation Hub - Features Whitepaper, FAQs, Technical Docs, Guides and more. Is written in [Vuepress](https://v2.vuepress.vuejs.org/guide/#how-it-works)

We welcome all contributions! Please refer to our [ contribution guidelines ]( ./CONTRIBUTING.md ).

## Local Testing

If you want to test this locally, follow the next few steps:

- Clone this repo eg: `git clone git@github.com:kelepool/docs.kelepool.com.git ./kelepool`
- Move into the directory: `cd kelepool`
- Install dependencies using: `npm install` or `yarn install`
- Run the dev server which will create the site and update automatically when you make changes: `yarn dev` or `npm run dev`
- Go to `http://localhost:8080/` in your browser to view the site.

## Project Structure

Files under `/.vuepress` include [components](https://vuejs.org/v2/guide/components.html), style and configs.

To add new pages and have them appear in the side menu, add the links to the `sidebar` property in the `/.vuepress/config.js` file for them to appear.
