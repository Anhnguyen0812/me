/* ==========================================
   i18n - Bilingual Support (VI / EN)
   Auto-detect browser language, toggle with button.
   Only translates descriptive text, NOT technical terms.
   ========================================== */

const translations = {
  // ===== Hero =====
  "hero.bio": {
    vi: "Full-stack developer đam mê xây dựng các ứng dụng web hiện đại, từ e-commerce đến AI chatbot. Luôn tìm kiếm những thử thách mới trong thế giới công nghệ.",
    en: "A passionate full-stack developer building modern web applications, from e-commerce to AI chatbots. Always seeking new challenges in the world of technology."
  },
  "hero.born": {
    vi: "Sinh năm 2005 · Hà Nội, Việt Nam",
    en: "Born 2005 · Hanoi, Vietnam"
  },

  // ===== Project Descriptions =====
  "project.nexus.desc": {
    vi: "Hệ thống tuyển dụng thông minh sử dụng AI để matching ứng viên với nhà tuyển dụng, phân tích CV tự động và đánh giá kỹ năng.",
    en: "Smart recruitment system using AI to match candidates with employers, with automated CV analysis and skill evaluation."
  },
  "project.ecom.desc": {
    vi: "Nền tảng thương mại điện tử full-stack với giỏ hàng, thanh toán online, quản lý kho và dashboard analytics cho admin.",
    en: "Full-stack e-commerce platform with shopping cart, online payment, inventory management, and admin analytics dashboard."
  },
  "project.rag.desc": {
    vi: "Chatbot thông minh sử dụng Retrieval-Augmented Generation, kết hợp vector database để trả lời chính xác dựa trên dữ liệu riêng.",
    en: "Intelligent chatbot using Retrieval-Augmented Generation, combined with vector database for accurate answers based on custom data."
  },
  "project.nihongo.name": {
    vi: "Web Học Tiếng Nhật",
    en: "Japanese Learning Web"
  },
  "project.nihongo.desc": {
    vi: "Ứng dụng web học tiếng Nhật tương tác với flashcard Kanji, luyện nghe, bài tập ngữ pháp và tracking tiến độ học tập.",
    en: "Interactive Japanese learning web app with Kanji flashcards, listening practice, grammar exercises and progress tracking."
  },
  "project.room.name": {
    vi: "Web Tìm Trọ",
    en: "Room Finder"
  },
  "project.room.desc": {
    vi: "Nền tảng tìm kiếm phòng trọ với bản đồ tương tác, bộ lọc nâng cao theo giá/khu vực và hệ thống đánh giá từ người thuê.",
    en: "Room searching platform with interactive map, advanced filters by price/area, and a tenant review system."
  },
  "project.tab.desc": {
    vi: "Browser extension giúp tìm kiếm và chuyển đổi tab nhanh chóng với fuzzy search, keyboard shortcuts và giao diện tối giản.",
    en: "Browser extension for quick tab searching and switching with fuzzy search, keyboard shortcuts and a minimalist UI."
  },
  "project.landing.name": {
    vi: "Landing Page Quảng Cáo",
    en: "Advertising Landing Page"
  },
  "project.landing.desc": {
    vi: "Landing page chuyển đổi cao cho chiến dịch quảng cáo với thiết kế responsive, animation mượt mà và tối ưu SEO/performance.",
    en: "High-conversion landing page for ad campaigns with responsive design, smooth animations, and SEO/performance optimization."
  },

  // ===== Chat bubbles (RAG preview) =====
  "chat.bot1": {
    vi: "Xin chào! Tôi có thể giúp gì?",
    en: "Hello! How can I help you?"
  },
  "chat.user1": {
    vi: "Tìm thông tin...",
    en: "Search for info..."
  },
  "chat.bot2": {
    vi: "Đây là kết quả từ RAG...",
    en: "Here are the results from RAG..."
  },

  // ===== Footer =====
  "footer.built": {
    vi: "Xây dựng với ☕ và",
    en: "Built with ☕ and"
  },
  "footer.design": {
    vi: "Thiết kế theo phong cách Neo-Brutalism. Hosted trên GitHub Pages.",
    en: "Designed in Neo-Brutalism style. Hosted on GitHub Pages."
  },

  // ===== Contact =====
  "contact.resume": {
    vi: "Tải CV (PDF)",
    en: "Download CV (PDF)"
  }
};

