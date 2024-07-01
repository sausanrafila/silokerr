// script.js

document.addEventListener('DOMContentLoaded', function() {
    const darkModeSwitch = document.getElementById('darkModeSwitch');

    darkModeSwitch.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
        toggleDarkMode();
    });

    function toggleDarkMode() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.classList.toggle('dark-mode');
        });

        const jumbotron = document.querySelectorAll('.jumbotron');
        jumbotron.forEach(jumbotron => {
            jumbotron.classList.toggle('dark-mode');
        });


        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.toggle('dark-mode');
        });

        const footer = document.querySelector('footer');
        footer.classList.toggle('dark-mode');

        const nav = document.querySelector('nav');
        nav.classList.toggle('dark-mode');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const maxWords = 31;

    function limitWords(element) {
        const text = element.textContent.trim();
        const words = text.split(/\s+/);
        if (words.length > maxWords) {
            const limitedText = words.slice(0, maxWords).join(' ') + '...';
            element.textContent = limitedText;
        }
    }

    const cardText = document.querySelectorAll('.text-limited');
    cardText.forEach(item => limitWords(item));
});

document.addEventListener('DOMContentLoaded', function() {
    // Event listener untuk submit form
    document.getElementById('mitraForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Menghentikan pengiriman form default

        // Mengambil nilai dari input form
        const namaMitra = document.getElementById('namaMitra').value;
        const keteranganMitra = document.getElementById('keteranganMitra').value;
        const logoMitra = document.getElementById('logoMitra').files[0]; // Mengambil file logo

        // Memastikan nama mitra tidak kosong
        if (!namaMitra) {
            alert('Nama mitra harus diisi!');
            return;
        }

        // Menyiapkan objek mitra untuk disimpan
        const mitra = {
            nama: namaMitra,
            keterangan: keteranganMitra,
            logo: ''
        };

        // Memeriksa apakah file logo dipilih
        if (logoMitra) {
            // Membaca file logo sebagai URL data (base64)
            const reader = new FileReader();
            reader.readAsDataURL(logoMitra);
            reader.onload = function() {
                mitra.logo = reader.result; // Menyimpan URL data logo ke dalam objek mitra

                // Menyimpan data mitra ke Local Storage
                let mitraData = JSON.parse(localStorage.getItem('mitraData')) || [];
                mitraData.push(mitra);
                localStorage.setItem('mitraData', JSON.stringify(mitraData));

                // Mengarahkan kembali ke halaman daftarmitra.html setelah berhasil disimpan
                window.location.href = 'daftarmitra.html';
            };
            reader.onerror = function(error) {
                console.error('Error reading the file: ', error);
                alert('Terjadi kesalahan saat membaca file logo.');
            };
        } else {
            // Jika logo tidak dipilih, menyimpan data mitra tanpa logo
            let mitraData = JSON.parse(localStorage.getItem('mitraData')) || [];
            mitraData.push(mitra);
            localStorage.setItem('mitraData', JSON.stringify(mitraData));

            // Mengarahkan kembali ke halaman daftarmitra.html setelah berhasil disimpan
            window.location.href = 'daftarmitra.html';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const mitraListDiv = document.getElementById('mitraList');

    if (!mitraListDiv) {
        console.error("Element mitraList tidak ditemukan");
        return;
    }

    try {
        let mitraData = JSON.parse(localStorage.getItem('mitraData')) || [];

        // Jika mitraData kosong, sembunyikan elemen mitraList
        if (mitraData.length === 0) {
            mitraListDiv.classList.add('hidden');
        } else {
            mitraListDiv.classList.remove('hidden');
            mitraData.forEach(function(mitra) {
                const mitraDiv = document.createElement('div');
                mitraDiv.classList.add('col-md-9', 'm-auto');

                const judulMitra = document.createElement('h2');
                judulMitra.textContent = mitra.nama;
                mitraDiv.appendChild(judulMitra);

                // Tambahkan gambar mitra jika ada
                if (mitra.logo) {
                    const gambarMitra = document.createElement('img');
                    gambarMitra.classList.add('gambar-mitra');
                    gambarMitra.src = mitra.logo;
                    gambarMitra.alt = mitra.nama + ' logo';
                    mitraDiv.appendChild(gambarMitra);
                }

                // Tambahkan keterangan mitra jika ada
                if (mitra.keterangan) {
                    const keteranganMitra = document.createElement('p');
                    keteranganMitra.textContent = mitra.keterangan;
                    mitraDiv.appendChild(keteranganMitra);
                }

                mitraListDiv.appendChild(mitraDiv);
            });

            // Hapus data dari localStorage setelah ditampilkan
            localStorage.removeItem('mitraData');
        }
    } catch (error) {
        console.error("Error parsing mitraData: ", error);
    }
});


