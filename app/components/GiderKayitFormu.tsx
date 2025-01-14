'use client'

import { useState } from 'react'
import { kaydetGider } from '../actions/giderActions'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'

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

  const handleSelectChange = (value: string, name: string) => {
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
    <div className="container mx-auto px-4 py-8 max-w-md">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Gider Kayıt Girişi</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="tarih" className="text-sm font-medium">
                Tarih
              </label>
              <Input
                type="date"
                id="tarih"
                name="tarih"
                value={formData.tarih}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="harcamaYeri" className="text-sm font-medium">
                Harcama Yeri
              </label>
              <Select
                value={formData.harcamaYeri}
                onValueChange={(value) => handleSelectChange(value, 'harcamaYeri')}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seçiniz" />
                </SelectTrigger>
                <SelectContent>
                  {harcamaYerleri.map(yer => (
                    <SelectItem key={yer} value={yer}>{yer}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="harcamaTuru" className="text-sm font-medium">
                Harcama Türü
              </label>
              <Select
                value={formData.harcamaTuru}
                onValueChange={(value) => handleSelectChange(value, 'harcamaTuru')}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seçiniz" />
                </SelectTrigger>
                <SelectContent>
                  {harcamaTurleri.map(tur => (
                    <SelectItem key={tur} value={tur}>{tur}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="tutar" className="text-sm font-medium">
                Tutar
              </label>
              <Input
                type="number"
                id="tutar"
                name="tutar"
                value={formData.tutar}
                onChange={handleChange}
                required
                placeholder="0.00"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="harcamaYapan" className="text-sm font-medium">
                Harcamayı Yapan
              </label>
              <Select
                value={formData.harcamaYapan}
                onValueChange={(value) => handleSelectChange(value, 'harcamaYapan')}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seçiniz" />
                </SelectTrigger>
                <SelectContent>
                  {harcamaYapanlar.map(kisi => (
                    <SelectItem key={kisi} value={kisi}>{kisi}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="not" className="text-sm font-medium">
                Not
              </label>
              <Textarea
                id="not"
                name="not"
                value={formData.not}
                onChange={handleChange}
                placeholder="Açıklama ekleyin..."
                className="min-h-[100px] w-full"
              />
            </div>

            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
              Kaydet
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Bugünün Kayıtları</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tarih</TableHead>
                  <TableHead>Yer</TableHead>
                  <TableHead>Tür</TableHead>
                  <TableHead>Tutar</TableHead>
                  <TableHead>Kişi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {kayitlar.map((kayit, index) => (
                  <TableRow key={index}>
                    <TableCell>{kayit.tarih}</TableCell>
                    <TableCell>{kayit.harcamaYeri}</TableCell>
                    <TableCell>{kayit.harcamaTuru}</TableCell>
                    <TableCell>{kayit.tutar}</TableCell>
                    <TableCell>{kayit.harcamaYapan}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