// ===== i18n Engine =====
class I18n {
  constructor() {
    this.currentLang = this._detectLanguage();
    this._init();
  }

  /** Detect language from: localStorage > browser > fallback 'vi' */
  _detectLanguage() {
    const saved = localStorage.getItem('portfolio-lang');
    if (saved && (saved === 'vi' || saved === 'en')) return saved;

    const browserLang = navigator.language || navigator.userLanguage || '';
    // If browser lang starts with 'vi', use Vietnamese; else English
    return browserLang.toLowerCase().startsWith('vi') ? 'vi' : 'en';
  }

  /** Initialize: create toggle button, apply language */
  _init() {
    this._createToggle();
    this.applyLanguage(this.currentLang, false);
  }

  /** Create the floating lang toggle button */
  _createToggle() {
    const btn = document.createElement('button');
    btn.id = 'langToggle';
    btn.className = 'lang-toggle';
    btn.setAttribute('aria-label', 'Switch language');
    btn.title = 'Switch language / Đổi ngôn ngữ';
    this._updateToggleContent(btn);

    btn.addEventListener('click', () => {
      this.currentLang = this.currentLang === 'vi' ? 'en' : 'vi';
      localStorage.setItem('portfolio-lang', this.currentLang);
      this.applyLanguage(this.currentLang, true);
      this._updateToggleContent(btn);
    });

    document.body.appendChild(btn);
  }

  /** Update button text to show the OTHER language */
  _updateToggleContent(btn) {
    // Show flag + code of the language you CAN switch to
    if (this.currentLang === 'vi') {
      btn.innerHTML = '<span class="lang-toggle__flag">🇬🇧</span><span class="lang-toggle__code">EN</span>';
    } else {
      btn.innerHTML = '<span class="lang-toggle__flag">🇻🇳</span><span class="lang-toggle__code">VI</span>';
    }
  }

  /** Apply translations to all [data-i18n] elements */
  applyLanguage(lang, animate) {
    document.documentElement.lang = lang;
    
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[key] && translations[key][lang]) {
        if (animate) {
          el.style.transition = 'opacity 150ms ease';
          el.style.opacity = '0';
          setTimeout(() => {
            el.textContent = translations[key][lang];
            el.style.opacity = '1';
          }, 150);
        } else {
          el.textContent = translations[key][lang];
        }
      }
    });

    // Update terminal JSON (special case since it's a <pre>)
    const terminalPre = document.querySelector('.terminal-output pre');
    if (terminalPre) {
      const statusText = lang === 'vi' ? 'Sẵn sàng nhận cơ hội mới' : 'Open to opportunities';
      const json = `{
  "name": "Nguyen Phi Anh",
  "role": "Full Stack Developer",
  "school": "UET - VNU",
  "year": 2005,
  "location": "${lang === 'vi' ? 'Hà Nội, Việt Nam' : 'Hanoi, Vietnam'}",
  "email": "npanh0812@gmail.com",
  "github": "github.com/Anhnguyen0812",
  "status": "${statusText}"
}`;
      if (animate) {
        terminalPre.style.transition = 'opacity 150ms ease';
        terminalPre.style.opacity = '0';
        setTimeout(() => {
          terminalPre.textContent = json;
          terminalPre.style.opacity = '1';
        }, 150);
      } else {
        terminalPre.textContent = json;
      }
    }
  }
}

// Boot i18n after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.i18n = new I18n();
});
