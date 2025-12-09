# ElastiX — Prototype: Price Elasticity in RFM Segments

Short description
ElastiX is a lightweight frontend prototype to explore price elasticity per RFM customer segments. It visualizes segment-product relations and supports interactive "what-if" price simulations. Backend (FastAPI) is assumed separate.

Status

- Frontend scaffold ready (React + TypeScript, Vite). Core grid/chart components implemented.
- Backend integration pending — mock responses recommended for local work.

Tech stack

- Frontend: React, TypeScript, Vite
- State/API: Redux Toolkit + RTK Query
- UI: AG Grid, AG Charts
- Backend (separate): FastAPI, PostgreSQL

Quickstart

1. git clone https://github.com/Mert-55/elastix.git
2. cd elastix/frontend
3. npm install
4. npm run dev (open http://localhost:5173)

Expected backend endpoints

- GET /elasticity — list elasticity results (stock_code, elasticity, r_squared, sample_size, avg_price, total_quantity)
- POST /simulate — simulate impact for { stock_code, price_change_percent }

Next steps

- Finalize API contracts and integrate
- Complete simulator logic and error handling
- Add tests and UX polish

Author / Contact
Maintainer: @Mert-55 — open an issue or PR for questions.

License
See LICENSE (or default to MIT-like for the prototype).
