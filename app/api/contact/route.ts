import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body
    if (!name || !email) return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 })

    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;

    if (googleScriptUrl) {
      // Send to Google Sheet via Apps Script Web App
      const response = await fetch(googleScriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, timestamp: new Date().toISOString() })
      });

      if (!response.ok) {
        throw new Error('Failed to save to Google Sheets');
      }

      return NextResponse.json({ ok: true });
    }

    // Fallback to local CSV if no Google Script URL is provided
    const dataDir = path.join(process.cwd(), 'data')
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir)
    const filePath = path.join(dataDir, 'contacts.csv')

    const exists = fs.existsSync(filePath)
    const header = 'timestamp,name,email,message\n'
    const line = `${new Date().toISOString()},"${name.replace(/"/g, '""')}","${email.replace(/"/g, '""')}","${(message||'').replace(/"/g, '""')}"\n`

    if (!exists) fs.writeFileSync(filePath, header + line)
    else fs.appendFileSync(filePath, line)

    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 })
  }
}
