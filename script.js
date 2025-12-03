// 主题切换
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// 加载保存的主题
const savedTheme = localStorage.getItem('vimCheatSheetTheme') || 'light';
if (savedTheme === 'dark') {
    html.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️ 亮色模式';
}

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        html.removeAttribute('data-theme');
        themeToggle.textContent = '🌙 暗色模式';
        localStorage.setItem('vimCheatSheetTheme', 'light');
    } else {
        html.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️ 亮色模式';
        localStorage.setItem('vimCheatSheetTheme', 'dark');
    }
});

// 渲染数据
function renderContent() {
    // 渲染快速命令
    const quickGrid = document.getElementById('quick-grid');
    if (quickGrid && vimData.quickCommands) {
        quickGrid.innerHTML = vimData.quickCommands.map(item => `
            <div class="quick-item" data-cmd="${item.cmd}">
                <div class="cmd">${item.cmd}</div>
                <div class="desc">${item.desc}</div>
            </div>
        `).join('');
    }

    // 渲染主要章节
    const container = document.getElementById('main-container');
    if (container && vimData.sections) {
        // 清除旧的 section
        container.innerHTML = '';

        vimData.sections.forEach(section => {
            const sectionEl = document.createElement('div');
            sectionEl.className = 'section';
            sectionEl.id = section.id; // Add ID to section for anchor links
            sectionEl.dataset.section = section.id;

            const rows = section.items.map(item => `
                <tr>
                    <td><span class="command" data-copy="${item.cmd}">${item.cmd}</span></td>
                    <td>${item.desc}</td>
                </tr>
            `).join('');

            const noteHtml = section.note ? `<div class="note">${section.note}</div>` : '';

            sectionEl.innerHTML = `
                <div class="section-header">
                    <h2>${section.title}</h2>
                    <span class="toggle-icon">▼</span>
                </div>
                <div class="section-content">
                    <table>
                        <thead>
                            <tr>
                                <th style="width: 30%;">命令</th>
                                <th>作用</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rows}
                        </tbody>
                    </table>
                    ${noteHtml}
                </div>
            `;
            container.appendChild(sectionEl);
        });
    }
}

// 初始化渲染
renderContent();

// 重新绑定事件监听器
function attachEventListeners() {
    // 折叠/展开功能
    document.querySelectorAll('.section-header').forEach(header => {
        header.addEventListener('click', () => {
            const section = header.closest('.section');
            const content = section.querySelector('.section-content');
            const icon = header.querySelector('.toggle-icon');

            content.classList.toggle('collapsed');
            icon.classList.toggle('collapsed');

            // 保存折叠状态
            const sectionId = section.dataset.section;
            const isCollapsed = content.classList.contains('collapsed');
            localStorage.setItem(`vimSection_${sectionId}`, isCollapsed ? 'collapsed' : 'expanded');
        });
    });

    // 加载保存的折叠状态
    document.querySelectorAll('.section').forEach(section => {
        const sectionId = section.dataset.section;
        const savedState = localStorage.getItem(`vimSection_${sectionId}`);
        if (savedState === 'collapsed') {
            const content = section.querySelector('.section-content');
            const icon = section.querySelector('.toggle-icon');
            if (content && icon) {
                content.classList.add('collapsed');
                icon.classList.add('collapsed');
            }
        }
    });

    // 点击命令复制
    document.querySelectorAll('.command[data-copy]').forEach(cmd => {
        cmd.addEventListener('click', () => {
            copyToClipboard(cmd.dataset.copy);
        });
    });

    // 快速命令点击
    document.querySelectorAll('.quick-item').forEach(item => {
        item.addEventListener('click', () => {
            const cmd = item.dataset.cmd;
            copyToClipboard(cmd);

            // 滚动到对应的命令
            const rows = document.querySelectorAll('tbody tr');
            for (let row of rows) {
                const cmdCell = row.querySelector('.command');
                if (cmdCell && (cmdCell.dataset.copy === cmd || cmdCell.textContent.includes(cmd))) {
                    cmdCell.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    row.classList.add('highlight');
                    setTimeout(() => row.classList.remove('highlight'), 1000);

                    const section = row.closest('.section');
                    const content = section.querySelector('.section-content');
                    const header = section.querySelector('.section-header');
                    if (content.classList.contains('collapsed')) {
                        header.click();
                    }
                    break;
                }
            }
        });
    });
}

