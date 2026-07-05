# Blog Engine Form Portal

A custom form portal that submits user input to **n8n Form Trigger** workflows. Users fill forms in this app; submissions are forwarded as `multipart/form-data` to your n8n production URL.

## How it works

```
User → Form Portal (Next.js) → API Route → n8n Form Trigger → Your workflow
```

n8n's Form Trigger expects fields named `field-0`, `field-1`, `field-2`, etc., matching the **order** of fields in your n8n Form Trigger node.

## Quick start

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure your n8n URL**

   Copy `.env.example` to `.env.local` and set your production Form Trigger URL:

   ```env
   N8N_BLOG_FORM_URL=https://your-n8n.com/form/blog-submission
   ```

   Get this URL from n8n: open your workflow → Form Trigger node → switch to **Production URL** → copy the URL. Make sure the workflow is **saved and active**.

3. **Match form fields to n8n**

   Edit `src/config/forms.ts`. Each field's `key` must match the n8n field index:

   | Portal field key | n8n Form Trigger field |
   |------------------|------------------------|
   | `field-0`        | 1st field in the node   |
   | `field-1`        | 2nd field in the node  |
   | `field-2`        | 3rd field in the node  |

   Field **types** and **order** should match what you configured in n8n (text, email, dropdown, file, etc.).

4. **Run the app**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Adding more forms

Add entries to the `forms` array in `src/config/forms.ts`:

```typescript
{
  slug: "contact",
  title: "Contact Us",
  n8nUrl: process.env.N8N_CONTACT_FORM_URL ?? "",
  fields: [
    { key: "field-0", label: "Name", type: "text", required: true },
    { key: "field-1", label: "Message", type: "textarea", required: true },
  ],
}
```

Each form gets its own page at `/forms/{slug}`.

## n8n setup checklist

- [ ] Form Trigger node added as workflow start
- [ ] Fields configured in the same order as `src/config/forms.ts`
- [ ] Workflow saved and **activated** (for production URL)
- [ ] Production URL copied into `.env.local`
- [ ] If using Basic Auth on the Form Trigger, set `N8N_BASIC_AUTH_USER` and `N8N_BASIC_AUTH_PASSWORD`

## Supported field types

| Type       | n8n equivalent   |
|------------|------------------|
| `text`     | Text             |
| `email`    | Email            |
| `number`   | Number           |
| `password` | Password         |
| `textarea` | Textarea         |
| `date`     | Date             |
| `dropdown` | Dropdown         |
| `radio`    | Radio Buttons    |
| `checkbox` | Checkboxes       |
| `file`     | File             |
| `hidden`   | Hidden Field     |

## Alternative: Webhook Trigger

If you prefer sending JSON with custom field names instead of matching `field-N` indices, replace the Form Trigger with a **Webhook** node in n8n and adjust the API route to POST JSON. The Form Trigger approach keeps your existing form node workflow intact.

## Tech stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
