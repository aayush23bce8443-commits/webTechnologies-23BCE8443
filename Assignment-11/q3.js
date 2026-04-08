// Import events module
const EventEmitter = require('events');

// Create event emitter object
const eventEmitter = new EventEmitter();

// 1. Register first listener
eventEmitter.on('greet', (name) => {
    console.log(`Hello, ${name}! Welcome to Node.js events.`);
});

// 2. Register second listener (same event)
eventEmitter.on('greet', (name) => {
    console.log(`How are you, ${name}?`);
});

// 3. Register another event
eventEmitter.on('bye', (name) => {
    console.log(`Goodbye, ${name}! See you soon.`);
});

// 4. Trigger events using emit()
console.log("Program started...");

// Emit greet event with data
eventEmitter.emit('greet', 'Raj');

// Emit bye event
eventEmitter.emit('bye', 'Raj');

console.log("Program ended...");