import { db } from "./firebase-init.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const contactForm = document.getElementById("contactForm");
const contactList = document.getElementById("contactList");


function loadLocalContacts() {
  const raw = localStorage.getItem("safe_contacts");
  return raw ? JSON.parse(raw) : [];
}

function saveLocalContacts(list) {
  localStorage.setItem("safe_contacts", JSON.stringify(list));
  renderContacts();
}

export function renderContacts() {
  const list = loadLocalContacts();
  contactList.innerHTML = '';
  if (!list.length) {
    contactList.innerHTML = '<p class="text-sm text-slate-500">No contacts added yet.</p>';
    return;
  }

  list.forEach((c, i) => {
    const el = document.createElement("div");
    el.className = "flex items-center justify-between p-3 border rounded";
    el.innerHTML = `<div><div class="font-semibold">${c.name}</div><div class="text-sm text-slate-500">${c.phone}</div></div>
      <div class="flex gap-2">
        <button data-index="${i}" class="callBtn text-sm px-3 py-1 bg-green-500 text-white rounded">Call</button>
        <button data-index="${i}" class="delBtn text-sm px-3 py-1 bg-red-500 text-white rounded">Delete</button>
      </div>`;
    contactList.appendChild(el);
  });

  
  document.querySelectorAll(".callBtn").forEach(btn => {
    btn.onclick = (e) => {
      const idx = +e.target.dataset.index;
      const contacts = loadLocalContacts();
      const p = contacts[idx].phone;
      window.open(`tel:${p}`, "_self");
    };
  });

  document.querySelectorAll(".delBtn").forEach(btn => {
    btn.onclick = (e) => {
      const idx = +e.target.dataset.index;
      const list = loadLocalContacts();
      list.splice(idx, 1);
      saveLocalContacts(list);
    };
  });
}


if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    if (!name || !phone) return alert("Enter name & phone");

    const contacts = loadLocalContacts();
    contacts.push({ name, phone });
    saveLocalContacts(contacts);

    
    try {
      await addDoc(collection(db, "contacts"), { name, phone, createdAt: new Date().toISOString() });
    } catch (err) {
      console.warn("Failed to store contact in Firestore:", err.message);
    }

    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
  });

  
  if (contactList) {
    renderContacts();
}
}
