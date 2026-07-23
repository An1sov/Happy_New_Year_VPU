document.addEventListener('DOMContentLoaded', () => {
            // Перевірка на мобільний пристрій
            const isMobile = window.innerWidth < 768;

            // --- ЗВУКИ ---
            const bgAudio = document.getElementById('holiday-audio');
            const jingleSound = document.getElementById('jingle-sound');
            const ukrCarol = document.getElementById('ukr-carol');
            const skryabinSong = document.getElementById('skryabin-song');
            const victorySound = document.getElementById('victory-sound');
            const fireworkSound = document.getElementById('firework-sound');

            bgAudio.volume = 0.10;
            ukrCarol.volume = 0.6;
            skryabinSong.volume = 0.3;
            victorySound.volume = 0.6;
            fireworkSound.volume = 0.6;

            const tree = document.getElementById('christmas-tree');
            const horse = document.getElementById('horse-character');
            const ginger = document.getElementById('gingerbread-people');
            const clouds = document.querySelectorAll('.cloud');
            const snowContainer = document.getElementById('snow-container');
            const fireworksContainer = document.getElementById('fireworks-container');

            function playSound(audioEl, shouldPauseBg = true) {
                audioEl.currentTime = 0;
                audioEl.play().catch(e => console.log("Audio play prevented:", e));
                if (shouldPauseBg) bgAudio.pause();
            }
            function stopSound(audioEl) {
                audioEl.pause();
                audioEl.currentTime = 0;
                bgAudio.play().catch(() => { });
            }

            tree.addEventListener('mouseenter', () => playSound(ukrCarol, true));
            tree.addEventListener('mouseleave', () => stopSound(ukrCarol));

            if (ginger) {
                ginger.addEventListener('mouseenter', () => { playSound(skryabinSong, true); ginger.style.transform = "scale(1.05)"; ginger.style.transition = "transform 0.3s"; });
                ginger.addEventListener('mouseleave', () => { stopSound(skryabinSong); ginger.style.transform = "scale(1)"; });
            }


            // UI Elements
            const celebrateBtn = document.getElementById('celebrateBtn');
            const victoryBtn = document.getElementById('victoryBtn');
            const luckyBtn = document.getElementById('luckyBtn');
            const fortuneBtn = document.getElementById('fortuneBtn');
            const jingleBtn = document.getElementById('jingleBtn');
            const decorateBtn = document.getElementById('decorateBtn');
            const wishBtn = document.getElementById('wishBtn');
            const triviaBtn = document.getElementById('triviaBtn');
            const gameResult = document.getElementById('gameResult');
            const backdrop = document.getElementById('modalBackdrop');
            const closeGameBtn = document.getElementById('closeGameBtn');

            const fortunes = ['🐎 У 2026 році ти будеш на коні!', '🔥 Твоя енергія палитиме всі перешкоди.', '🏆 Швидкі рішення принесуть тобі успіх!', '❤️ Пристрасть запалить твоє серце!', '✈️ На тебе чекає далека мандрівка.', '🍎 Здоров\'я буде залізним!', '🚀 Кар\'єра піде галопом вгору!'];
            const triviaFacts = ['🐎 2026 рік — це рік Червоного Вогняного Коня.', '🇺🇦 "Щедрик" відомий у всьому світі як "Carol of the Bells".', '🔥 Стихія Вогню символізує пристрасть та творчість.', '⚡ Коні мають найбільші очі серед усіх наземних ссавців.', '🌞 Вогняний Кінь приходить лише раз на 60 років.'];
            const surpriseSites = [
                { title: '⚓ OpenSeaMap', url: 'https://map.openseamap.org/', desc: 'Морська карта світу! Знайди маяки, порти та морські шляхи.' },
                { title: '⚡ Lightning Maps', url: 'https://www.lightningmaps.org/?lang=pl#m=oss;t=3;s=0;o=0;b=;ts=0;y=29.2289;x=-46.6699;z=3;d=2;dl=2;dc=0;', desc: 'Карта блискавок у реальному часі. Дивись, де зараз гримить гроза!' },
                { title: '🌍 Radio Garden', url: 'https://radio.garden/visit/new-york-ny/9Yi25umJ', desc: 'Крути глобус і слухай місцеве радіо з будь-якої точки планети.' },
                { title: '🛰️ Satellite Map', url: 'https://satellitemap.space/', desc: 'Дивись, як тисячі супутників (Starlink та інші) літають над Землею прямо зараз.' },
                { title: '🛡️ Xeovo VPN', url: 'https://xeovo.com/', desc: 'Інструменти для твоєї кібербезпеки та анонімності в мережі.' },
                { title: '📧 SmailPro', url: 'https://smailpro.com/temporary-email', desc: 'Потрібна пошта на 5 хвилин? Створи тимчасовий емейл миттєво і безкоштовно.' },
                { title: '📷 Copernicus Browser', url: 'https://browser.dataspace.copernicus.eu/?zoom=9&lat=47.57282&lng=35.41718&themeId=DEFAULT-THEME&visualizationUrl=U2FsdGVkX193lrDKxGUqeAr0HJJ6doKyoYktb5oePhkaIoO31ZMCtFnCPlN3xmoozXA8qiePl7ZYi3E9k4V%2BgcfHBsdDrJy130DBEskCqA3ft60QRmc7q9Geaqq9KVYW&datasetId=S2_L2A_CDAS&fromTime=2025-02-19T00%3A00%3A00.000Z&toTime=2025-02-19T23%3A59%3A59.999Z&layerId=1_TRUE_COLOR&demSource3D=%22MAPZEN%22&cloudCoverage=30&dateMode=SINGLE', desc: 'Досліджуй Землю через супутникові знімки високої якості в реальному часі.' },
                { title: '🎙️ Riverside AI', url: 'https://riverside.com/transcription', desc: 'Магія ШІ: перетвори будь-який аудіозапис або відео на текст за хвилину.' },
                { title: '🌊 The Deep Sea', url: 'https://neal.fun/deep-sea/', desc: 'Скроль униз і дізнайся, хто живе на самому дні океану.' },
                { title: '🌌 NASA APOD', url: 'https://apod.nasa.gov/apod/astropix.html', desc: 'Астрономічне фото дня. Космос ближче, ніж здається.' },
                { title: '🎹 Patatap', url: 'https://patatap.com/', desc: 'Натискай клавіші A-Z і створюй музику візуально!' },
                { title: '🎨 Quick, Draw!', url: 'https://quickdraw.withgoogle.com/', desc: 'Намалюй дудл за 20 секунд, а нейромережа спробує вгадати, що це.' }
            ];

            // ОПТИМІЗОВАНА ФУНКЦІЯ СНІГУ (для мобільних)
            function createSnowFromCloud(cloud) {
                const flake = document.createElement('div');
                flake.className = 'snowflake';
                flake.textContent = Math.random() > 0.5 ? '❄' : '✦';
                const size = 10 + Math.random() * 15;
                const duration = 5 + Math.random() * 5;

                // На мобільних не вираховуємо позицію хмари (важка операція), а просто спавнимо випадково
                if (isMobile) {
                    flake.style.left = Math.random() * 100 + 'vw';
                    flake.style.top = '-20px';
                } else {
                    const rect = cloud.getBoundingClientRect();
                    flake.style.left = rect.left + Math.random() * rect.width + 'px';
                    flake.style.top = rect.bottom - 20 + 'px';
                }

                flake.style.fontSize = size + 'px';
                flake.style.animation = `snowFall ${duration}s linear forwards`;
                snowContainer.appendChild(flake);
                flake.addEventListener('animationend', () => flake.remove());
            }

            // На мобільних сніг йде рідше (450ms), на ПК - часто (150ms)
            const snowIntervalTime = isMobile ? 450 : 150;

            setInterval(() => {
                clouds.forEach(cloud => {
                    if (Math.random() > 0.3) createSnowFromCloud(cloud);
                });
            }, snowIntervalTime);

            function updateCountdown() {
                const now = new Date();
                const nextYear = new Date(2026, 0, 1);
                const diff = nextYear - now;
                if (diff > 0) {
                    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
                    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
                    const m = Math.floor((diff / 1000 / 60) % 60);
                    const s = Math.floor((diff / 1000) % 60);
                    document.getElementById('days').textContent = d.toString().padStart(2, '0');
                    document.getElementById('hours').textContent = h.toString().padStart(2, '0');
                    document.getElementById('minutes').textContent = m.toString().padStart(2, '0');
                    document.getElementById('seconds').textContent = s.toString().padStart(2, '0');
                }
            }
            setInterval(updateCountdown, 1000); updateCountdown();

            function openModal(title, text) {
                document.getElementById('gameResultTitle').innerHTML = title;
                document.getElementById('gameResultText').innerHTML = text;
                gameResult.classList.remove('hidden'); backdrop.classList.remove('hidden');
            }
            function closeModal() {
                gameResult.classList.add('hidden'); backdrop.classList.add('hidden');
                closeGameBtn.style.display = 'inline-block';
            }
            closeGameBtn.addEventListener('click', closeModal); backdrop.addEventListener('click', closeModal);

            function createConfetti() {
                const colors = ['#ff0000', '#ff8c00', '#ffff00', '#ffffff'];
                for (let i = 0; i < 100; i++) {
                    const conf = document.createElement('div');
                    conf.className = 'confetti';
                    conf.style.left = Math.random() * 100 + 'vw';
                    conf.style.top = '-20px';
                    conf.style.width = Math.random() * 10 + 5 + 'px';
                    conf.style.height = Math.random() * 10 + 5 + 'px';
                    conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    conf.style.animation = `snowFall ${2 + Math.random() * 3}s linear forwards`;
                    document.body.appendChild(conf);
                    setTimeout(() => conf.remove(), 5000);
                }
            }

            // === ЛОГІКА ЗАПУСКУ ФЕЄРВЕРКІВ ===
            function launchFireworks() {
                // На мобільних запускаємо менше феєрверків (8 замість 18), щоб не висло
                const count = isMobile ? 8 : 18;

                for (let i = 0; i < count; i++) {
                    setTimeout(() => {
                        const fw = document.createElement('div');
                        const types = ['', 'type-2', 'type-3', 'type-4'];
                        const randomType = types[Math.floor(Math.random() * types.length)];
                        fw.className = `newyear ${randomType}`;

                        const randomLeft = 10 + Math.random() * 80;
                        const randomTop = 10 + Math.random() * 40;

                        fw.style.left = randomLeft + '%';
                        fw.style.top = randomTop + '%';

                        fireworksContainer.appendChild(fw);
                        setTimeout(() => fw.remove(), 3000);
                    }, i * 200);
                }
            }

            celebrateBtn.addEventListener('click', () => {
                launchFireworks();
                tree.classList.add('decorated');
                tree.style.animation = 'none';
                setTimeout(() => tree.style.animation = 'sway 0.2s ease-in-out 5', 10);
                setTimeout(() => tree.style.animation = 'sway 6s ease-in-out infinite', 1500);

                setTimeout(() => {
                    fireworkSound.currentTime = 0;
                    fireworkSound.play().catch(() => { });
                }, 900);
            });

            luckyBtn.addEventListener('click', () => { const num = Math.floor(Math.random() * 100) + 1; openModal('🎲 Твоє Вогняне Число', `<div style="font-size: 4rem; font-weight: 800; color: #ff4500; margin: 1rem 0;">${num}</div>`); });
            fortuneBtn.addEventListener('click', () => { openModal('🔮 Що шепоче Кінь?', fortunes[Math.floor(Math.random() * fortunes.length)]); });
            jingleBtn.addEventListener('click', () => { createConfetti(); jingleSound.currentTime = 0; jingleSound.play().catch(() => { }); tree.style.animation = 'none'; setTimeout(() => tree.style.animation = 'sway 0.2s ease-in-out 5', 10); setTimeout(() => tree.style.animation = 'sway 6s ease-in-out infinite', 1500); });
            decorateBtn.addEventListener('click', () => { createConfetti(); tree.classList.toggle('decorated'); });

            wishBtn.addEventListener('click', () => {
                createConfetti();
                const randomSite = surpriseSites[Math.floor(Math.random() * surpriseSites.length)];
                const linkButtonHtml = `<br><a href="${randomSite.url}" target="_blank" class="site-link-btn">🚀 ПЕРЕЙТИ</a>`;
                openModal(randomSite.title, randomSite.desc + linkButtonHtml);
                closeGameBtn.style.display = 'none';
            });

            triviaBtn.addEventListener('click', () => { openModal('❓ Новорічний Факт', triviaFacts[Math.floor(Math.random() * triviaFacts.length)]); });

            horse.addEventListener('mouseenter', () => bgAudio.play().catch(() => { }));
            horse.addEventListener('mouseleave', () => bgAudio.pause());
            horse.addEventListener('click', () => { horse.style.animation = 'gallop 0.5s ease-in-out infinite'; setTimeout(() => horse.style.animation = 'gallop 3s ease-in-out infinite', 2000); openModal('🐎 Іго-го!', '«Ніколи не зупиняйся на досягнутому! Тільки вперед!»'); });

            // Оптимізація іскор (не створювати занадто часто)
            let lastSparkTime = 0;
            document.addEventListener('mousemove', (e) => {
                const now = Date.now();
                if (now - lastSparkTime > 50) { // Обмеження: раз на 50мс
                    if (Math.random() > 0.7) {
                        const spark = document.createElement('div');
                        spark.className = 'sparkle';
                        const symbols = ['🔥', '✨', '🐎', '⚡'];
                        spark.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
                        spark.style.left = e.clientX + 'px';
                        spark.style.top = e.clientY + 'px';
                        spark.style.fontSize = Math.random() * 20 + 10 + 'px';
                        document.body.appendChild(spark);
                        setTimeout(() => spark.remove(), 800);
                    }
                    lastSparkTime = now;
                }
            });
            // Додаємо підтримку touchmove для телефонів з тими ж обмеженнями
            document.addEventListener('touchmove', (e) => {
                const now = Date.now();
                if (now - lastSparkTime > 100) { // На телефонах ще рідше
                    if (Math.random() > 0.5) {
                        const touch = e.touches[0];
                        const spark = document.createElement('div');
                        spark.className = 'sparkle';
                        const symbols = ['🔥', '✨', '🐎', '⚡'];
                        spark.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
                        spark.style.left = touch.clientX + 'px';
                        spark.style.top = touch.clientY + 'px';
                        spark.style.fontSize = Math.random() * 20 + 10 + 'px';
                        document.body.appendChild(spark);
                        setTimeout(() => spark.remove(), 800);
                    }
                    lastSparkTime = now;
                }
            });
        });