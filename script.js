/**
 * Yıldız Yazı - Celestial Text Animation
 * Bu script yıldızların dinamik hareketini ve metin animasyonlarını yönetir
 */

class StarTextAnimation {
    constructor() {
        // Canvas ve context referansları
        this.canvas = document.getElementById('starCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.textInput = document.getElementById('textInput');
        
        // Hidden canvas for text pixel sampling
        this.textRenderCanvas = document.createElement('canvas');
        this.textRenderCtx = this.textRenderCanvas.getContext('2d');
        
        // Animasyon durumu
        this.stars = [];
        this.animationId = null;
        this.isForming = false;
        this.isHovering = false;
        this.currentText = '';
        this.textErased = false; // Metin silinip silinmediğini takip etmek için
        
        // Yıldız renkleri - doğal ve çeşitli tonlar
        this.starColors = [
            { r: 255, g: 255, b: 255, name: 'beyaz' },      // Beyaz
            { r: 255, g: 250, b: 205, name: 'krem' },       // Açık sarı/krem
            { r: 173, g: 216, b: 230, name: 'mavi' },       // Açık mavi
            { r: 255, g: 182, b: 193, name: 'pembe' },      // Açık pembe
            { r: 221, g: 160, b: 221, name: 'mor' },        // Açık mor
            { r: 255, g: 218, b: 185, name: 'turuncu' },    // Açık turuncu
            { r: 144, g: 238, b: 144, name: 'yeşil' }       // Açık yeşil
        ];
        
        // Konfigürasyon - Daha doğal ve optimized animasyonlar
        this.config = {
            starCount: 1000,        // Toplam yıldız sayısı
            starMinSize: 0.8,       // Minimum yıldız boyutu - daha küçük
            starMaxSize: 2.5,       // Maximum yıldız boyutu - daha küçük
            starSpeed: 0.04,        // Yıldızların hareket hızı - daha hızlı
            pixelDensity: 3,        // Text pixel sampling yoğunluğu
            dispersionStrength: 60, // Hover sırasında dağılma kuvveti - daha yumuşak
            twinkleSpeed: 0.008,    // Parıldama hızı - çok daha yavaş ve doğal
        };
        
        this.init();
    }
    
    /**
     * Başlangıç inicializasyonu
     */
    init() {
        this.setupCanvas();
        this.createStars();
        this.setupEventListeners();
        this.startAnimation();
    }
    
    /**
     * Canvas boyutlarını ayarla
     */
    setupCanvas() {
        const resize = () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            
            // Eğer metin varsa yeniden oluştur
            if (this.currentText.trim()) {
                this.generateTextStarTargets(this.currentText);
            }
        };
        
        resize();
        window.addEventListener('resize', resize);
    }
    