attachEventListeners();

// 搜索功能
const searchBox = document.getElementById('searchBox');
let searchTimeout;

searchBox.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    const query = e.target.value.toLowerCase().trim();

    searchTimeout = setTimeout(() => {
        const rows = document.querySelectorAll('tbody tr');
        let hasResults = false;

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            if (query === '' || text.includes(query)) {
                row.classList.remove('hidden');
                if (query && text.includes(query)) {
                    row.classList.add('highlight');
                    setTimeout(() => row.classList.remove('highlight'), 1000);
                }
                hasResults = true;
            } else {
                row.classList.add('hidden');
            }
        });

        // 显示空状态
        document.querySelectorAll('.section').forEach(section => {
            const tbody = section.querySelector('tbody');
            if (tbody) {
                const visibleRows = Array.from(tbody.querySelectorAll('tr:not(.hidden)')).length;
                if (query && visibleRows === 0) {
                    if (!tbody.querySelector('.empty-state')) {
                        const emptyDiv = document.createElement('div');
                        emptyDiv.className = 'empty-state';
                        emptyDiv.textContent = '未找到匹配的命令';
                        tbody.appendChild(emptyDiv);
                    }
                } else {
                    const emptyDiv = tbody.querySelector('.empty-state');
                    if (emptyDiv) emptyDiv.remove();
                }
            }
        });
    }, 300);
});

// Ctrl+F 聚焦搜索框
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        searchBox.focus();
        searchBox.select();
    }
    // Esc 清空搜索
    if (e.key === 'Escape' && document.activeElement === searchBox) {
        searchBox.value = '';
        searchBox.dispatchEvent(new Event('input'));
        searchBox.blur();
    }
});

// 复制功能
const copyToast = document.getElementById('copyToast');

function showCopyToast() {
    copyToast.classList.add('show');
    setTimeout(() => {
        copyToast.classList.remove('show');
    }, 2000);
}

function copyToClipboard(text) {
    const cleanText = text.split('/')[0].split(',')[0].trim();

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(cleanText).then(() => {
            showCopyToast();
        }).catch(() => {
            fallbackCopy(cleanText);
        });
    } else {
        fallbackCopy(cleanText);
    }
}

function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        showCopyToast();
    } catch (err) {
        console.error('复制失败', err);
    }
    document.body.removeChild(textarea);
}

// 平滑滚动 & 导航高亮 (Scroll Spy)
const navLinks = document.querySelectorAll('.nav-item');
const mainContent = document.querySelector('.main-content');

// 点击导航
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        const targetId = href.substring(1);
        const target = document.getElementById(targetId);

        if (target) {
            // 移动端关闭菜单
            if (window.innerWidth <= 768) {
                document.querySelector('.sidebar').classList.remove('open');
                document.querySelector('.sidebar-overlay')?.classList.remove('show');
            }

            // 滚动到目标
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // 更新高亮
            navLinks.forEach(n => n.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

// 滚动监听
mainContent.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('.section, .quick-commands-card');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        // 调整偏移量以匹配视觉
        if (mainContent.scrollTop >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// 移动端菜单
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const sidebar = document.querySelector('.sidebar');

// 创建遮罩层
const overlay = document.createElement('div');
overlay.className = 'sidebar-overlay';
document.body.appendChild(overlay);

function toggleMenu() {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
}

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMenu);
}

overlay.addEventListener('click', toggleMenu);
