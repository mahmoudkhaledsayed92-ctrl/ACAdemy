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


    // ==================== 10. FORM VALIDATION ====================
    const consultationForm = document.querySelector('.consultation-form form');
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault(); // منع الصفحة من إعادة التحميل الافتراضية
            
            const name = this.querySelector('input[type="text"]').value.trim();
            const email = this.querySelector('input[type="email"]').value.trim();
            
            if (name === "" || email === "") {
                alert("برجاء ملء الحقول الأساسية الاسم والبريد الإلكتروني.");
                return;
            }
            
            // محاكاة إرسال ناجح (تستبدلها بـ API الإرسال لاحقاً)
            alert(`شكراً لك يا ${name}! تم استلام طلبك للحصول على الاستشارة بنجاح، وسأتواصل معك قريباً.`);
            this.reset();
        });
    }
});