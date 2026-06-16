# Shopify Theme Dev Server Startup

## Quick Start

You now have two ways to start the dev server with automatic port cleanup:

### Option 1: Double-Click (Easiest)

1. Open File Explorer
2. Navigate to this directory
3. Double-click **`start-dev.bat`**
4. A terminal window will open and start the dev server on port 9293
5. Wait for the "Preview your theme" message
6. Access your theme at: http://localhost:9293

### Option 2: PowerShell Terminal

```powershell
.\start-dev.ps1
```

Or with a custom port:

```powershell
.\start-dev.ps1 -Port 9295
```

## What These Scripts Do

- **Automatically detects** if port 9293 is already in use
- **Kills any existing process** blocking the port (like a previous dev server)
- **Starts fresh** Shopify theme dev server on the specified port
- **No manual intervention needed** — just run and go

## Files Created

- `start-dev.ps1` — PowerShell script (cross-platform compatible)
- `start-dev.bat` — Windows batch wrapper for easy launching

## Troubleshooting

**Script won't run in PowerShell?**

- Right-click PowerShell → "Run as Administrator"
- Or use the `.bat` file instead (it handles permissions)

**Port still in use after running script?**

- Check if the script output shows "[!] Port 9293 is already in use"
- Make sure the process was killed before running again

**Dev server not accessible?**

- Verify your firewall isn't blocking port 9293
- Check the terminal output for any error messages
- Try a different port: `.\start-dev.ps1 -Port 9295`

## Next Time

Just run `start-dev.bat` (or the `.ps1` script) and you're done! No need to ask for help with port conflicts again.
