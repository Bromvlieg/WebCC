# WebCC

An extention for Visual Code to make it easier to work with lua in the ComputerCraft mod for minecraft.

## Commands:

- `webcc.start`: Start WebCC server
- `webcc.stop"`: Stop WebCC server
- `webcc.runFile`: Run current file on WebCC
- `webcc.installFile`: Install current file on WebCC as autostart.lua
- `webcc.copyInstall`: Copy lua exec to clipboard
- `webcc.runProgram`: Run program on WebCC

## Usage

- Start Visual Code
- start the WebCC service via `F1 -> webcc.start`
- Go to a computer or turtle in minecraft and enter the lua shell
- copy the WebCC install string via `F1 -> webcc.copyInstall`
- open a file containing lua code
- Execute the file via `F1 -> webcc.runFile`

## Developing / Installing

To begin do `npm install`. You should be able to use F5 to start a debug Visual Code instance with the extention enabled
use `npm run install` to build & install the extention to your Visual Code installation

Currently the websocket endpoint it connects to is hard coded in `./assets/lua/cc.lua`, edit the websocket url there to point it to your own endpoint.
