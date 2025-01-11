'use server'

import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID
const CLIENT_EMAIL = process.env.GOOGLE_SHEETS_CLIENT_EMAIL
const PRIVATE_KEY = process.env.GOOGLE_SHEETS_PRIVATE_KEY

if (!SPREADSHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
  throw new Error('Google Sheets credentials are missing')
}

export async function kaydetGider(giderData) {
  try {
    const jwt = new JWT({
      email: CLIENT_EMAIL,
      key: PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, jwt)
    await doc.loadInfo()

    const sheet = doc.sheetsByTitle['Harcamalar']
    if (!sheet) {
      throw new Error('Harcamalar sayfası bulunamadı')
    }

    const kayitZamani = new Date().toISOString()

    await sheet.addRow({
      Tarih: giderData.tarih,
      'Harcama Yeri': giderData.harcamaYeri,
      'Harcama Turu': giderData.harcamaTuru,
      Tutar: giderData.tutar,
      Not: giderData.not,
      'Kayıt Zamanı': kayitZamani,
    })

    console.log('Gider kaydedildi:', giderData)
    return { ...giderData, kayitZamani }
  } catch (error) {
    console.error('Gider kaydedilirken hata oluştu:', error)
    throw error
  }
}

