// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 创建飘动的爱心
    createFloatingHearts();
    
    // 每隔一段时间生成新的飘动爱心
    setInterval(createFloatingHearts, 3000);
    
    // 计算在一起的时间并实时更新
    updateLoveCounter();
    // 每秒更新一次计时器
    setInterval(updateLoveCounter, 1000);
    
    // 添加页面互动效果
    addPageInteractions();
});

// 上传小程序码
function loadQRCode(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const qrcode = document.getElementById('qrcode');
        
        // 清空占位符
        qrcode.innerHTML = '';
        
        // 创建图片元素
        const img = document.createElement('img');
        img.src = e.target.result;
        img.alt = '小程序码';
        
        // 添加到DOM中
        qrcode.appendChild(img);
        
        // 保存到localStorage以便刷新后保留
        localStorage.setItem('qrcode', e.target.result);
        
        // 显示上传成功的可爱提示
        showCuteToast('小程序码上传成功啦！');
    };
    
    reader.readAsDataURL(file);
}

// 上传照片
function addPhotos(event) {
    const files = event.target.files;
    if (!files.length) return;
    
    const memoryContainer = document.querySelector('.memory-container');
    const existingPhotos = localStorage.getItem('photos') ? JSON.parse(localStorage.getItem('photos')) : [];
    
    // 添加新照片
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            // 保存照片到localStorage
            existingPhotos.push(e.target.result);
            localStorage.setItem('photos', JSON.stringify(existingPhotos));
            
            // 更新界面
            updatePhotoDisplay();
            
            // 如果是最后一张照片，显示上传成功提示
            if (i === files.length - 1) {
                showCuteToast(`${files.length}张甜蜜照片上传成功！`);
            }
        };
        
        reader.readAsDataURL(file);
    }
}

// 更新照片显示
function updatePhotoDisplay() {
    const memoryContainer = document.querySelector('.memory-container');
    const photos = localStorage.getItem('photos') ? JSON.parse(localStorage.getItem('photos')) : [];
    
    // 清空容器
    memoryContainer.innerHTML = '';
    
    // 添加所有照片
    photos.forEach((photo, index) => {
        const memoryItem = document.createElement('div');
        memoryItem.className = 'memory-item';
        memoryItem.style.animationDelay = `${index * 0.2}s`;
        
        // 随机旋转角度，让照片更加生动
        const rotateAngle = Math.random() * 10 - 5;
        memoryItem.style.transform = `rotate(${rotateAngle}deg)`;
        
        const img = document.createElement('img');
        img.src = photo;
        img.alt = `回忆照片${index + 1}`;
        
        // 点击照片放大查看
        img.addEventListener('click', function() {
            showLightbox(photo);
        });
        
        memoryItem.appendChild(img);
        memoryContainer.appendChild(memoryItem);
    });
    
    // 如果没有照片，显示占位符
    if (photos.length === 0) {
        const placeholders = [
            "我们的第一张合照", 
            "肉宝最可爱的瞬间", 
            "一起吃的第一顿火锅"
        ];
        
        for (let i = 0; i < 3; i++) {
            const memoryItem = document.createElement('div');
            memoryItem.className = 'memory-item';
            
            const placeholder = document.createElement('div');
            placeholder.className = 'memory-placeholder';
            placeholder.textContent = placeholders[i] || `第${i + 1}张回忆照片`;
            
            memoryItem.appendChild(placeholder);
            memoryContainer.appendChild(memoryItem);
        }
    }
}

// 创建飘动的爱心
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.hearts');
    const windowWidth = window.innerWidth;
    
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            
            // 随机大小
            const size = Math.floor(Math.random() * 20) + 10;
            heart.style.width = `${size}px`;
            heart.style.height = `${size}px`;
            
            // 随机位置
            const leftPos = Math.floor(Math.random() * windowWidth);
            heart.style.left = `${leftPos}px`;
            heart.style.bottom = '0';
            
            // 随机颜色
            const colors = ['#ff4d6d', '#ff75a0', '#ff758f', '#ffb3c1', '#ff0a54'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            heart.style.backgroundColor = color;
            
            // 添加CSS样式
            heart.style.position = 'absolute';
            heart.style.transform = 'rotate(-45deg)';
            heart.style.animation = `float-up ${Math.random() * 5 + 5}s linear forwards`;
            
            // 添加伪元素
            heart.innerHTML = `
                <style>
                    .floating-heart:before, .floating-heart:after {
                        content: "";
                        background-color: ${color};
                        border-radius: 50%;
                        position: absolute;
                        width: 100%;
                        height: 100%;
                    }
                    .floating-heart:before {
                        top: -50%;
                        left: 0;
                    }
                    .floating-heart:after {
                        left: 50%;
                        top: 0;
                    }
                </style>
            `;
            
            // 添加到DOM
            heartsContainer.appendChild(heart);
            
            // 动画结束后移除元素
            setTimeout(() => {
                heart.remove();
            }, 10000);
        }, i * 300);
    }
}