    /**
     * Yıldız sınıfı - çok daha doğal ve çeşitli renklerle
     */
    createStarClass() {
        const starColors = this.starColors;
        
        return class Star {
            constructor(x, y, size, alpha, colorIndex) {
                this.x = x;
                this.y = y;
                this.vx = (Math.random() - 0.5) * 0.05; // Daha yavaş rastgele hareket
                this.vy = (Math.random() - 0.5) * 0.05;
                this.size = size;
                this.baseAlpha = alpha;
                this.alpha = alpha;
                this.targetX = x;
                this.targetY = y;
                this.isTextStar = false;
                this.twinkle = Math.random() * Math.PI * 2;
                this.twinkleSpeed = 0.005 + Math.random() * 0.01; // Her yıldız farklı parıldama hızı
                
                // Renk bilgileri
                this.color = starColors[colorIndex];
                this.colorString = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha})`;
                
                // Hareket durumu - basitleştirildi
                this.isMovingToTarget = false;
            }

            draw(ctx) {
                ctx.save();
                
                // Parıldama efektiyle alpha değişimi
                const twinkleAlpha = this.baseAlpha * (0.4 + 0.6 * (Math.sin(this.twinkle) * 0.5 + 0.5));
                this.alpha = twinkleAlpha;
                
                ctx.globalAlpha = this.alpha;
                ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 1)`;
                
                // Soft glow efekti
                ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.8)`;
                ctx.shadowBlur = this.size * 3;
                
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
                ctx.fill();
                
                // İç parlaklık için ikinci bir daire
                ctx.shadowBlur = 0;
                ctx.globalAlpha = this.alpha * 0.8;
                ctx.fillStyle = `rgba(255, 255, 255, 0.6)`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size / 4, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.restore();
            }

            update(canvas, starSpeed, twinkleSpeed) {
                // Hedefe doğru hareket - hızlı ve smooth
                if (Math.abs(this.targetX - this.x) > 0.5 || Math.abs(this.targetY - this.y) > 0.5) {
                    this.x += (this.targetX - this.x) * starSpeed;
                    this.y += (this.targetY - this.y) * starSpeed;
                } else {
                    // Hedefte iken çok hafif rastgele hareket
                    this.x += this.vx * 0.3;
                    this.y += this.vy * 0.3;
                    
                    // Sınır kontrolü
                    if (this.x < 0 || this.x > canvas.width) this.vx *= -0.8;
                    if (this.y < 0 || this.y > canvas.height) this.vy *= -0.8;
                }

                // Her yıldızın kendi parıldama ritmi
                this.twinkle += this.twinkleSpeed;

                // Sınırları kontrol et
                this.x = Math.max(0, Math.min(canvas.width, this.x));
                this.y = Math.max(0, Math.min(canvas.height, this.y));
            }
        };
    }
    
    /**
     * Yıldızları oluştur - renk çeşitliliği ile
     */
    createStars() {
        this.stars = [];
        const StarClass = this.createStarClass();
        
        for (let i = 0; i < this.config.starCount; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            const size = Math.random() * (this.config.starMaxSize - this.config.starMinSize) + this.config.starMinSize;
            const alpha = 0.3 + Math.random() * 0.7; // Daha yumuşak alpha aralığı
            const colorIndex = Math.floor(Math.random() * this.starColors.length);
            
            this.stars.push(new StarClass(x, y, size, alpha, colorIndex));
        }
    }
    
    /**
     * Event listener'ları ayarla
     */
    setupEventListeners() {
        // Text input değişikliklerini dinle
        this.textInput.addEventListener('input', (e) => {
            this.textErased = false; // Kullanıcı yazmaya başladığında reset et
            this.generateTextStarTargets(e.target.value);
        });
        
        // Focus olayları
        this.textInput.addEventListener('focus', () => {
            if (this.textInput.value.trim()) {
                this.textErased = false;
                this.generateTextStarTargets(this.textInput.value);
            }
        });
        
        // Mouse hover efektleri - geliştirilmiş
        this.canvas.addEventListener('mousemove', (e) => {
            this.handleMouseMove(e);
        });
        
        this.canvas.addEventListener('mouseleave', () => {
            this.handleMouseLeave();
        });
    }
    
    /**
     * Mouse hareket işleyici - daha yumuşak hover efekti
     */
    handleMouseMove(e) {
        if (!this.currentText.trim() || this.textErased) return;

        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Metin merkezi koordinatları
        const textYCenter = this.canvas.height / 2;
        const textXCenter = this.canvas.width / 2;
        const hoverRadius = Math.min(this.canvas.width, this.canvas.height) * 0.3;

        const dist = Math.sqrt(Math.pow(mouseX - textXCenter, 2) + Math.pow(mouseY - textYCenter, 2));

        if (dist < hoverRadius && !this.isHovering) {
            this.isHovering = true;
            this.textErased = true;
            
            // Input kutusundaki metni temizle
            this.textInput.value = '';
            
            // Yıldızları hızlıca dağıt
            this.stars.forEach(star => {
                if (star.isTextStar) {
                    star.targetX = Math.random() * this.canvas.width;
                    star.targetY = Math.random() * this.canvas.height;
                    star.isTextStar = false;
                }
            });
            
            // Current text'i de temizle
            this.currentText = '';
        }
    }
    
    /**
     * Mouse canvas'tan çıktığında
     */
    handleMouseLeave() {
        this.isHovering = false;
    }
    
    /**
     * Metinden yıldız pozisyonları oluştur - daha yavaş animasyon ile
     */
    generateTextStarTargets(text) {
        this.currentText = text;
        
        if (!text.trim()) {
            // Metin boşsa tüm yıldızları rastgele pozisyonlara gönder
            this.stars.forEach(star => {
                star.targetX = Math.random() * this.canvas.width;
                star.targetY = Math.random() * this.canvas.height;
                star.isTextStar = false;
            });
            return;
        }

        // Hidden canvas'ı ayarla
        const fontSize = Math.floor(this.canvas.width * 0.1);
        this.textRenderCanvas.width = this.canvas.width;
        this.textRenderCanvas.height = this.canvas.height;
        
        this.textRenderCtx.clearRect(0, 0, this.textRenderCanvas.width, this.textRenderCanvas.height);
        this.textRenderCtx.font = `bold ${fontSize}px Arial`;
        this.textRenderCtx.fillStyle = 'white';
        this.textRenderCtx.textAlign = 'center';
        this.textRenderCtx.textBaseline = 'middle';

        // Metni merkeze yerleştir
        const textX = this.textRenderCanvas.width / 2;
        const textY = this.canvas.height / 2;

        this.textRenderCtx.fillText(text.toUpperCase(), textX, textY);

        // Pixel verilerini al
        const imageData = this.textRenderCtx.getImageData(0, 0, this.textRenderCanvas.width, this.textRenderCanvas.height);
        const data = imageData.data;
        const potentialTargets = [];

        // Pixel sampling
        for (let y = 0; y < this.textRenderCanvas.height; y += this.config.pixelDensity) {
            for (let x = 0; x < this.textRenderCanvas.width; x += this.config.pixelDensity) {
                const index = (y * this.textRenderCanvas.width + x) * 4;
                const alpha = data[index + 3];
                if (alpha > 128) {
                    potentialTargets.push({ x: x, y: y });
                }
            }
        }

        // Hedefleri karıştır
        potentialTargets.sort(() => 0.5 - Math.random());

        // Tüm yıldızları önce text-star olmayan duruma getir
        this.stars.forEach(star => {
            star.isTextStar = false;
        });

        // Yıldızları hedeflere hızlıca ata
        for (let i = 0; i < this.config.starCount; i++) {
            if (i < potentialTargets.length) {
                this.stars[i].targetX = potentialTargets[i].x;
                this.stars[i].targetY = potentialTargets[i].y;
                this.stars[i].isTextStar = true;
            } else {
                this.stars[i].targetX = Math.random() * this.canvas.width;
                this.stars[i].targetY = Math.random() * this.canvas.height;
                this.stars[i].isTextStar = false;
            }
        }
    }
    
    /**
     * Ana animasyon döngüsü
     */
    startAnimation() {
        const animate = () => {
            this.clearCanvas();
            this.updateStars();
            this.drawStars();
            
            this.animationId = requestAnimationFrame(animate);
        };
        
        animate();
    }
    
    /**
     * Canvas'ı temizle
     */
    clearCanvas() {
        // Siyah arka plan ile temizle
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    /**
     * Yıldızları güncelle
     */
    updateStars() {
        this.stars.forEach(star => {
            star.update(this.canvas, this.config.starSpeed, this.config.twinkleSpeed);
        });
    }
    
    /**
     * Yıldızları çiz
     */
    drawStars() {
        this.stars.forEach(star => {
            star.draw(this.ctx);
        });
    }
}

// DOM yüklendiğinde animasyonu başlat
document.addEventListener('DOMContentLoaded', () => {
    new StarTextAnimation();
}); 