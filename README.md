# Shop Away

A server-rendered e-commerce web application built with Node.js, Express, and EJS. 
It connects to the Shopify Storefront API to display products, supports multi-currency 
pricing, and includes a session-based shopping cart.

## Features

- Browse and search products sourced from Shopify
- View individual product detail pages
- Add products to a session-based cart
- Update quantities or remove items from the cart
- Multi-currency support: USD, EUR, and GBP with live exchange rate conversion
- Currency selection persists across pages via session
- Paginated product listing

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Templating:** EJS
- **Session management:** express-session
- **HTTP requests:** node-fetch
- **Styling:** Custom CSS with CSS Variables and Google Fonts
- **API:** Shopify Admin REST API + ExchangeRate API

## Project Structure

```markdown
## Project Structure

```
app.js               # Entry point, Express setup, middleware, routes
routes/
  index.js           # Home page and search
  myProducts.js      # Product listing with pagination
  shopify.js         # Product detail page
  cart.js            # Cart and checkout
utils/
  shopifyApi.js      # Shopify API fetch helpers
  cartUtils.js       # Cart session helpers (add, remove, update)
  currency.js        # Currency conversion and symbol helpers
middleware/
  injectCart.js      # Injects cart into all views
views/
  *.ejs              # EJS templates
  partials/          # Shared header partial
public/
  css/styles.css     # Global styles
  images/            # Static assets
```

## Getting Started

### Prerequisites

- Node.js v18 or higher
- A Shopify store with API access
- An ExchangeRate API key (free tier available at https://www.exchangerate-api.com)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/wdd330-shop-away.git
   cd wdd330-shop-away
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   SHOPIFY_STORE=your-store.myshopify.com
   SHOPIFY_ACCESS_TOKEN=your_shopify_access_token
   EXCHANGE_API_KEY=your_exchange_rate_api_key
   SESSION_SECRET=your_session_secret
   PORT=3001
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Open your browser and visit `http://localhost:3001`

## Environment Variables

| Variable | Description |
|---|---|
| `SHOPIFY_STORE` | Your Shopify store domain |
| `SHOPIFY_ACCESS_TOKEN` | Shopify Admin API access token |
| `EXCHANGE_API_KEY` | ExchangeRate-API key for currency conversion |
| `SESSION_SECRET` | Secret string used to sign session cookies |
| `PORT` | Port to run the server on (defaults to 3001) |

## Notes

- Product prices are always stored in USD internally. Currency conversion
  happens at display time to prevent mixed-currency totals in the cart.
- The `.env` file is excluded from version control. Never commit API keys
  to your repository.
```
