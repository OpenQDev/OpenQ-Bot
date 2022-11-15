# openqdev-bot

> A GitHub App built with [Probot](https://github.com/probot/probot) that A Probot app

## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Docker

In the root of `OpenQ-Bot`, create a `.env` file.

Copy the content from `.env.sample` to `.env`.

The PAT should have public_repo, read:org, read:user permissions to the account openq-bot's comments will be coming from on github.
Run yarn start in the openq-bot repo, and navigate to port 3006 in your browser. Probot will walk you through the rest of the set up instructions with github, and you'll find the other empty env values in the process.
Once the env files are populated, end the process and run ./boot.sh on the full stack.
If you run into any issues contact Voyageur <christopherstevers1@gmail.com>.
GITHUB_BOT_SECRET="a5d5a4d787f816faabc4738588e8d919bd1a41cf80f8e02685f842b0f2bd49c2"

```sh
# 1. Build container
docker build -t openqdev-bot .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> openqdev-bot
```

## Contributing

If you have suggestions for how openqdev-bot could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2022 Flaco <andrew@openq.dev>

## Examples

`curl -X POST -d '{"bountyId": "I_kwDOGWnnz85LAv-r", "id": "sdf"}' https://development.openq.dev/githubbot/created`