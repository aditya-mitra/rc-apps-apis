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

_Go to_ Adminstration > General > Apps > Enable development mode

## Deploying

```
rc-apps deploy --url http://localhost:3000 --username kame --password kame
```

## Uninstalling From Server

_Go to_ Adminstration > Apps > Hover over the app > Click the hamburger icon > Click uninstall

# Encountered Problems

**_Keep these in mind_**

1. A _`command class`_ imported from `commands/index.ts` will not register a command.
   You need to keep it in its own file - `commands/nameofcommand.ts`.

2. While creating a new message using the _`IMessageBuilder`_, it is required to explicitly mention the **room** and the **user**. Otherwise, we would get the same message in methods like `executePreMessageSentModify`.

```ts
builder
  .setSender(message.sender)
  .setRoom(message.room)
  .setText("my changed message")
  .getMessage();
```
