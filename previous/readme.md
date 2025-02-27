# robotictacos.com
requires you create a new token
<!-- https://dev.to/shafia/support-for-password-authentication-was-removed-please-use-a-personal-access-token-instead-4nbk#:~:text=Please%20use%20a%20personal%20access%20token%20instead.,-While%20pushing%20some&text=Starting%20from%20August%2013%2C%202021,in%20place%20of%20your%20password.
 -->
- npm install
- npm run build
- npm run deploy

npx vite

delete dist
npm run build
MAYBE
git rm dist -r
git add .
git commit -m "skdjnf"
git commit -am "^#%^#"

npm run deploy
it will also nag about
:x save

visit
https://github.com/wswoodruff/robotictacos.com/actions

not sure actions works
edit vite.config.js
build: {
  rollupOptions: {
    input: {
and add a new index prop for your custom index file

run these and then git push, those steps seemed to have worked
- npm run build
- npm run deploy

https://github.com/wswoodruff/robotictacos.com

git reset --hard



## tools

builders.js has a bunch of basic modules for export


making a new demo
dup an index file
in vite.conf in input, add a line with whatever name and the index name path
in the new index file replace the inininint import to a new name
use that new name and duplicate a ./js/name _ demo .js file
rework the file!!
