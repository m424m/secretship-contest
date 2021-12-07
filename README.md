# Secretship JS contest submission

Demo: https://secretship-contest.vercel.app/

## Project setup

```
npm install
```

### Start dev server

```
npm run dev
```

### Build for production

```
npm run build
```

The project runs on [Vue 3](https://v3.vuejs.org/) and [Vite](https://vitejs.dev).

You will need to set two environment variables:

```
VITE_BOT_USERNAME=[Telegram bot username]
VITE_APP_NAME=[App name]
```

All strings for i18n are located in `src/i18n.yaml`.

All major elements (text input, select, radio buttons, checkboxes, modal windows, etc.) have been custom-made from
scratch. However, the architecture of the project assumes that additional logic for components (for example, adding
decimals to numeric input fields) is implemented separately outside the components when needed so as not to overload
them.
