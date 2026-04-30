// script.js

document.addEventListener('DOMContentLoaded', function() {
    console.log("📌 Script caricato");

    // --- REGISTER FORM ---
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log("📌 Submit Registrazione");

            const username = document.getElementById('regUsername').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (!username || !email || !password || !confirmPassword) {
                alert('Tutti i campi sono obbligatori.');
                return;
            }
            if (password !== confirmPassword) {
                alert('Le password non corrispondono.');
                return;
            }
            if (password.length < 6) {
                alert('La password deve essere di almeno 6 caratteri.');
                return;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const existingUser = users.find(user => user.username === username || user.email === email);
            if (existingUser) {
                alert('Username o email già registrati.');
                return;
            }

            users.push({ username, email, password });
            localStorage.setItem('users', JSON.stringify(users));

            alert('Registrazione completata! Ora puoi accedere.');
            window.location.href = 'login.html';
        });
    }

    // --- LOGIN FORM ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log("📌 Submit Login");

            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;

            if (!username || !password) {
                alert('Inserisci username/email e password.');
                return;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => (u.username === username || u.email === username) && u.password === password);

            if (user) {
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                console.log("✅ Login effettuato:", user);
                alert('✅ Accesso Effettuato! Benvenuto ' + user.username);
                window.location.href = 'index.html';
            } else {
                alert('Credenziali non valide.');
            }
        });
    }

    // --- NAV UPDATE ---
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        const navUl = document.querySelector('nav ul') || document.getElementById('navMenu');
        if (navUl) {
            navUl.innerHTML = `
                <li><a href="index.html">🏠 Home</a></li>
                <li><a href="account-settings.html">⚙️ Impostazioni (${loggedInUser.username})</a></li>
                <li><a href="info.html">💡 Informazioni</a></li>
                <li><a href="#" id="logout">Logout</a></li>
            `;
            document.getElementById('logout').addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('loggedInUser');
                location.reload();
            });
        }
    }

    // --- ACCOUNT SETTINGS ---
    if (window.location.pathname.includes('account-settings.html')) {
        console.log("📌 Account Settings Page");

        if (!loggedInUser) {
            alert('Devi essere loggato per accedere a questa pagina.');
            window.location.href = 'login.html';
            return;
        }

        document.getElementById('displayUsername').textContent = loggedInUser.username;
        document.getElementById('displayEmail').textContent = loggedInUser.email;
        document.getElementById('confirmUsername').textContent = loggedInUser.username;

        // --- CHANGE PASSWORD ---
        const changePasswordForm = document.getElementById('changePasswordForm');
        if (changePasswordForm) {
            changePasswordForm.addEventListener('submit', function(e) {
                e.preventDefault();
                console.log("📌 Cambio Password");

                const currentPassword = document.getElementById('currentPassword').value;
                const newPassword = document.getElementById('newPassword').value;
                const confirmNewPassword = document.getElementById('confirmNewPassword').value;

                if (!currentPassword || !newPassword || !confirmNewPassword) {
                    alert('Tutti i campi sono obbligatori.');
                    return;
                }

                if (currentPassword !== loggedInUser.password) {
                    alert('La password attuale è errata.');
                    return;
                }

                if (newPassword !== confirmNewPassword) {
                    alert('Le nuove password non corrispondono.');
                    return;
                }

                if (newPassword.length < 6) {
                    alert('La nuova password deve essere di almeno 6 caratteri.');
                    return;
                }

                if (newPassword === currentPassword) {
                    alert('La nuova password deve essere diversa da quella attuale.');
                    return;
                }

                let users = JSON.parse(localStorage.getItem('users')) || [];
                const userIndex = users.findIndex(u => u.username === loggedInUser.username);
                if (userIndex !== -1) {
                    users[userIndex].password = newPassword;
                    localStorage.setItem('users', JSON.stringify(users));
                    loggedInUser.password = newPassword;
                    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
                    alert('Password aggiornata con successo!');
                    changePasswordForm.reset();
                } else {
                    alert('Errore: utente non trovato.');
                }
            });
        }

        // --- CHANGE NICKNAME ---
        const changeNicknameForm = document.getElementById('changeNicknameForm');
        if (changeNicknameForm) {
            changeNicknameForm.addEventListener('submit', function(e) {
                e.preventDefault();
                console.log("📌 Cambio Nickname");

                const newNickname = document.getElementById('newNickname').value.trim();
                if (!newNickname) return alert('Il nuovo nickname è obbligatorio.');
                if (newNickname === loggedInUser.username) return alert('Il nuovo nickname deve essere diverso.');

                const users = JSON.parse(localStorage.getItem('users')) || [];
                if (users.find(u => u.username === newNickname)) return alert('Nickname già in uso.');

                const userIndex = users.findIndex(u => u.username === loggedInUser.username);
                if (userIndex !== -1) {
                    users[userIndex].username = newNickname;
                    localStorage.setItem('users', JSON.stringify(users));
                    loggedInUser.username = newNickname;
                    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
                    document.getElementById('displayUsername').textContent = newNickname;
                    document.getElementById('confirmUsername').textContent = newNickname;
                    alert('Nickname aggiornato!');
                    changeNicknameForm.reset();
                } else {
                    alert('Errore: utente non trovato.');
                }
            });
        }

        // --- DELETE ACCOUNT ---
        const deleteAccountBtn = document.getElementById('deleteAccountBtn');
        const deleteConfirmModal = document.getElementById('deleteConfirmModal');
        const confirmUsernameInput = document.getElementById('confirmUsernameInput');
        const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
        const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');

        deleteAccountBtn.addEventListener('click', () => {
            deleteConfirmModal.classList.remove('hidden');
            confirmUsernameInput.value = '';
            confirmDeleteBtn.disabled = true;
        });

        confirmUsernameInput.addEventListener('input', function() {
            confirmDeleteBtn.disabled = this.value.trim() !== loggedInUser.username;
        });

        cancelDeleteBtn.addEventListener('click', () => {
            deleteConfirmModal.classList.add('hidden');
            confirmUsernameInput.value = '';
        });

        confirmDeleteBtn.addEventListener('click', () => {
            if (confirmUsernameInput.value.trim() !== loggedInUser.username) return alert("Username non corrispondente.");
            let users = JSON.parse(localStorage.getItem('users')) || [];
            users = users.filter(u => u.username !== loggedInUser.username);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.removeItem('loggedInUser');
            alert('Account eliminato. Arrivederci!');
            window.location.href = 'index.html';
        });
    } // end account-settings
});