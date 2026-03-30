# 📧 Easter Eggs Email Collection - PHP Setup

## 🚀 Setup

**Nimic de instalat!** Doar upload fișierele pe webhost.

---

## 📁 Storage

Emailurile sunt salvate în **`emails.json`** în folder-ul site-ului.

**Format:**
```json
[
  {
    "id": 1,
    "email": "user@example.com",
    "created_at": "2026-03-29T10:30:00+00:00",
    "reward": null
  }
]
```

---

## 🛠️ Fișiere necesare

- ✅ `index.html` - Site-ul tău (deja modificat)
- ✅ `save-email.php` - Script PHP care salvează emailurile
- ✅ `emails.json` - Se creează automat la prima trimitere
- ✅ `js/main.js` - Frontend (deja modificat)
- ✅ `css/style.css` - Stiluri (deja modificat)

---

## 📊 Workflow

1. User intră pe site și vede formul de email
2. Introduce emailul → se trimite la `save-email.php`
3. PHP scriptul salvează în `emails.json`
4. User vede Easter eggs game
5. Tu accesezi `emails.json` direct din FTP/cPanel pentru a vedea emailurile

---

## 📤 Upload pe Webhost

### Via FTP:
- Conectează-te cu FileZilla/Cyberduck
- Upload toate fișierele `.html`, `.js`, `.css`, `.php`
- `emails.json` se creează automat

### Via cPanel File Manager:
- Intră în File Manager
- Upload fișierele

### Via Git/SSH:
- `git clone` repo
- Push-ezi doar fișierele necesare

---

## 🔍 Vizualizare emailuri

### Cel mai ușor: Via FTP
1. Deschide FileZilla
2. Navighează la folder-ul site-ului
3. Download `emails.json`
4. Deschide cu text editor

---

## ⚙️ Configurare

**Path-ul scripting-ului:** `/save-email.php`

Dacă hosting-ul cere alt path, editează în `js/main.js` linia cu `fetch('/save-email.php'`

---

## ✅ Checklist Deploy

- [ ] Upload `save-email.php`
- [ ] Upload `index.html` (modificat)
- [ ] Upload `js/main.js` (modificat)
- [ ] Upload `css/style.css` (modificat)
- [ ] Test formul email pe live site
- [ ] Verifica `emails.json` prin FTP

---

## 🚨 Troubleshooting

**"Permission denied" la emails.json**
- Via FTP: Click dreapta pe fișier → Permissions → 666
- Via cPanel: File Manager → Change Permissions → 666

**"emails.json nu se creează"**
- Verifica permisiuni folderului (755)
- Încearcă să creezi manual fișierul: `[]`

**"White page / Error 500"**
- Verifica dacă PHP e activat pe hosting
- Verifica PHP version (trebuie 7.0+)

---

Made with ❤️ for Raised.ro