// 更新爱情计时器
function updateLoveCounter() {
    // 设置在一起的开始日期: 2023年2月12日
    const startDate = new Date('2023-02-12T00:00:00+08:00'); // 使用中国时区
    
    // 获取当前时间
    const now = new Date();
    const timeDiff = now - startDate;
    
    // 计算天数
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    // 计算剩余小时
    const remainingTime = timeDiff % (1000 * 60 * 60 * 24);
    const hours = Math.floor(remainingTime / (1000 * 60 * 60));
    
    // 计算剩余分钟
    const remainingTimeAfterHours = remainingTime % (1000 * 60 * 60);
    const minutes = Math.floor(remainingTimeAfterHours / (1000 * 60));
    
    // 计算剩余秒数
    const remainingTimeAfterMinutes = remainingTimeAfterHours % (1000 * 60);
    const seconds = Math.floor(remainingTimeAfterMinutes / 1000);
    
    // 更新DOM并添加动画
    updateCounterWithAnimation('days', days);
    updateCounterWithAnimation('hours', hours);
    updateCounterWithAnimation('minutes', minutes);
    updateCounterWithAnimation('seconds', seconds);
}

// 带动画效果的计数器更新
function updateCounterWithAnimation(id, newValue) {
    const element = document.getElementById(id);
    if (!element) return;
    
    const currentValue = parseInt(element.textContent, 10);
    
    // 如果值不同，添加动画效果
    if (currentValue !== newValue) {
        element.textContent = newValue;
        
        // 添加更新动画
        element.classList.add('update-animation');
        
        // 动画结束后移除类
        setTimeout(() => {
            element.classList.remove('update-animation');
        }, 500);
    } else {
        element.textContent = newValue;
    }
}

// 显示照片灯箱
function showLightbox(imageSrc) {
    // 创建灯箱容器
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.position = 'fixed';
    lightbox.style.top = '0';
    lightbox.style.left = '0';
    lightbox.style.width = '100%';
    lightbox.style.height = '100%';
    lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    lightbox.style.display = 'flex';
    lightbox.style.justifyContent = 'center';
    lightbox.style.alignItems = 'center';
    lightbox.style.zIndex = '1000';
    
    // 创建图片元素
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = '放大查看';
    img.style.maxWidth = '90%';
    img.style.maxHeight = '90%';
    img.style.objectFit = 'contain';
    img.style.border = '5px solid white';
    img.style.borderRadius = '10px';
    
    // 创建关闭按钮
    const closeBtn = document.createElement('div');
    closeBtn.textContent = '×';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '20px';
    closeBtn.style.right = '20px';
    closeBtn.style.color = 'white';
    closeBtn.style.fontSize = '30px';
    closeBtn.style.cursor = 'pointer';
    
    // 点击关闭灯箱
    lightbox.addEventListener('click', function() {
        document.body.removeChild(lightbox);
    });
    
    // 添加元素到灯箱
    lightbox.appendChild(img);
    lightbox.appendChild(closeBtn);
    
    // 添加灯箱到body
    document.body.appendChild(lightbox);
}

// 显示可爱提示
function showCuteToast(message) {
    // 创建提示容器
    const toast = document.createElement('div');
    toast.className = 'cute-toast';
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = '#ff75a0';
    toast.style.color = 'white';
    toast.style.padding = '12px 20px';
    toast.style.borderRadius = '30px';
    toast.style.boxShadow = '0 4px 12px rgba(255, 105, 180, 0.5)';
    toast.style.zIndex = '1000';
    toast.style.fontWeight = 'bold';
    toast.style.fontSize = '16px';
    
    // 添加随机可爱表情
    const emojis = ['❤️', '✨', '🌸', '🎀', '💕', '🥰'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    toast.textContent = `${randomEmoji} ${message}`;
    
    // 添加到body
    document.body.appendChild(toast);
    
    // 3秒后移除
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 500);
    }, 3000);
}

// 添加页面互动效果
function addPageInteractions() {
    // 点击标题文字产生爱心
    document.querySelector('h1').addEventListener('click', function(e) {
        createHeartAtPosition(e.clientX, e.clientY);
    });
    
    // 点击小肉宝昵称产生爱心雨
    document.querySelectorAll('.nickname').forEach(elem => {
        elem.addEventListener('click', function() {
            createHeartsRain();
        });
    });
    
    // 长按页面任何地方产生爱心爆炸
    let pressTimer;
    document.body.addEventListener('mousedown', function(e) {
        pressTimer = setTimeout(() => {
            createHeartExplosion(e.clientX, e.clientY);
        }, 500);
    });
    
    document.body.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
    
    // 移动端触摸事件
    document.body.addEventListener('touchstart', function(e) {
        pressTimer = setTimeout(() => {
            const touch = e.touches[0];
            createHeartExplosion(touch.clientX, touch.clientY);
        }, 500);
    });
    
    document.body.addEventListener('touchend', function() {
        clearTimeout(pressTimer);
    });
}

