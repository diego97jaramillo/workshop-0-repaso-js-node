class newNote {
    constructor(id, description, isImportant = false) {
        this.id = id;
        this.description = description;
        this.isImportant = isImportant;
    }

    toggleImportant() {
        this.isImportant = !this.isImportant
    }
}

class bookAdmin {
    constructor() {
        this.notes = JSON.parse(localStorage.getItem('notes')) || [];
        this.showNotes()
    }


    createNote(descriptionNote) {
        const id = this.notes.length ? this.notes[this.notes.length - 1].id + 1: 1;
        const note = new newNote(id, descriptionNote);
        this.notes.push(note);
        this.saveNotes();
        this.showNotes();
        document.getElementById('new-notes').value = '';
    }

    saveNotes() {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }

    deleteNote(id) {
        console.log(this.notes,typeof id);
        this.notes = this.notes.filter((note) => note.id !== id );
        console.log(this.notes,typeof id);
        this.saveNotes();
        this.showNotes();

    }

    editNote(id) {
        const newDescription = prompt('escribe la descripcion correcta');
        const note = this.notes.find((element) => element.id == id);
        note.description = newDescription;
        this.saveNotes();
        this.showNotes();
        document.getElementById('new-notes').value = '';
    }

    toggleChangeImportant(id) {
            const note = this.notes.find((element) => element.id == id);
            console.log(note);
            if (note) {
                note.toggleImportant();
                this.saveNotes();
                this.showNotes();
            }
    }

    showNotes() {
        const notesList = document.getElementById('notes-list')
        notesList.innerHTML = '';
        this.notes.forEach(note => {
            const listItem = document.createElement('li');
            listItem.textContent = note.description;
            console.log(note.isImportant);
            note.isImportant == true ? listItem.className = 'important' : '';
            listItem.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleChangeImportant(note.id);
            })

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'x';
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.deleteNote(note.id);
            })


            const editButton = document.createElement('button');
            editButton.textContent = 'edit';
            editButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.editNote(note.id);
            })


            listItem.appendChild(editButton);
            listItem.appendChild(deleteButton);
            notesList.appendChild(listItem);
        });
    }

}

document.addEventListener('DOMContentLoaded', () => {
    const notes = new bookAdmin();

    document.getElementById('add-notes').addEventListener('click', () => {
        const description = document.getElementById('new-notes').value
        if (description) {
            notes.createNote(description);
        }
    })
})
