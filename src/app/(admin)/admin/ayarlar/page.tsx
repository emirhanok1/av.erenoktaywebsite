import SiteSettingsForm from '@/features/admin/components/SiteSettingsForm'
import { getAdminSiteSettings } from '@/services/site-settings'

export const metadata = {
  title: 'Ayarlar | Admin',
}

export default async function AdminSettingsPage() {
  const settings = await getAdminSiteSettings()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Ayarlar</h1>
        <p className="text-muted-foreground">Hakkımızda sayfasında görünen avukat fotoğrafını güncelleyin.</p>
      </div>

      <div className="p-6 border rounded-md bg-white">
        <SiteSettingsForm currentPhotoUrl={settings.attorney_photo_url} />
      </div>
    </div>
  )
}
