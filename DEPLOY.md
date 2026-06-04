# 🚀 Deploy NHGroup Web → Vercel

## Pasos rápidos

### 1. Instalar dependencias localmente
```bash
cd nhgroup-web
npm install
```

### 2. Probar en local
```bash
npm run dev
# Abre http://localhost:3000
```

### 3. Subir a GitHub
```bash
git init
git add .
git commit -m "NHGroup web 2026"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/nhgroup-web.git
git push -u origin main
```

### 4. Deploy en Vercel
1. Ve a **vercel.com** → "Add New Project"
2. Importa el repo de GitHub
3. Framework: **Next.js** (auto-detectado)
4. Click **Deploy**

### 5. Dominio personalizado
En Vercel → Settings → Domains → agrega `nhgroup.com.mx`

Apunta en tu DNS:
- `A` record → `76.76.21.21`
- `CNAME www` → `cname.vercel-dns.com`

---

## Estructura del proyecto

```
nhgroup-web/
├── app/
│   ├── layout.tsx      # Meta tags, fuentes
│   ├── page.tsx        # Página principal
│   └── globals.css     # Estilos base
├── components/
│   ├── Navbar.tsx      # Navegación animada
│   ├── Hero.tsx        # Hero con stats
│   ├── Services.tsx    # 8 servicios grid
│   ├── About.tsx       # Filosofía / nosotros
│   ├── Process.tsx     # 3 pasos sin sorpresas
│   ├── Contact.tsx     # WhatsApp + Email CTA
│   └── Footer.tsx      # Footer
├── package.json
├── tailwind.config.ts
├── next.config.mjs
└── tsconfig.json
```
