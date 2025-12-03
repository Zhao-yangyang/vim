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

// 折叠/展开功能
function toggleSection(header) {
    const section = header.closest('.section');
    const content = section.querySelector('.section-content');
    const icon = header.querySelector('.toggle-icon');
    
    content.classList.toggle('collapsed');
    icon.classList.toggle('collapsed');

    // 保存折叠状态
    const sectionId = section.dataset.section;
    const isCollapsed = content.classList.contains('collapsed');
    localStorage.setItem(`vimSection_${sectionId}`, isCollapsed ? 'collapsed' : 'expanded');
}

// 加载保存的折叠状态
document.querySelectorAll('.section').forEach(section => {
    const sectionId = section.dataset.section;
    const savedState = localStorage.getItem(`vimSection_${sectionId}`);
    if (savedState === 'collapsed') {
        const content = section.querySelector('.section-content');
        const icon = section.querySelector('.toggle-icon');
        content.classList.add('collapsed');
        icon.classList.add('collapsed');
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
    // 清理文本（移除 / 前后的内容）
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
        rows.forEach(row => {
            const cmdCell = row.querySelector('.command[data-copy="' + cmd + '"]');
            if (cmdCell) {
                cmdCell.scrollIntoView({ behavior: 'smooth', block: 'center' });
                row.classList.add('highlight');
                setTimeout(() => row.classList.remove('highlight'), 1000);
                
                // 展开对应的章节
                const section = row.closest('.section');
                const content = section.querySelector('.section-content');
                if (content.classList.contains('collapsed')) {
                    toggleSection(section.querySelector('.section-header'));
                }
            }
        });
    });
});

// 平滑滚动
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const href = btn.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

