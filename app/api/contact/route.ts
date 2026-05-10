import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body
    if (!name || !email) return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 })

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
