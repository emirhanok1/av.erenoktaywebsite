import React from 'react'
import { TrustCounter } from './TrustCounter'

export default function TrustBar() {
  return (
    <section className="bg-white border-b border-gray-200 py-10" aria-label="Büromuzun Öne Çıkan Değerleri">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          <div className="pt-4 md:pt-0 border-t-0">
            <TrustCounter end={18} suffix="+" label="Yıllık Tecrübe" />
          </div>
          <div className="pt-4 md:pt-0">
            <TrustCounter end={500} suffix="+" label="Tamamlanan Dava" />
          </div>
          <div className="pt-4 md:pt-0 border-t-0 md:border-l">
            <TrustCounter end={12} label="Uzmanlık Alanı" />
          </div>
          <div className="pt-4 md:pt-0">
            {/* Note: "7/24" includes a slash and text, so treating it slightly different or just using end={7} suffix="/24" */}
            <TrustCounter end={7} suffix="/24" label="Müvekkil Desteği" />
          </div>
        </div>
      </div>
    </section>
  )
}
