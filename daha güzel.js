function navigateTo(page) {
    const aboutSection = document.getElementById('about-section');
    const appointmentSection = document.getElementById('appointment-section');

    if (page === 'about') {
        // Hakkımızda bölümü açık mı kontrol et
        if (aboutSection.style.display === 'block' || aboutSection.style.display === '') {
            aboutSection.style.display = 'none'; // Hakkımızda bölümünü kapat
        } else {
            aboutSection.style.display = 'block'; // Hakkımızda bölümünü aç
            appointmentSection.style.display = 'none'; // Diğer bölümü kapat
            aboutSection.scrollIntoView({ behavior: 'smooth' }); // Kaydır
        }
    } else if (page === 'appointment') {
        // Randevu bölümü açık mı kontrol et
        if (appointmentSection.style.display === 'block' || appointmentSection.style.display === '') {
            appointmentSection.style.display = 'none'; // Randevu bölümünü kapat
        } else {
            appointmentSection.style.display = 'block'; // Randevu bölümünü aç
            aboutSection.style.display = 'none'; // Diğer bölümü kapat
            appointmentSection.scrollIntoView({ behavior: 'smooth' }); // Kaydır
        }
    }
}
// Sayfa yüklendiğinde her iki bölümü de gizle
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('about-section').style.display = 'none';
    document.getElementById('appointment-section').style.display = 'none';
});

// Hakkımızda bölümünü aşağı kaydırarak gösteren fonksiyon
function scrollToAbout() {
    const aboutSection = document.getElementById('about-section');
    
    // Hakkımızda bölümünü görünür yap
    aboutSection.style.display = 'block';
    
    // Sayfayı Hakkımızda bölümüne kaydır
    aboutSection.scrollIntoView({ behavior: 'smooth' });
}

// Randevu panelini aşağı kaydırarak gösteren fonksiyon
function scrollToAppointment() {
    const appointmentSection = document.getElementById('appointment-section');
    
    // Randevu panelini görünür yap
    appointmentSection.style.display = 'block';
    
    // Sayfayı randevu bölümüne kaydır
    appointmentSection.scrollIntoView({ behavior: 'smooth' });
}

// Sayfa yüklendiğinde yapılacak işlemler
document.addEventListener('DOMContentLoaded', (event) => {
    loadAvailableSlots();
});

const availableSlots = {
    "Pazartesi": [],
    "Salı": [],
    "Çarşamba": [],
    "Perşembe": [],
    "Cuma": []
};

function loadAvailableSlots() {
    const startTime = 8 * 60; // 08:00
    const endTime = 17 * 60; // 17:00
    const interval = 15; // 15 dakika

    for (let time = startTime; time < endTime; time += interval) {
        const hours = Math.floor(time / 60);
        const minutes = time % 60;
        const endHours = Math.floor((time + interval) / 60);
        const endMinutes = (time + interval) % 60;

        const slot = `${pad(hours)}:${pad(minutes)} - ${pad(endHours)}:${pad(endMinutes)}`;
        for (let day in availableSlots) {
            availableSlots[day].push(slot);
        }
    }
}

