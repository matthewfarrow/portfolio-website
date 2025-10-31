# Domain Setup Instructions for mattfarrow.xyz

## Current Status
- ✅ Domain added to Vercel: `mattfarrow.xyz`
- ❌ Nameservers not yet updated (still pointing to Namecheap)

## Step-by-Step Instructions

### 1. Namecheap Configuration

1. Log into [Namecheap](https://www.namecheap.com)
2. Go to **Domain List** → Click **Manage** on `mattfarrow.xyz`
3. Click the **Advanced DNS** tab
4. Find the **NAMESERVERS** section (top of page)
5. Change from **"Namecheap BasicDNS"** to **"Custom DNS"**
6. Enter these nameservers:
   - **Nameserver 1:** `ns1.vercel-dns.com`
   - **Nameserver 2:** `ns2.vercel-dns.com`
7. Click the **green checkmark** to save

### 2. Wait for DNS Propagation
- Usually takes 5-30 minutes
- Can take up to 48 hours in some cases
- Vercel will send you an email when it's ready

### 3. Verify Configuration

Run this command to check:
```bash
vercel domains inspect mattfarrow.xyz
```

When working correctly, you'll see:
- ✅ Status: "Valid Configuration"
- Current Nameservers match Intended Nameservers

## Alternative Method (If nameservers don't work)

If you prefer to keep Namecheap nameservers, you can add an A record instead:
- **Type:** A Record
- **Host:** `@`
- **Value:** `76.76.21.21`
- **TTL:** Automatic

And a CNAME for www:
- **Type:** CNAME Record
- **Host:** `www`
- **Value:** `cname.vercel-dns.com.`
- **TTL:** Automatic

But the nameserver method is recommended as it's simpler and more reliable.