// 在指定位置创建爱心
function createHeartAtPosition(x, y) {
    const heart = document.createElement('div');
    heart.className = 'click-heart';
    heart.style.position = 'absolute';
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.width = '20px';
    heart.style.height = '20px';
    heart.style.backgroundColor = '#ff4d6d';
    heart.style.transform = 'translate(-50%, -50%) rotate(-45deg)';
    heart.style.animation = 'pulse-out 1s forwards';
    heart.style.zIndex = '999';
    
    // 添加伪元素
    heart.innerHTML = `
        <style>
            .click-heart:before, .click-heart:after {
                content: "";
                background-color: #ff4d6d;
                border-radius: 50%;
                position: absolute;
                width: 100%;
                height: 100%;
            }
            .click-heart:before {
                top: -50%;
                left: 0;
            }
            .click-heart:after {
                left: 50%;
                top: 0;
            }
            @keyframes pulse-out {
                0% { transform: translate(-50%, -50%) rotate(-45deg) scale(0); }
                50% { transform: translate(-50%, -50%) rotate(-45deg) scale(1.2); }
                100% { transform: translate(-50%, -50%) rotate(-45deg) scale(1); opacity: 0; }
            }
        </style>
    `;
    
    document.body.appendChild(heart);
    
    // 动画结束后移除
    setTimeout(() => {
        document.body.removeChild(heart);
    }, 1000);
}

// 创建爱心雨
function createHeartsRain() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'rain-heart';
            
            const size = Math.random() * 20 + 10;
            const left = Math.random() * 100;
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 2;
            
            heart.style.position = 'fixed';
            heart.style.width = `${size}px`;
            heart.style.height = `${size}px`;
            heart.style.left = `${left}%`;
            heart.style.top = '-50px';
            heart.style.backgroundColor = '#ff4d6d';
            heart.style.transform = 'rotate(-45deg)';
            heart.style.animation = `heart-rain ${duration}s linear ${delay}s forwards`;
            heart.style.zIndex = '100';
            
            // 添加伪元素
            heart.innerHTML = `
                <style>
                    .rain-heart:before, .rain-heart:after {
                        content: "";
                        background-color: #ff4d6d;
                        border-radius: 50%;
                        position: absolute;
                        width: 100%;
                        height: 100%;
                    }
                    .rain-heart:before {
                        top: -50%;
                        left: 0;
                    }
                    .rain-heart:after {
                        left: 50%;
                        top: 0;
                    }
                    @keyframes heart-rain {
                        0% { top: -50px; opacity: 1; }
                        80% { opacity: 0.8; }
                        100% { top: 110vh; opacity: 0; }
                    }
                </style>
            `;
            
            document.body.appendChild(heart);
            
            // 动画结束后移除
            setTimeout(() => {
                if (document.body.contains(heart)) {
                    document.body.removeChild(heart);
                }
            }, (duration + delay) * 1000);
        }, i * 100);
    }
}

// 创建爱心爆炸效果
function createHeartExplosion(x, y) {
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'explosion-heart';
        
        const size = Math.random() * 15 + 5;
        const angle = Math.random() * 360;
        const distance = Math.random() * 100 + 50;
        
        heart.style.position = 'fixed';
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.style.backgroundColor = '#ff4d6d';
        heart.style.transform = 'translate(-50%, -50%) rotate(-45deg)';
        heart.style.animation = `heart-explode 1.5s forwards`;
        heart.style.zIndex = '100';
        
        // 添加伪元素
        heart.innerHTML = `
            <style>
                .explosion-heart:before, .explosion-heart:after {
                    content: "";
                    background-color: #ff4d6d;
                    border-radius: 50%;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                }
                .explosion-heart:before {
                    top: -50%;
                    left: 0;
                }
                .explosion-heart:after {
                    left: 50%;
                    top: 0;
                }
                @keyframes heart-explode {
                    0% { transform: translate(-50%, -50%) rotate(-45deg) scale(0); opacity: 1; }
                    50% { opacity: 1; }
                    100% { 
                        transform: translate(
                            calc(-50% + ${Math.cos(angle * Math.PI / 180) * distance}px), 
                            calc(-50% + ${Math.sin(angle * Math.PI / 180) * distance}px)
                        ) rotate(-45deg) scale(1); 
                        opacity: 0; 
                    }
                }
            </style>
        `;
        
        document.body.appendChild(heart);
        
        // 动画结束后移除
        setTimeout(() => {
            if (document.body.contains(heart)) {
                document.body.removeChild(heart);
            }
        }, 1500);
    }
    
    // 震动效果
    const container = document.querySelector('.container');
    container.style.animation = 'shake 0.5s';
    
    // 添加震动动画
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
    
    // 移除震动效果
    setTimeout(() => {
        container.style.animation = '';
    }, 500);
}

// 从localStorage中恢复数据
function restoreFromStorage() {
    // 恢复小程序码
    const savedQRCode = localStorage.getItem('qrcode');
    if (savedQRCode) {
        const qrcode = document.getElementById('qrcode');
        qrcode.innerHTML = '';
        
        const img = document.createElement('img');
        img.src = savedQRCode;
        img.alt = '小程序码';
        qrcode.appendChild(img);
    }
    
    // 恢复照片
    updatePhotoDisplay();
}

// 页面加载时恢复数据
window.addEventListener('load', restoreFromStorage); 