


in the npm scripts
fix the path for
```
    "prepare": "sudo rm -rf node_modules/superneatlib && cp -r '../../../superneatlib git/superneatlib' node_modules/superneatlib",

```
Its hard linked right now cause it wont read an .env var $VITE_neat
and the words to fix it just say its too many steps