function updateDoctors() {
    const branchSelect = document.getElementById('branchSelect');
    const selectedBranch = branchSelect.value;
    const doctorsContainer = document.getElementById('doctorsContainer');
    const daysContainer = document.getElementById('daysContainer');
    const slotsContainer = document.getElementById('slotsContainer');

    doctorsContainer.innerHTML = ''; // Önceki içeriği temizle
    daysContainer.innerHTML = ''; // Günleri temizle
    slotsContainer.innerHTML = ''; // Zaman dilimlerini temizle

    let doctors = [];

    if (selectedBranch === 'dahiliye') {
        doctors = ["Dr. Ahmet Yılmaz", "Dr. Mehmet Yıldırım", "Dr. Aslı Uçar"];
    } else if (selectedBranch === 'ortopedi') {
        doctors = ["Dr. Güneş Doğan", "Dr. Mert Tahtacı", "Dr. Nuriye Selimli"];
    } else if (selectedBranch === 'kardiyoloji') {
        doctors = ["Dr. Burak Saçıkel", "Dr. Dursun Durmaz", "Dr. Cenk Boğazoğlu"];
    } else if (selectedBranch === 'kadın hastalıkları ve doğum') {
        doctors = ["Dr. Seval Gündoğdu", "Dr. Şahin Aslan"];
    } else if (selectedBranch === 'aile hekimliği') {
        doctors = ["Dr. Eylül Sağlam", "Dr. Volkan Sütçüoğlu"];
    } else if (selectedBranch === 'çocuk cerrahisi') {
        doctors = ["Dr. Selin Betoncu", "Dr. Kerem Aktürkoğlu"];
    } else if (selectedBranch === 'göğüs cerrahisi') {
        doctors = ["Dr. Mauro İcardi", "Dr. Fernando Muslera"];
    } else if (selectedBranch === 'genel cerrahi') {
        doctors = ["Dr. Korkmaz Ünaldı", "Dr. Baturay Gümüşlük"];
    } else if (selectedBranch === 'göz hastalıkları') {
        doctors = ["Dr. Mehmet Atakan", "Dr. Çağrı Irmak"];
    } else if (selectedBranch === 'nöroloji') {
        doctors = ["Dr. İrem İpekçi", "Dr. Ercan Kaya"];
    }

    doctors.forEach(doctor => {
        const doctorLabel = document.createElement('label');
        const doctorRadio = document.createElement('input');
        doctorRadio.type = 'radio';
        doctorRadio.name = 'doctor';
        doctorRadio.value = doctor;
        doctorRadio.onchange = updateDays; // Günleri güncellemek için

        doctorLabel.appendChild(doctorRadio);
        doctorLabel.appendChild(document.createTextNode(doctor));
        doctorsContainer.appendChild(doctorLabel);
    });
}

function updateDays() {
    const daysContainer = document.getElementById('daysContainer');
    const slotsContainer = document.getElementById('slotsContainer');
    daysContainer.innerHTML = ''; // Önceki içeriği temizle
    slotsContainer.innerHTML = ''; // Zaman dilimlerini temizle

    const days = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma"];
    days.forEach(day => {
        const dayLabel = document.createElement('label');
        const dayRadio = document.createElement('input');
        dayRadio.type = 'radio';
        dayRadio.name = 'day';
        dayRadio.value = day;
        dayRadio.onchange = function() {
            updateTimeRanges(); // Saat aralıklarını güncellemek için
            autoSelectFirstTimeRange(); // İlk saat aralığını otomatik olarak seç
        };

        dayLabel.appendChild(dayRadio);
        dayLabel.appendChild(document.createTextNode(day));
        daysContainer.appendChild(dayLabel);
    });
}

// Saat aralığı seçimi fonksiyonu
const availableTimeRanges = ["08:00-09:00", "09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-13:00", "13:00-14:00", "14:00-15:00", "15:00-16:00", "16:00-17:00"];

function updateTimeRanges() {
    const slotsContainer = document.getElementById('slotsContainer');
    
    // Saat aralığı menüsünü tekrar oluşturmak yerine sabit bırakıyoruz
    if (!document.getElementById('timeRangeSelect')) {
        const timeRangeLabel = document.createElement('label');
        timeRangeLabel.textContent = 'Saat Aralığı Seçiniz:';

        const timeRangeSelect = document.createElement('select');
        timeRangeSelect.id = 'timeRangeSelect';
        timeRangeSelect.onchange = updateDetailedSlots; // Zaman dilimleri seçildikten sonra 15 dakikalık dilimler getirilir

        availableTimeRanges.forEach(range => {
            const option = document.createElement('option');
            option.value = range;
            option.textContent = range;
            timeRangeSelect.appendChild(option);
        });

        slotsContainer.appendChild(timeRangeLabel);
        slotsContainer.appendChild(timeRangeSelect);
    }
}

