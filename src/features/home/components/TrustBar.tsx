import React from 'react'
import { TrustCounter } from './TrustCounter'

export default function TrustBar() {
  return (
    <section className="bg-white border-b border-border" aria-label="Büromuzun Öne Çıkan Değerleri">
      <div className="container mx-auto px-0">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          <div className="px-8 py-10 first:pl-0">
            <TrustCounter end={18} suffix="+" label="Yıllık Tecrübe" />
          </div>
          <div className="px-8 py-10 first:pl-0">
            <TrustCounter end={500} suffix="+" label="Çözüme Kavuşan Dava" />
          </div>
          <div className="px-8 py-10 first:pl-0">
            <TrustCounter end={12} label="Uzmanlık Alanı" />
          </div>
          <div className="px-8 py-10 first:pl-0">
            <TrustCounter end={7} suffix="/24" label="Müvekkil Desteği" />
          </div>
        </div>
      </div>
    </section>
  )
}
