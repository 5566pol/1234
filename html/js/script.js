document.addEventListener('DOMContentLoaded', function() {
    // 页面滚动事件
    const container = document.querySelector('.container');
    const pages = document.querySelectorAll('.page');
    const dots = document.querySelectorAll('.dot');
    const copyBtn = document.getElementById('copy-ip');
    const notification = document.getElementById('copy-notification');
    
    // 初始化页面显示
    showPage(0);
    
    // 滚动事件监听
    container.addEventListener('scroll', function() {
        const scrollPosition = container.scrollTop;
        const windowHeight = container.clientHeight;
        const currentPage = Math.round(scrollPosition / windowHeight);
        
        showPage(currentPage);
    });
    
    // 显示指定页面内容
    function showPage(index) {
        // 更新导航点
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // 显示当前页面内容
        pages.forEach((page, i) => {
            const content = page.querySelector('.content');
            if (i === index) {
                setTimeout(() => {
                    content.classList.add('fade-in');
                }, 300);
            } else {
                content.classList.remove('fade-in');
            }
        });
    }
    
    // 导航点点击事件
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            container.scrollTo({
                top: index * container.clientHeight,
                behavior: 'smooth'
            });
        });
    });
    
    // 复制IP按钮事件
    copyBtn.addEventListener('click', function() {
        const ip = 'server.5566pol.top';
        navigator.clipboard.writeText(ip)
            .then(() => {
                notification.classList.add('show');
                setTimeout(() => {
                    notification.classList.remove('show');
                }, 2000);
            })
            .catch(err => {
                console.error('复制失败:', err);
                notification.textContent = '复制失败，请手动复制';
                notification.style.background = 'rgba(244, 67, 54, 0.9)';
                notification.classList.add('show');
                setTimeout(() => {
                    notification.classList.remove('show');
                    notification.style.background = '';
                    notification.textContent = '服务器IP已复制!';
                }, 2000);
            });
    });
    
    // 键盘导航
    document.addEventListener('keydown', function(e) {
        const currentPage = Math.round(container.scrollTop / container.clientHeight);
        let targetPage = currentPage;
        
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            targetPage = Math.min(pages.length - 1, currentPage + 1);
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            targetPage = Math.max(0, currentPage - 1);
        } else if (e.key === 'Home') {
            targetPage = 0;
        } else if (e.key === 'End') {
            targetPage = pages.length - 1;
        }
        
        if (targetPage !== currentPage) {
            container.scrollTo({
                top: targetPage * container.clientHeight,
                behavior: 'smooth'
            });
            e.preventDefault();
        }
    });
});
// 获取服务器状态
const serverIp = "mm.rainplay.cn"; 
const serverPort = 40935; 

async function fetchServerStatus() {
    try {
        const response = await fetch(`https://api.mcsrvstat.us/3/${serverIp}:${serverPort}`);
        const data = await response.json();

        if (data.online) {
            const playersOnline = data.players.online;
            const maxPlayers = data.players.max;
            const serverStatusElement = document.getElementById('server-status');
            serverStatusElement.textContent = `服务器在线人数：${playersOnline}/${maxPlayers}`;
        } else {
            const serverStatusElement = document.getElementById('server-status');
            serverStatusElement.textContent = '服务器离线';
        }
    } catch (error) {
        console.error('获取服务器状态时出错：', error);
    }
}

fetchServerStatus();