// Varsayılan saat aralığını seç ve ilgili saat dilimlerini göster
function autoSelectFirstTimeRange() {
    const timeRangeSelect = document.getElementById('timeRangeSelect');
    if (timeRangeSelect) {
        timeRangeSelect.value = "08:00-09:00"; // Varsayılan olarak ilk aralığı seç
        updateDetailedSlots(); // Varsayılan saat aralığı için detaylı dilimleri göster
    }
}

// Saat dilimlerini 15 dakikalık parçalara bölen fonksiyon
function updateDetailedSlots() {
    const selectedTimeRange = document.getElementById('timeRangeSelect').value;
    const slotsContainer = document.getElementById('slotsContainer');
    
    // 08:00-09:00 gibi bir aralığı saat ve dakika formatına ayırıyoruz
    const [start, end] = selectedTimeRange.split('-').map(time => time.split(':'));
    
    const startHour = parseInt(start[0], 10); // Başlangıç saatini al
    const endHour = parseInt(end[0], 10);     // Bitiş
    const endMinutes = parseInt(end[1], 10);  // Bitiş dakikasını al
    const startMinutes = parseInt(start[1], 10); // Başlangıç dakikasını al

    // Önceki dilimleri temizle
    let detailedSlotsContainer = document.getElementById('detailedSlotsContainer');
    if (detailedSlotsContainer) {
        detailedSlotsContainer.innerHTML = '';
    } else {
        detailedSlotsContainer = document.createElement('div');
        detailedSlotsContainer.id = 'detailedSlotsContainer';
        slotsContainer.appendChild(detailedSlotsContainer);
    }

    // Saat aralığına göre 15 dakikalık dilimler oluştur
    const interval = 15; // 15 dakikalık dilimler
    for (let hour = startHour; hour < endHour || (hour === endHour && startMinutes < endMinutes); hour++) {
        for (let minutes = hour === startHour ? startMinutes : 0; minutes < 60; minutes += interval) {
            if (hour === endHour && minutes >= endMinutes) break; // Bitiş saatine kadar devam et

            const slot = `${pad(hour)}:${pad(minutes)}`;
            const slotLabel = document.createElement('label');
            const slotRadio = document.createElement('input');
            slotRadio.type = 'radio';
            slotRadio.name = 'slot';
            slotRadio.value = slot;

            slotLabel.appendChild(slotRadio);
            slotLabel.appendChild(document.createTextNode(slot));
            detailedSlotsContainer.appendChild(slotLabel);
        }
    }

    // Eğer son saat dilimi tam değilse (örneğin, 08:45 gibi), bunu da ekleyelim
    if (endMinutes > 0) {
        const slot = `${pad(endHour)}:${pad(0)}`;
        const slotLabel = document.createElement('label');
        const slotRadio = document.createElement('input');
        slotRadio.type = 'radio';
        slotRadio.name = 'slot';
        slotRadio.value = slot;

        slotLabel.appendChild(slotRadio);
        slotLabel.appendChild(document.createTextNode(slot));
        detailedSlotsContainer.appendChild(slotLabel);
    }
}

// İki haneli saat ve dakika formatı için yardımcı fonksiyon
function pad(num) {
    return num.toString().padStart(2, '0');
}
// Randevu kaydetme işlemi
function bookSlot(event) {
    event.preventDefault();

    // Seçilen gün ve saat dilimini al
    const selectedDay = document.querySelector('input[name="day"]:checked');
    const selectedSlot = document.querySelector('input[name="slot"]:checked');

    // Eğer gün veya saat seçilmemişse uyarı ver
    if (!selectedDay || !selectedSlot) {
        alert("Lütfen hem gün hem de saat dilimi seçiniz.");
        return;
    }

    const selectedDayValue = selectedDay.value;
    const selectedSlotValue = selectedSlot.value;

    // Randevu alındığına dair bir bildirim göster
    alert(`Randevu alındı: ${selectedDayValue}, ${selectedSlotValue}`);

    // Burada randevu işlemi kaydedilebilir
}
