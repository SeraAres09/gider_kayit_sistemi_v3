'use client'

import { useState } from 'react'
import { kaydetGider } from '../actions/giderActions'

const harcamaYerleri = ['Market', 'Yakıt', 'Gübre', 'Nalbur', 'Demirbaş', 'Diğer']
const harcamaTurleri = ['Nakit', 'Havale', 'Kredi Kartı', 'Borç']
const harcamaYapanlar = ['LH', 'SH', 'ÜD', 'EB', 'MCH', 'Diğer']

export default function GiderKayitFormu() {
  const [formData, setFormData] = useState({
    tarih: '',
    harcamaYeri: '',
    harcamaTuru: '',
    tutar: '',
    harcamaYapan: '',
    not: ''
  })
  const [kayitlar, setKayitlar] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const yeniKayit = await kaydetGider(formData)
      setKayitlar(prevKayitlar => [...prevKayitlar, yeniKayit])
      setFormData({
        tarih: '',
        harcamaYeri: '',
        harcamaTuru: '',
        tutar: '',
        harcamaYapan: '',
        not: ''
      })
    } catch (error) {
      console.error('Kayıt hatası:', error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="tarih" className="block">Tarih:</label>
          <input
            type="date"
            id="tarih"
            name="tarih"
            value={formData.tarih}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="harcamaYeri" className="block">Harcama Yeri:</label>
          <select
            id="harcamaYeri"
            name="harcamaYeri"
            value={formData.harcamaYeri}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="">Seçiniz</option>
            {harcamaYerleri.map(yer => (
              <option key={yer} value={yer}>{yer}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="harcamaTuru" className="block">Harcama Türü:</label>
          <select
            id="harcamaTuru"
            name="harcamaTuru"
            value={formData.harcamaTuru}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="">Seçiniz</option>
            {harcamaTurleri.map(tur => (
              <option key={tur} value={tur}>{tur}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="tutar" className="block">Tutar:</label>
          <input
            type="number"
            id="tutar"
            name="tutar"
            value={formData.tutar}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="harcamaYapan" className="block">Harcamayı Yapan:</label>
          <select
            id="harcamaYapan"
            name="harcamaYapan"
            value={formData.harcamaYapan}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="">Seçiniz</option>
            {harcamaYapanlar.map(kisi => (
              <option key={kisi} value={kisi}>{kisi}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="not" className="block">Not:</label>
          <textarea
            id="not"
            name="not"
            value={formData.not}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          ></textarea>
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Kaydet
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Kayıtlar</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harcama Yeri</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harcama Türü</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tutar</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harcamayı Yapan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Not</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {kayitlar.map((kayit, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{kayit.tarih}</td>
                <td className="px-6 py-4 whitespace-nowrap">{kayit.harcamaYeri}</td>
                <td className="px-6 py-4 whitespace-nowrap">{kayit.harcamaTuru}</td>
                <td className="px-6 py-4 whitespace-nowrap">{kayit.tutar}</td>
                <td className="px-6 py-4 whitespace-nowrap">{kayit.harcamaYapan}</td>
                <td className="px-6 py-4 whitespace-nowrap">{kayit.not}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

