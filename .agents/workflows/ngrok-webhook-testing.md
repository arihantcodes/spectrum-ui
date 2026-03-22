---
description: how to test Dodo Payments webhooks locally using ngrok
---

To test the end-to-end payment flow (checkout -> webhook -> repo access) on your local machine, follow these steps:

### 1. Start your local server
Run the development server:
```bash
npm run dev
# or 
bun dev
```
Ensure it's running on port `3000`.

### 2. Start ngrok
Expose your local port to the internet:
```bash
ngrok http 3000
```
Copy the **Forwarding** URL (e.g., `https://a1b2-c3d4.ngrok-free.app`).

### 3. Configure Dodo Payments Dashboard
1. Go to the [Dodo Payments Dashboard](https://app.dodopayments.com).
2. Ensure you are in **Test Mode**.
3. Navigate to **Developers** -> **Webhooks**.
4. Click **Add Webhook** (or edit existing).
5. Set the **Webhook URL** to your ngrok URL + `/api/webhook`:
   `https://a1b2-c3d4.ngrok-free.app/api/webhook`
6. Select the `payment.succeeded` event.
7. **Copy the Webhook Secret**.

### 4. Update Local Environment
Paste the secret into your `.env.local` file:
```env
DODO_PAYMENTS_WEBHOOK_SECRET=whsec_...
```

### 5. Verify and Test
- **Check Connectivity**: Use the "Send Test Webhook" button in the Dodo dashboard to verify your local endpoint receives the payload.
- **Full Purchase**: Perform a test purchase on `localhost:3000` and watch your server logs to see the webhook grant repository access!

> [!TIP]
> You can inspect incoming webhook requests and responses at `http://127.0.0.1:4040` (the ngrok web UI).

### Handling Google OAuth & ngrok
If you find that Google OAuth doesn't like your ngrok URL, **you don't need to use the ngrok URL for auth**.
- Keep your **`NEXTAUTH_URL`** set to `http://localhost:3000`.
- Perform your checkout on `http://localhost:3000`.
- In the Dodo Dashboard:
    - Set the **Webhook URL** to the ngrok address (e.g., `https://[id].ngrok-free.app/api/webhook`).
    - Set the **Return URL** to `http://localhost:3000/dashboard`.

This setup allows webhooks to hit your machine via ngrok, while your user session remains on `localhost` where Google OAuth works perfectly.
