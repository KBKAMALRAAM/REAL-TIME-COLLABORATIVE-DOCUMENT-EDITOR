const socket = io();
const editor = document.getElementById('editor');

// Load the current document content
socket.on('load document', (content) => {
    editor.value = content;
});

// Listen for changes in the editor
editor.addEventListener('input', () => {
    const content = editor.value;
    socket.emit('edit document', content);
});

// Update the editor when another user makes changes
socket.on('update document', (newContent) => {
    editor.value = newContent;
});
