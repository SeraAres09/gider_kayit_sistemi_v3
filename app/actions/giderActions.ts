'use server'

import { GoogleSpreadsheet } from 'google-spreadsheet'

// Google Sheets API anahtarınızı ve döküman ID'nizi buraya ekleyin
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID'
const CLIENT_EMAIL = 'YOUR_CLIENT_EMAIL'
const PRIVATE_KEY = 'YOUR_PRIVATE_KEY'

export async function kaydetGider(giderData) {
  try {
    // Bu kısımda gerçek Google Sheets entegrasyonu yapılacak
    // Şimdilik sadece veriyi döndürüyoruz
    console.log('Gider kaydedildi:', giderData)
    return giderData
  } catch (error) {
    console.error('Gider kaydedilirken hata oluştu:', error)
    throw error
  }
}

