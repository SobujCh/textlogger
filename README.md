# textlogger
This repository contains a simple logging utility for Node.js applications. It provides functions to log messages to the console and to a file, with options for custom log file names and directories. Each log message is appended with the current date and time.

## Features
Log messages to the console with date and time.
Log messages to a file.
Customizable log file names and directories.
Timestamps for each log entry.
Option to log with or without colors.

## Installation
```javascript
npm i textlogger
```

## Usage
```javascript
textlog("Your text goes here");
//Output: 15-12-2024 18:16:12:646 : 'Your text goes here'

debuglog("Your text goes here");
//Will save to file but no console output
```

### Importing the Module

```javascript
const { setLogName, setLogDir, textlog, debuglog } = require('textlogger');
```

### Setting the Log File Name

You can set a custom log file name using the `setLogName` function:

```javascript
await setLogName('custom-log-file-name');
```

### Setting the Log Directory

You can set a custom log directory using the `setLogDir` function. By default, the directory is relative to the current directory:

```javascript
await setLogDir('logs');
```

To set an absolute directory, pass `false` as the second argument:

```javascript
await setLogDir('/absolute/path/to/logs', false);
```

### Logging Messages

To log messages to the console and the log file, use the `textlog` function:

```javascript
await textlog('This is a log message', { key: 'value' });
```

To log messages only to the log file, use the `debuglog` function:

```javascript
await debuglog('This is a debug log message', { key: 'value' });
```

## Functions

### `setLogName(name)`

Sets the name of the log file.

- `name` (string): The name of the log file.

### `setLogDir(dir, relative = true)`

Sets the directory for the log files.

- `dir` (string): The directory for the log files.
- `relative` (boolean): Whether the directory is relative to the current directory. Default is `true`.

### `textlog(...txt)`

Logs messages to the console and the log file, appending the current date and time.

- `...txt` (any): The messages to log.

### `debuglog(...txt)`

Logs messages only to the log file, appending the current date and time.

- `...txt` (any): The messages to log.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes or improvements.

## Contact

For any questions or inquiries, please contact [sobujos@gmail.com].