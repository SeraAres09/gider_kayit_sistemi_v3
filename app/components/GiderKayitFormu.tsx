'use client'

import { useState } from 'react'
import { kaydetGider } from '../actions/giderActions'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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
    <div className="max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Gider Kayıt Girişi</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Harcama Yeri
                </label>
                <Select
                  value={formData.harcamaYeri}
                  onValueChange={(value) => handleSelectChange(value, 'harcamaYeri')}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seçiniz" />
                  </SelectTrigger>
                  <SelectContent>
                    {harcamaYerleri.map(yer => (
                      <SelectItem key={yer} value={yer}>
                        {yer}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Harcama Türü
                </label>
                <Select
                  value={formData.harcamaTuru}
                  onValueChange={(value) => handleSelectChange(value, 'harcamaTuru')}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seçiniz" />
                  </SelectTrigger>
                  <SelectContent>
                    {harcamaTurleri.map(tur => (
                      <SelectItem key={tur} value={tur}>
                        {tur}
                      </SelectItem>
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
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Harcamayı Yapan
                </label>
                <Select
                  value={formData.harcamaYapan}
                  onValueChange={(value) => handleSelectChange(value, 'harcamaYapan')}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seçiniz" />
                  </SelectTrigger>
                  <SelectContent>
                    {harcamaYapanlar.map(kisi => (
                      <SelectItem key={kisi} value={kisi}>
                        {kisi}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label htmlFor="not" className="text-sm font-medium">
                  Not
                </label>
                <Textarea
                  id="not"
                  name="not"
                  value={formData.not}
                  onChange={handleChange}
                  placeholder="Açıklama ekleyin..."
                  className="min-h-[100px]"
                />
              </div>
            </div>

            <div className="flex justify-center">
              <Button type="submit" className="w-full md:w-1/3">
                Kaydet
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Son Kayıtlar</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tarih</TableHead>
                <TableHead>Harcama Yeri</TableHead>
                <TableHead>Harcama Türü</TableHead>
                <TableHead>Tutar</TableHead>
                <TableHead>Harcamayı Yapan</TableHead>
                <TableHead>Not</TableHead>
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
                  <TableCell className="max-w-[200px] truncate">{kayit.not}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

