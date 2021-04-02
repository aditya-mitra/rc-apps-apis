## Installing the CLI

```
npm install -g @rocket.chat/apps-cli
```

## Adding AutoComplete for the CLI

```
printf "$(rc-apps autocomplete:script bash)" >> ~/.bashrc; source ~/.bashrc
```

This will add the autocomplete of the rc-apps CLI which can be done using <kbd>tab</kbd>

## Bootstraping

```
rc-apps create 
```

This will ask the questions and create a new folder with the _app name_.

## Configuring the Server

*Go to* Adminstration > General > Apps > Enable development mode

## Deploying

```
rc-apps deploy --url http://localhost:3000 --username kame --password kame
```

## Uninstalling From Server

*Go to* Adminstration > Apps > Hover over the app > Click the hamburger icon > Click uninstall