\// ani 2 ảnh
window.addEventListener('DOMContentLoaded', () => {
    const imgs = document.querySelectorAll('.gt_img');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.3
    });

    imgs.forEach(img => observer.observe(img));
});

// 3 ảnh
window.addEventListener('scroll', () => {
    document.querySelectorAll('.img_small').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.remove('js_left');
            el.classList.remove('js_right');
        }
    });
});

window.addEventListener('scroll', () => {
    const el = document.querySelector('.img_big');
    if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.remove('js_center');
        }
    }
});

// cf nha
document.addEventListener('DOMContentLoaded', () => {
    const cfContainer = document.querySelector('.cf_container');

    if (cfContainer) {
        const observer2 = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, {
            threshold: 0.3
        });

        observer2.observe(cfContainer);
    }
});

// ani album
window.addEventListener('scroll', () => {
    document.querySelectorAll('.js_album').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.remove('album_left');
            el.classList.remove('album_right');
        }
    });
});

// thank
document.addEventListener('DOMContentLoaded', () => {
    const thankDesc = document.querySelector('.thank_desc');

    if (thankDesc) {
        const observer3 = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, { threshold: 0.3 });

        observer3.observe(thankDesc);
    }
});


// nhạc
window.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('myAudio');
    const indicator = document.getElementById('audioIndicator');

    const playAudio = () => {
        if (!audio.paused) return;

        audio.play()
            .then(() => {
                console.log('Phát nhạc thành công');
                indicator.style.display = 'none'; // ẩn cái loa
                removeListeners();
            })
            .catch((err) => {
                console.warn('Trình duyệt chặn phát nhạc:', err);
            });
    };

    const removeListeners = () => {
        ['click', 'scroll', 'touchstart', 'mousemove', 'keydown'].forEach(evt => {
            window.removeEventListener(evt, playAudio);
            document.removeEventListener(evt, playAudio);
        });
    };

    ['click', 'scroll', 'touchstart', 'mousemove', 'keydown'].forEach(evt => {
        window.addEventListener(evt, playAudio);
        document.addEventListener(evt, playAudio);
    });
});

// ==========================================
// CHỨC NĂNG POP-UP & COPY (Dọn từ HTML sang)
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    const btn_qr = document.querySelector('.js_qr');
    const pop_up = document.querySelector('.popup');
    const pop_up_item1 = document.querySelector('.popup_item1');
    const pop_up_item2 = document.querySelector('.popup_item2');

    if (btn_qr && pop_up) {
        btn_qr.addEventListener('click', () => pop_up.classList.add('show'));
        pop_up.addEventListener('click', () => pop_up.classList.remove('show'));
    }

    if (pop_up_item1) pop_up_item1.addEventListener('click', (event) => event.stopPropagation());
    if (pop_up_item2) pop_up_item2.addEventListener('click', (event) => event.stopPropagation());

    // Xử lý hiệu ứng thu phóng QR
    const popup_items = document.querySelectorAll('.popup_item');
    if(popup_items.length > 0) {
        const observer_popup = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const ratio = entry.intersectionRatio;
                const value = 0.8 + 0.2 * ratio;
                entry.target.style.opacity = value.toFixed(2);
                entry.target.style.transform = `scale(${value.toFixed(2)})`;
            });
        }, {
            root: document.querySelector('.popup_container'),
            threshold: Array.from({ length: 101 }, (_, i) => i / 100)
        });

        popup_items.forEach(item => observer_popup.observe(item));
    }

    // Chức năng copy
    function showToast() {
        const toast = document.getElementById('copy-toast');
        if(toast) {
            toast.classList.add('show');
            setTimeout(() => { toast.classList.remove('show'); }, 1000);
        }
    }

    document.querySelectorAll('.copy').forEach(copyBtn => {
        copyBtn.addEventListener('click', function () {
            const text = this.dataset.copy;
            navigator.clipboard.writeText(text).then(() => {
                showToast();
            }).catch(err => {
                console.error('Copy thất bại: ', err);
            });
        });
    });
});