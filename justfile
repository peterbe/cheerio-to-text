# https://github.com/casey/just
# https://just.systems/

install:
    npm install

format:
    npm run format

lint:
    npm run lint

upgrade:
    npx npm-check-updates --interactive --cooldown "1d"

outdated:
    npm outdated

release:
    npm run release
