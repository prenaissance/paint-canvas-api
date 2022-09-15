# paint-canvas-api
A paint imitation with canvas api using no external libraries (only devDependencies)

I tried every single way of debugging this, some frames simply refuse to draw for no reason at all. I'm sure this is not a problem with my code but with the cache/ canvas api and I will unlikely fix the bugs through hacky workaround and develop the project very far.

## Features
- A canvas
- Tool picker
- Undo/ Redo
- Color picker
- Local storage loading
- Download button

## TODO:
- Add eyedropper tool (easy)
- Add layers functionality (hard)
- Add line width slider (easy-medium)
- Bezier curves (medium)
- Bucket tool, using BFS on the pixels (easy?)

## Known issues
- a bug with the last redo in the stack. Unknown cause yet.
- Local storage loading does not work before a browser refresh

# Changelog
## [1.1.0]
### Added
- Local storage auto saving
- Download button
### Changed
- limited history stack to 20 elements, reimplemented using double linked list
## [1.0.0]
### Added
- A canvas
- Tool picker
- Undo/ Redo
- Color picker
