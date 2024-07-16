# Tekno API

Tekno API adalah proyek backend yang menyediakan berbagai endpoint untuk aplikasi Tekno. Proyek ini dibangun menggunakan Node.js dan Express.js.

## Instalasi

Untuk mengkloning dan menjalankan proyek ini secara lokal, ikuti langkah-langkah di bawah ini:

### Prasyarat

- Node.js
- npm
- MySQL

### Langkah-langkah

1. Klon repositori ini:

    ```bash
    git clone https://github.com/ivanyoga01/backend-ivan-yoga.git
    ```

2. Masuk ke direktori proyek:

    ```bash
    cd tekno-api
    ```

3. Instal dependensi:

    ```bash
    npm install
    ```

4. Buat file `.env` di root direktori proyek dan tambahkan variabel lingkungan yang diperlukan. Contoh:

    ```plaintext
    SECRET=inirahasia
    SECRET_VERIFIED=inirahasiasekali
    SECRET_REFRESH_TOKEN=rahasiabuatrefresh
    DB_USERNAME=root
    DB_PASSWORD=
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=tekno
    DB_DIALECT=mysql
    NODE_ENV=app
    ```

5. Impor database MySQL:

    - Buka MySQL Workbench atau terminal dan masuk ke MySQL dengan kredensial Anda.
    - Buat database baru dengan nama `tekno` atau sesuai dengan variabel `DB_DATABASE` di file `.env`.
    - Impor skema dan data dari file SQL yang ada di folder `db`. Contoh:

        ```bash
        mysql -u root -p tekno < db/tekno_db.sql
        ```

6. Jalankan server:

    ```bash
    npm run start:dev
    ```

Server akan berjalan di `http://localhost:5000`.

## Penggunaan

Setelah server berjalan, Anda dapat mengakses berbagai endpoint yang disediakan oleh API ini. Dokumentasi lengkap mengenai endpoint tersedia di koleksi Postman yang terdapat di folder `api_collection`.

#### Membuat Pengguna Baru (Admin)

Endpoint: `POST {{baseUrl}}/admin/users`

Contoh payload:

```json
{
    "firstName": "ivan",
    "lastName": "tes",
    "email": "ivan.tes123@yopmail.com",
    "password": "admin",
    "role": "client"
}
```

### Login Admin

Gunakan email dan password berikut untuk login sebagai admin:

- Email: ivan.yoga16@gmail.com
- Password: admin


## Lisensi

Proyek ini dilisensikan di bawah lisensi MIT. Lihat file `LICENSE` untuk informasi lebih lanjut.
