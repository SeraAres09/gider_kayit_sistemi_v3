'use server'

import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID
const CLIENT_EMAIL = process.env.GOOGLE_SHEETS_CLIENT_EMAIL
const PRIVATE_KEY = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n')

if (!SPREADSHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
  throw new Error('Google Sheets credentials are missing')
}

export async function kaydetGider(giderData) {
  console.log('kaydetGider function called with data:', giderData)
  try {
    console.log('Creating JWT with:', { CLIENT_EMAIL, PRIVATE_KEY: PRIVATE_KEY?.substring(0, 20) + '...' })
    const jwt = new JWT({
      email: CLIENT_EMAIL,
      key: PRIVATE_KEY,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    console.log('JWT created, attempting to load spreadsheet')
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, jwt)
    await doc.loadInfo()
    console.log('Spreadsheet loaded successfully')

    const sheet = doc.sheetsByTitle['Harcamalar']
    if (!sheet) {
      throw new Error('Harcamalar sayfası bulunamadı')
    }
    console.log('Harcamalar sheet found')

    const kayitZamani = new Date().toISOString()

    console.log('Adding row with data:', {
      Tarih: giderData.tarih,
      'Harcama Yeri': giderData.harcamaYeri,
      'Harcama Turu': giderData.harcamaTuru,
      Tutar: giderData.tutar,
      'Harcamayi Yapan': giderData.harcamaYapan,
      Not: giderData.not,
      'Kayit Zamani': kayitZamani,
    })
    console.log('Attempting to add row')
    await sheet.addRow({
      Tarih: giderData.tarih,
      'Harcama Yeri': giderData.harcamaYeri,
      'Harcama Turu': giderData.harcamaTuru,
      Tutar: giderData.tutar,
      'Harcamayi Yapan': giderData.harcamaYapan,  // Fixed the column name here
      Not: giderData.not,
      'Kayit Zamani': kayitZamani,
    })
    console.log('Row added successfully')

    console.log('Gider kaydedildi:', giderData)
    return { ...giderData, kayitZamani }
  } catch (error) {
    console.error('Gider kaydedilirken hata oluştu:', error)
    throw error
  }
}

