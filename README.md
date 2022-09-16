# paint-canvas-api

A paint imitation with canvas api using no external libraries (only devDependencies)

<img src="https://github.com/prenaissance/paint-canvas-api/blob/master/src/assets/images/showcase.png?raw=true" width="30%" height="30%" style="float: right"/>

## How to run the project locally

1. Make sure you have node.js installed
2. Clone the project with `git clone https://github.com/prenaissance/paint-canvas-api.git {folder name}` (or download it if you desire)
3. Navigate to the root folder of the project
4. Install packages using `npm i`
5. Run `npm start`

I tried every single way of debugging this, some frames simply refuse to draw for no reason at all. I'm sure this is not a problem with my code but with the cache/ canvas api and I will unlikely fix the bugs through hacky workaround and develop the project very far.

## Features

- A canvas
- Tool picker
- Undo/ Redo
- Color picker
- Local storage loading
- Download button
- Bucket tool (works with BFS)
- Eyedropper tool (no visual feedback yet, fill only)

## TODO

- Add layers functionality (hard)
- Add line width slider (easy-medium) 
- Bezier curves (medium)

## Known issues

- a bug with the last redo in the stack. Unknown cause yet.
- Local storage loading does not work before a browser refresh

## Changelog

## [1.2.2] - 2022-09-16

### Fixed

- using pointer capture, now tools can be held outside canvas boundaries

## [1.2.1] - 2022-09-16

### Fixed

- Performance issue with bucket tool

## [1.2.0] - 2022-09-16

### Added

- Download button
- Eyedropper tool
- Bucket tool

### Changed

- README.md more descriptive

## [1.1.0] - 2022-09-15

### Added

- Local storage auto saving
- Download button

### Changed

- limited history stack to 20 elements, reimplemented using double linked list

## [1.0.0] - 2022-09-12

### Added

- A canvas
- Tool picker
- Undo/ Redo
- Color picker
