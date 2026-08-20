# Callout — Setup Guide

This turns the prototype into a real, working site: real sign-ups, real
callouts saved to a database, and a dashboard to manage the site's photos.

You'll do a **one-time, ~10 minute setup** on Supabase (free, no card
needed). After that, everything just works when you upload the files to
GitHub Pages.

---

## Step 1 — Create your Supabase project

1. Go to https://supabase.com → **Start your project** → sign up (free)
2. **New project** → give it any name (e.g. "callout") → set a database
   password (save it somewhere, you likely won't need it again) → choose
   the region closest to Scotland (e.g. "West EU") → **Create project**
3. Wait ~2 minutes while it provisions

## Step 2 — Run the database schema

1. In your new project, go to **SQL Editor** (left sidebar)
2. **New query**
3. Open `sql/schema.sql` from this project, copy all of it, paste it in
4. Click **Run**
5. You should see "Success. No rows returned" — that means it worked

## Step 3 — Create the two storage buckets

1. Go to **Storage** (left sidebar)
2. **New bucket** → name it exactly `site-images` → toggle **Public
   bucket** ON → Create
3. **New bucket** again → name it exactly `callout-photos` → toggle
   **Public bucket** ON → Create

## Step 4 — Turn off email confirmation (important for a demo)

By default Supabase makes new users click a confirmation link in their
email before they can log in. For a demo you're showing someone live,
turn this off so sign-up works instantly:

1. Go to **Authentication → Providers → Email**
2. Toggle **Confirm email** OFF
3. Save

(You can turn this back on later for a real launch — you'd also want a
real "from" email address set up at that point.)

## Step 5 — Copy your keys into the project

1. Go to **Project Settings → API**
2. Copy the **Project URL**
3. Copy the **anon public** key (NOT the "service_role" key — never put
   that one in a public website)
4. Open `assets/supabase-config.js` in this project and paste them in:

```js
const SUPABASE_URL = 'https://xxxxxxxxxxxx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOi...';
```

## Step 6 — Upload everything to GitHub Pages

Same as before — upload the contents of the `callout` folder to your
repo (root-level `index.html`, `assets/`, etc.) and make sure GitHub
Pages is enabled.

## Step 7 — Make yourself the admin

The image-management dashboard (`admin.html`) is locked to admins only.
To unlock it:

1. On your live site, sign up for a normal account (customer or trade,
   doesn't matter which)
2. Back in Supabase: **Table Editor → profiles**
3. Find your row → click into the `role` cell → change it to `admin`
   → save
4. Log out and back in on your site, then visit `/admin.html`

---

## What's real now vs. what's still a placeholder

**Real:**
- Sign up / log in (actual accounts, actual passwords, stored securely by Supabase)
- Submitting a callout (saved to a real database, with your uploaded photo)
- The customer dashboard (shows your actual submitted callouts)
- The tradesperson dashboard (shows real open callouts; accepting one
  actually claims it so no other engineer can also accept it)
- The admin image dashboard (uploads real photos, replacing the
  placeholder ones sitewide instantly)

**Still simplified / not yet real:**
- Matching is manual — any signed-in tradesperson can see and accept
  any open callout, rather than the system automatically routing by
  postcode/service coverage. That routing logic is a next step once
  you have real trade coverage data to match against.
- No payments, no SMS/email notifications when a job is accepted —
  both are realistic next additions once you're ready to actually launch.
- The chatbot on the homepage is still a separate, disconnected demo —
  it doesn't yet save into the same database as the form. Wiring it up
  is straightforward once you decide which one you want to keep.

## If something doesn't work

- **"Failed to fetch" or nothing loads:** double check
  `assets/supabase-config.js` has your real URL and key, not the
  placeholder text.
- **Sign up succeeds but profile info doesn't save:** almost always
  means email confirmation is still ON (Step 4).
- **Images don't update on the live site:** hard-refresh the page
  (or open in a private/incognito tab) — browsers cache images
  aggressively.
