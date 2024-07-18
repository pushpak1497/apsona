// app.js
const API_URL = "http://localhost:3000/api";
let token = "";

async function register() {
  const username = document.getElementById("register-username").value;
  const password = document.getElementById("register-password").value;
  const res = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  alert(data.message);
}

async function login() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  const res = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (data.token) {
    token = data.token;
    document.getElementById("auth").style.display = "none";
    document.getElementById("notes").style.display = "block";
    getNotes();
  } else {
    alert(data.message);
  }
}

async function createNote() {
  const title = document.getElementById("note-title").value;
  const content = document.getElementById("note-content").value;
  const res = await fetch(`${API_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content }),
  });
  const note = await res.json();
  displayNotes([note]);
}

async function getNotes() {
  const res = await fetch(`${API_URL}/notes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const notes = await res.json();
  displayNotes(notes);
}

function displayNotes(notes) {
  const notesList = document.getElementById("notes-list");
  notesList.innerHTML = "";
  notes.forEach((note) => {
    const noteElement = document.createElement("div");
    noteElement.innerHTML = `<h3>${note.title}</h3><p>${note.content}</p>`;
    notesList.appendChild(noteElement);
  });
}
