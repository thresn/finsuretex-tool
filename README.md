# FinsureTex Tool

A simple CSV editing tool: upload CSV → view in table → edit row in modal → export CSV.

## Requirements
- Node.js 18.x or 20.x recommended (dev used: Node 20)
- npm 9+
- Windows, macOS, or Linux

Check versions:
```bash
node -v
npm -v
```

## Setup
```bash
cd finsuretex-tool
npm install
```

## Development
```bash
npm run dev
```
Then open `http://localhost:3000`.

## Build
```bash
npm run build
npm start
```

## Format / Lint
```bash
# Prettier (format)
npm run format

# ESLint (if available)
npm run lint -- --fix
```

## Initial Roadmap (thought process)
Planned order at project start:
1) CSV upload and parsing (core data flow)(Bitti)
2) Table render and row detail editing (MVP usability)(Bitti)
3) CSV export (complete end-to-end)(Bitti)
4) Usability: readable font, table/modal styles, color palette(Bitti)
5) Useful features: long-text handling, search(Bitti)
6) Cleanup: stable keys, small UX tweaks(Bitti)
7) (Future) Column filters, pagination/virtualization

## Roadmap & Status
- Core flow: CSV upload + parsing → Table + row editing → CSV export 
- Usability: readable typography, table/modal styles, color palette 
- Convenience: long-text clamping, file chooser UX, global search 
- Code quality: stable keys, clearer IF-based rendering 
- Next up: column filters, pagination/virtualization

## Tech
- Next.js 13+
- TypeScript
- Lightweight CSS (`src/app/globals.css`)
