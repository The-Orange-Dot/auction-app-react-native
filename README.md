# README

MOXIE

- Designed and coded by Hung Le
- Artwork from various magazines and illustrations from 1940s - 1960s magazines

This app is a side project which goes alongside the MOXIE web application

This application is designed to be a concept for a different type of p2p e-commerce business. While most e-commerce business work as a store, this app takes the concept of loot boxes and gacha mechanics in video games and tries to implement it into an e-commerce application. Users can buy tickets using points charged on their accounts in hopes of winning an item. Currently only the winner will receive an item, and others will not receive anything at all, but for future development, all users who buy tickets will win something (digital goods?).

============================================================================

Tools and libraries used:

- React Native
- Ruby-on-Rails
- Moment.js for "new" tag which lists items as new if it has been created in the last 3 days

Progress of development:

- Landing screen is created.
- "Browse" screen created which fetches products from back end to display on cards.
- Users can now press on cards which open up products to see description
- NavBar created to switch screens to profile and account screens
- CRUD functionality added for creating listing
- User will stay logged in using encrypted user token and AsyncStorage
- User can charge points on their account
- landing page will now be skipped if you're already logged in (login button disabled on landing page just in case)

Things to add:

- Create new account screen (or modal?)
- Edit user account information (like address)
- Better styling on the ticket screen (omg it's hideous)
- Seller needs to be able to see winner's address
- Add search and category selector function
