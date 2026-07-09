/* ==========================================================================
   MAHMOUD KHALED ACADEMY - MAIN JAVASCRIPT FILE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==================== 1. LOADER HIDE ====================
    const loader = document.getElementById('loader');
    if (loader) {
        // بنسيب الـ Loader يظهر ثانية كاملة عشان شكل واجهة المستخدم، بعدين نخفيه بسلاسة
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
        }, 1000);
    }


    // ==================== 2. STICKY NAVBAR ====================
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-sticky');
        } else {
            navbar.classList.remove('navbar-sticky');
        }
    });


    // ==================== 3. MOBILE MENU ====================
    // لعمل قائمة موبايل تفاعلية، هنضيف زرار الـ Hamburger برمجياً لو مش موجود في الـ HTML
    const navContainer = document.querySelector('.navbar .container');
    const menu = document.querySelector('.menu');
    
    if (navContainer && menu) {
        // إنشاء الزرار
        const toggleBtn = document.createElement('div');
        toggleBtn.className = 'mobile-menu-btn';
        toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        navContainer.appendChild(toggleBtn);

        // فتح وقفل القائمة عند الضغط
        toggleBtn.addEventListener('click', () => {
            menu.classList.toggle('active');
            toggleBtn.innerHTML = menu.classList.contains('active') 
                ? '<i class="fa-solid fa-xmark"></i>' 
                : '<i class="fa-solid fa-bars"></i>';
        });

        // قفل القائمة تلقائياً لو العميل داس على أي لينك
        document.querySelectorAll('.menu li a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
            });
        });
    }


    // ==================== 4. SCROLL PROGRESS BAR ====================
    // شريط علوي صغير بيبين للمستخدم هو قرأ قد إيه من الصفحة
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    });


    // ==================== 5. BACK TO TOP BUTTON ====================
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    // ==================== 6. ACTIVE NAVIGATION LINK ====================
    // تغيير لون اللينك في القائمة تلقائياً حسب السكشن اللي عين المستخدم عليه حالياً
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const currentNavLink = document.querySelector(`.menu a[href*=${sectionId}]`);

            if (currentNavLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    currentNavLink.classList.add('active');
                } else {
                    currentNavLink.classList.remove('active');
                }
            }
        });
    });


    // ==================== 7. FAQ ACCORDION ====================
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const item = this.parentElement;
            
            // قفل أي سؤال تاني مفتوح عشان يفضل الـ Layout نظيف (أوبشنال)
            document.querySelectorAll('.faq-item').forEach(faqItem => {
                if (faqItem !== item) faqItem.classList.remove('active');
            });
            
            // فتح أو قفل السؤال الحالي
            item.classList.toggle('active');
        });
    });


    // ==================== 8. COUNTER ANIMATION (RESULTS) ====================
    // عداد حركي للأرقام (مثل الـ ROAS والـ Spend) يشتغل أول ما المستخدم يوصل لسكشن الـ Results
    const statsSection = document.querySelector('.results');
    const counters = document.querySelectorAll('.result-box h3');
    let started = false; // للتأكد إن العداد يشتغل مرة واحدة بس

    function startCount(el) {
        let goal = el.innerText;
        // تنظيف النصوص للحصول على الأرقام الصافية (مثلاً 4.8X نأخذ منها 4.8)
        let isFloat = goal.includes('.');
        let numGoal = parseFloat(goal.replace(/[^0-9.]/g, ''));
        let suffix = goal.replace(/[0-9.]/g, ''); // الاحتفاظ بالـ + أو X أو M
        
        let count = 0;
        let increment = numGoal / 50; // سرعة العداد
        
        let timer = setInterval(() => {
            count += increment;
            if (count >= numGoal) {
                el.innerText = numGoal + suffix;
                clearInterval(timer);
            } else {
                el.innerText = (isFloat ? count.toFixed(1) : Math.floor(count)) + suffix;
            }
        }, 30);
    }

    // مراقبة السكشن عبر الـ Scroll
    if (statsSection && counters.length > 0) {
        window.addEventListener('scroll', () => {
            if (window.scrollY >= statsSection.offsetTop - window.innerHeight + 100) {
                if (!started) {
                    counters.forEach((num) => startCount(num));
                }
                started = true;
            }
        });
    }


    // ==================== 9. REVEAL ANIMATION (SCROLL EFF) ====================
    // تأثير ظهور السكاشن بسلاسة ونعومة أثناء النزول
    const revealSections = document.querySelectorAll('section');
    
    const revealOnScroll = () => {
        revealSections.forEach(sec => {
            const secTop = sec.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (secTop < windowHeight - 150) {
                sec.classList.add('reveal-visible');
            }
        });
    };
    
    // إضافة كلاس الـ reveal لجميع السكاشن برمجياً في البداية
    revealSections.forEach(sec => sec.classList.add('reveal-section'));
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // تشغيلها مرة فورية عند تحميل الصفحة


    // ==================== 10. CONSULTATION FORM: WHATSAPP + EMAIL ====================
    // بيانات التواصل بتاعة محمود خالد - غيّرها من هنا لو حبيت تحدثها لاحقاً
    const WHATSAPP_NUMBER = '201559672552';       // رقم الواتساب بالكود الدولي من غير + أو صفر
    const OWNER_EMAIL = 'mahmoudkhaledsayed92@gmail.com'; // الإيميل اللي هيوصله الحجز

    const consultationForm = document.getElementById('consultationForm');
    const consultationStatus = document.getElementById('consultationStatus');
    const consultationBtn = document.getElementById('consultationSubmitBtn');

    if (consultationForm) {
        consultationForm.addEventListener('submit', async function (e) {
            e.preventDefault(); // منع الصفحة من إعادة التحميل الافتراضية

            const nameField = this.querySelector('input[name="name"]');
            const emailField = this.querySelector('input[name="email"]');
            const businessField = this.querySelector('input[name="business"]');
            const messageField = this.querySelector('textarea[name="message"]');

            const name = nameField.value.trim();
            const email = emailField.value.trim();
            const business = businessField.value.trim();
            const message = messageField.value.trim();

            // تحقق بسيط من البيانات الأساسية
            if (name === '' || email === '') {
                showStatus(consultationStatus, 'برجاء ملء الاسم والبريد الإلكتروني.', 'error');
                return;
            }
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                showStatus(consultationStatus, 'برجاء إدخال بريد إلكتروني صحيح.', 'error');
                return;
            }

            // حالة تحميل على الزرار عشان العميل يعرف إن في طلب بيتنفذ
            setButtonLoading(consultationBtn, true, 'جاري الإرسال...');
            showStatus(consultationStatus, '', '');

            // 1) إرسال البيانات كإيميل تلقائي عن طريق FormSubmit (خدمة مجانية بدون سيرفر)
            let emailSent = false;
            try {
                const response = await fetch(`https://formsubmit.co/ajax/${OWNER_EMAIL}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        business: business || 'غير محدد',
                        message: message || 'لا توجد تفاصيل إضافية',
                        _subject: `طلب استشارة جديد من ${name} - Mahmoud Khaled Academy`
                    })
                });
                emailSent = response.ok;
            } catch (err) {
                emailSent = false;
            }

            // 2) فتح واتساب في تاب جديد برسالة جاهزة بنفس بيانات النموذج
            const waText = encodeURIComponent(
                `مرحبا محمود، معايا طلب حجز استشارة جديد:\n` +
                `الاسم: ${name}\n` +
                `الإيميل: ${email}\n` +
                `النشاط/البراند: ${business || 'غير محدد'}\n` +
                `التفاصيل: ${message || 'لا توجد تفاصيل إضافية'}`
            );
            window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`, '_blank');

            setButtonLoading(consultationBtn, false, 'Book Consultation');

            if (emailSent) {
                showStatus(consultationStatus, `شكراً لك يا ${name}! تم إرسال طلبك بالإيميل، وفتحنا لك واتساب كمان لتأكيد سريع.`, 'success');
            } else {
                showStatus(consultationStatus, `تم فتح واتساب لإرسال طلبك. ملحوظة: الإرسال بالإيميل لم يكتمل، برجاء التأكيد عبر واتساب.`, 'warning');
            }

            this.reset();
        });
    }


    // ==================== 11. NEWSLETTER FORM (FOOTER) ====================
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterStatus = document.getElementById('newsletterStatus');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const emailField = this.querySelector('input[name="email"]');
            const email = emailField.value.trim();
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {
                showStatus(newsletterStatus, 'برجاء إدخال بريد إلكتروني صحيح.', 'error');
                return;
            }

            try {
                const response = await fetch(`https://formsubmit.co/ajax/${OWNER_EMAIL}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        _subject: 'مشترك جديد في النشرة البريدية - Mahmoud Khaled Academy'
                    })
                });

                if (response.ok) {
                    showStatus(newsletterStatus, 'تم الاشتراك بنجاح، شكراً لك!', 'success');
                    this.reset();
                } else {
                    showStatus(newsletterStatus, 'حدث خطأ، برجاء المحاولة لاحقاً.', 'error');
                }
            } catch (err) {
                showStatus(newsletterStatus, 'حدث خطأ في الاتصال، برجاء المحاولة لاحقاً.', 'error');
            }
        });
    }


    // ==================== 12. HELPER FUNCTIONS ====================
    function showStatus(el, text, type) {
        if (!el) return;
        el.textContent = text;
        el.className = 'form-status' + (type ? ` ${type}` : '');
    }

    function setButtonLoading(btn, isLoading, text) {
        if (!btn) return;
        const span = btn.querySelector('.btn-text');
        btn.disabled = isLoading;
        btn.classList.toggle('loading', isLoading);
        if (span) {
            span.textContent = text;
        } else {
            btn.textContent = text;
        }
    }
});