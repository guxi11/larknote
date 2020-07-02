# Larknote

A chrome extension which can enhance the [feishu documents](https://www.feishu.cn/)’ ability to take notes.

## Features

- [x] Autocomplete link title
- [ ] Ability to keep sidebars on document pages, like Octotree
- [ ] Automatically add back links, like Roam

## Development

### Install

Clone this repository, and install dependencies:

```
npm install
```

### Build

Compile extension:

```
npx webpack
```

Unpacked Chrome extension will be compiled into `dist/`.

You can load it into Chrome by enabling developer mode on the "Extensions" page, hitting "Load unpacked", and selecting the `dist/` folder.

Use `npx webpack` to recompile after editing.

## TODO

- [ ] Add hot reloading
- [ ] Add options page

## Contributing

Issues and PRs are welcome.

## License

BSD-3-Clause
