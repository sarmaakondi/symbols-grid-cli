# Symbols Grid CLI

A command-line interface (CLI) tool for managing and generating grid components for the Symbols app.

## Installation

To install Symbols Grid CLI, run:

```bash
# local
npm install symbols-grid-cli

# global
npm install -g symbols-grid-cli
```

## Usage

To use Symbols Grid CLI, run:

```bash
symbols-grid-cli [options]
```

### Commands

#### `init [targetDir]`

Clones the Symbols starter kit repository into the provided target directory. If no target directory is specified, it will default to the current directory.

Example:

```bash
symbols-grid-cli init /path/to/directory
```

#### `create [targetDir]`

Updates the `components.js` and `pages.js` files in the specified target directory with predefined code for the `GridSelectionComponent`. If no target directory is provided, it will default to the `./src` directory.

Example:

```bash
symbols-grid-cli create /path/to/directory
```

This will replace the existing `components.js` and `pages.js` files with the new files containing the GridSelectionComponent.

### Usage Example

After running the `create` command, the necessary components will be automatically added to the `components.js` file in your target directory. You can then use these components in your Symbols app.

For more details on configuring and customizing the grid, refer to the official Symbols documentation.

## License

This project is licensed under the [MIT License](LICENSE).
