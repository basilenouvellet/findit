# Findit

Chrome extension to answer any question about the content of the current page you are visiting
(usually an article, a Wikipedia page, a Reddit thread, a documentation page, etc).

This is :construction: Work In Progress

## Install

- In *backend/*, run `dev/bin/install`
- In *frontend/*, run `npm install`

## Run

- In *backend/*, run `dev/bin/start`
- In *frontend/*, run `npm run watch` to develop

## Deploy in the browser

### Backend

In *backend/*, keep your local API server running with `dev/bin/start`

### Frontend

In *frontend/*:

1. Run `npm run build`
2. Open Chrome and click on **More Tools > Extensions**
3. Activate *Developer mode* if not done already
4. Click on **Load unpacked** and select the `frontend/dist/` folder in the project

Repeat **steps 1. & 2.** each time you modify your code,
then click the **Reload arrow** next to your extension on the Extensions page
