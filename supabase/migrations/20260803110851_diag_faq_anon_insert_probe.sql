-- Gecici tani policy'si: submissions'daki anon insert sorununun bu tabloya
-- ozel mi yoksa proje genelinde mi oldugunu anlamak icin. Test sonrasi
-- kaldirilacak, faq tablosunun kalici davranisini degistirmez.
create policy "diag_faq_anon_insert" on faq for insert to anon with check (true);
