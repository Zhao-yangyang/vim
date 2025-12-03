const vimData = {
    quickCommands: [
        { cmd: "i", desc: "插入模式" },
        { cmd: "Esc", desc: "返回普通模式" },
        { cmd: ":wq", desc: "保存并退出" },
        { cmd: "dd", desc: "删除当前行" },
        { cmd: "yy", desc: "复制当前行" },
        { cmd: "p", desc: "粘贴" },
        { cmd: "u", desc: "撤销" },
        { cmd: "gg", desc: "跳到文件开头" },
        { cmd: "G", desc: "跳到文件末尾" },
        { cmd: "/", desc: "搜索" }
    ],
    sections: [
        {
            id: "mode-switch",
            title: "模式切换",
            items: [
                { cmd: "Esc", desc: "从任何模式切换回 <strong>普通模式</strong>。" },
                { cmd: "i", desc: "切换到 <strong>插入模式</strong>，在光标前插入。" },
                { cmd: "a", desc: "切换到 <strong>插入模式</strong>，在光标后插入 (append)。" },
                { cmd: "o", desc: "切换到 <strong>插入模式</strong>，在当前行下方插入新行。" },
                { cmd: "v", desc: "切换到 <strong>可视模式</strong> (字符选择)。" },
                { cmd: ":", desc: "切换到 <strong>命令行模式</strong>。" },
                { cmd: "I", desc: "切换到插入模式，在行首（非空白字符）插入。" },
                { cmd: "A", desc: "切换到插入模式，在行尾插入。" },
                { cmd: "O", desc: "切换到插入模式，在当前行上方插入新行。" },
                { cmd: "S", desc: "删除整行并进入插入模式（同 cc）。" },
                { cmd: "R", desc: "进入替换模式（覆盖模式）。" },
                { cmd: "V", desc: "切换到可视模式（行选择）。" },
                { cmd: "Ctrl + v", desc: "切换到可视模式（块选择/列选择）。" }
            ]
        },
        {
            id: "cursor-move",
            title: "光标移动",
            items: [
                { cmd: "h, j, k, l", desc: "左、下、上、右移动一个字符。" },
                { cmd: "w / b", desc: "跳到下一个单词开头 / 跳到上一个单词开头。" },
                { cmd: "0 / $", desc: "跳到行首（包括空格） / 跳到行尾。" },
                { cmd: "^", desc: "跳到行首第一个非空白字符。" },
                { cmd: "gg / G", desc: "跳到文件第一行 / 跳到文件最后一行。" },
                { cmd: "Ctrl + f / Ctrl + b", desc: "向下翻一整屏 / 向上翻一整屏。" },
                { cmd: "e / E", desc: "跳到单词末尾（小写单词）/ 跳到单词末尾（大写单词）。" },
                { cmd: "ge / gE", desc: "跳到上一个单词末尾（小写单词）/ 跳到上一个单词末尾（大写单词）。" },
                { cmd: "H / M / L", desc: "跳到屏幕顶部 / 跳到屏幕中间 / 跳到屏幕底部。" },
                { cmd: "Ctrl + d / Ctrl + u", desc: "向下翻半屏 / 向上翻半屏。" },
                { cmd: "Ctrl + e / Ctrl + y", desc: "屏幕向下滚动一行 / 屏幕向上滚动一行。" }
            ]
        },
        {
            id: "cursor-advanced",
            title: "高级光标移动",
            items: [
                { cmd: "f字符 / F字符", desc: "在同一行向前跳到指定字符 / 向后跳到指定字符。" },
                { cmd: "t字符 / T字符", desc: "在同一行向前跳到指定字符前 / 向后跳到指定字符后。" },
                { cmd: "; / ,", desc: "重复上次 f/t/F/T 命令（同方向）/ 反向重复。" },
                { cmd: "%", desc: "在配对的括号/大括号之间跳转：() [] {}。" },
                { cmd: "( / )", desc: "跳到上一个句子开头 / 跳到下一个句子开头。" },
                { cmd: "{ / }", desc: "跳到上一个段落开头 / 跳到下一个段落开头。" },
                { cmd: "[ / ]", desc: "跳到上一个区块开头（代码块等）/ 跳到下一个区块开头。" },
                { cmd: "* / #", desc: "向前搜索光标下的单词 / 向后搜索光标下的单词。" },
                { cmd: "g* / g#", desc: "向前搜索包含光标下单词的词 / 向后搜索包含光标下单词的词。" },
                { cmd: "Ctrl + o", desc: "跳转到跳转列表中的上一个位置。" },
                { cmd: "Ctrl + i / Tab", desc: "跳转到跳转列表中的下一个位置。" }
            ]
        },
        {
            id: "edit",
            title: "编辑 (删除、修改、复制、粘贴)",
            items: [
                { cmd: "x", desc: "删除光标下的字符。" },
                { cmd: "dd", desc: "<strong>删除</strong>（剪切）当前行。" },
                { cmd: "dw", desc: "删除从光标到单词末尾。" },
                { cmd: "D", desc: "删除从光标到行尾 (同 d$)。" },
                { cmd: "yy", desc: "<strong>复制</strong> (yank) 当前行。" },
                { cmd: "p", desc: "在光标<strong>下方</strong>粘贴（如果是行）或光标<strong>后</strong>粘贴（如果是字符）。" },
                { cmd: "P", desc: "在光标<strong>上方</strong>粘贴（如果是行）或光标<strong>前</strong>粘贴（如果是字符）。" },
                { cmd: "r", desc: "替换光标下的单个字符。" },
                { cmd: "cw", desc: "更改从光标到单词末尾，并切换到插入模式。" },
                { cmd: "cc", desc: "更改整行 (删除内容并进入插入模式)。" },
                { cmd: "u", desc: "<strong>撤销</strong>上一个操作 (undo)。" },
                { cmd: "Ctrl + r", desc: "<strong>重做</strong>撤销的操作 (redo)。" },
                { cmd: ".", desc: "<strong>重复</strong>上一个修改命令。" },
                { cmd: "J", desc: "合并当前行和下一行（删除换行符）。" },
                { cmd: "gJ", desc: "合并当前行和下一行（保留空格）。" },
                { cmd: "~", desc: "切换光标下字符的大小写并右移。" },
                { cmd: "gu / gU", desc: "转换为小写 / 转换为大写（需配合移动命令，如 guw）。" },
                { cmd: "g~", desc: "切换大小写（需配合移动命令）。" },
                { cmd: ">> / <<", desc: "向右缩进当前行 / 向左缩进当前行。" },
                { cmd: "==", desc: "自动缩进当前行。" },
                { cmd: "Ctrl + a / Ctrl + x", desc: "增加光标下的数字 / 减少光标下的数字。" }
            ]
        },
        {
            id: "text-objects",
            title: "文本对象操作",
            note: "<strong>💡 文本对象语法：</strong> [操作] + [a/i] + [对象]。<br><strong>a</strong> = around（包含分隔符），<strong>i</strong> = inside（不包含分隔符）。<br>常用对象：w(词), s(句), p(段), \"(双引号), '(单引号), (, [, {, t(标签), &lt; &gt; 等。",
            items: [
                { cmd: "diw / ciw", desc: "删除/更改光标下的单词（不包含空格）。" },
                { cmd: "daw / caw", desc: "删除/更改光标下的单词（包含前后空格）。" },
                { cmd: "dis / cis", desc: "删除/更改当前句子。" },
                { cmd: "dip / cip", desc: "删除/更改当前段落。" },
                { cmd: "di\" / ci\"", desc: "删除/更改双引号内的内容（光标在引号内）。" },
                { cmd: "da\" / ca\"", desc: "删除/更改双引号及内容（光标在引号内）。" },
                { cmd: "di( / ci(", desc: "删除/更改括号内的内容（可用 b 代替）。" },
                { cmd: "di[ / ci[", desc: "删除/更改方括号内的内容（可用 [ 代替）。" },
                { cmd: "di{ / ci{", desc: "删除/更改大括号内的内容（可用 B 代替）。" },
                { cmd: "dit / cit", desc: "删除/更改 HTML/XML 标签内的内容。" },
                { cmd: "dat / cat", desc: "删除/更改 HTML/XML 标签及内容。" },
                { cmd: "yi\" / ya\"", desc: "复制引号内的内容 / 复制引号及内容（类似 di/da）。" }
            ]
        },
        {
            id: "visual-mode",
            title: "可视模式高级操作",
            items: [
                { cmd: "v", desc: "进入字符选择可视模式。" },
                { cmd: "V", desc: "进入行选择可视模式。" },
                { cmd: "Ctrl + v", desc: "进入块选择可视模式（列选择）。" },
                { cmd: "o", desc: "在可视模式下，切换选择的起始/结束端。" },
                { cmd: "gv", desc: "重新选择上次的可视区域。" },
                { cmd: "> / <", desc: "在可视模式下，向右缩进选中内容 / 向左缩进。" },
                { cmd: "=", desc: "在可视模式下，自动缩进选中内容。" },
                { cmd: "gu / gU", desc: "在可视模式下，转换为小写 / 转换为大写。" },
                { cmd: "~", desc: "在可视模式下，切换选中内容的大小写。" },
                { cmd: "J", desc: "在可视模式下，合并选中的行。" },
                { cmd: ":", desc: "在可视模式下，对选中内容执行命令（如 :s/old/new/g）。" }
            ]
        },
        {
            id: "search",
            title: "查找和替换 (命令行模式)",
            items: [
                { cmd: "/搜索内容", desc: "向下搜索指定内容。" },
                { cmd: "n / N", desc: "下一个匹配项 / 上一个匹配项。" },
                { cmd: ":s/旧/新/", desc: "替换<strong>当前行</strong>第一个匹配的文本。" },
                { cmd: ":%s/旧/新/g", desc: "<strong>替换文件中所有</strong>匹配的文本。" },
                { cmd: "?搜索内容", desc: "向上搜索指定内容。" },
                { cmd: ":s/旧/新/g", desc: "替换当前行所有匹配（g = global）。" },
                { cmd: ":s/旧/新/c", desc: "替换时确认（c = confirm）。" },
                { cmd: ":5,10s/旧/新/g", desc: "替换第 5-10 行的所有匹配。" },
                { cmd: ":%s/旧/新/gc", desc: "全文件替换并逐个确认。" },
                { cmd: ":noh", desc: "取消搜索高亮显示。" }
            ]
        },
        {
            id: "windows",
            title: "窗口和分屏",
            items: [
                { cmd: ":split / :sp", desc: "水平分割窗口。" },
                { cmd: ":vsplit / :vsp", desc: "垂直分割窗口。" },
                { cmd: ":new", desc: "水平分割并打开新文件。" },
                { cmd: ":vnew", desc: "垂直分割并打开新文件。" },
                { cmd: "Ctrl + w s", desc: "水平分割当前窗口。" },
                { cmd: "Ctrl + w v", desc: "垂直分割当前窗口。" },
                { cmd: "Ctrl + w h/j/k/l", desc: "切换到左/下/上/右窗口。" },
                { cmd: "Ctrl + w w", desc: "循环切换到下一个窗口。" },
                { cmd: "Ctrl + w q / :q", desc: "关闭当前窗口。" },
                { cmd: "Ctrl + w o", desc: "关闭其他所有窗口（只保留当前）。" },
                { cmd: "Ctrl + w =", desc: "使所有窗口等高/等宽。" },
                { cmd: "Ctrl + w +/-", desc: "增加/减少窗口高度。" },
                { cmd: "Ctrl + w >/<", desc: "增加/减少窗口宽度。" },
                { cmd: "Ctrl + w _ / |", desc: "最大化窗口高度 / 最大化窗口宽度。" }
            ]
        },
        {
            id: "save-exit",
            title: "保存和退出 (命令行模式)",
            items: [
                { cmd: ":w", desc: "<strong>保存</strong> (write) 文件。" },
                { cmd: ":q", desc: "<strong>退出</strong> (quit) Vim。" },
                { cmd: ":wq 或 ZZ", desc: "<strong>保存并退出</strong>。" },
                { cmd: ":q!", desc: "<strong>强制退出</strong>，<strong>不保存</strong>修改。" },
                { cmd: "ZZ", desc: "保存并退出（同 :wq）。" },
                { cmd: "ZQ", desc: "不保存退出（同 :q!）。" },
                { cmd: ":w 文件名", desc: "保存为指定文件名。" },
                { cmd: ":x", desc: "保存并退出（仅当文件被修改时保存）。" }
            ]
        },
        {
            id: "marks",
            title: "标记和跳转",
            note: "<strong>💡 标记类型：</strong><br>• 小写字母（a-z）：文件内标记，只在当前文件有效<br>• 大写字母（A-Z）：全局标记，跨文件有效<br>• 数字（0-9）：由 viminfo 文件记录，0 是上次退出时的位置<br>• 特殊标记：'（上次跳转位置）、\"（上次编辑位置）、[（上次修改开始）、]（上次修改结束）",
            items: [
                { cmd: "m标记", desc: "在当前光标位置设置标记（如 ma, mb）。" },
                { cmd: "'标记 / `标记", desc: "跳转到标记所在行首 / 跳转到标记的精确位置。" },
                { cmd: "'' / ``", desc: "跳转到上一次位置的行首 / 精确位置。" },
                { cmd: ":marks", desc: "显示所有标记。" },
                { cmd: ":delmarks a", desc: "删除指定标记（如 :delmarks a）。" },
                { cmd: "'[ / ']", desc: "跳转到上次编辑/粘贴的开始 / 结束位置。" },
                { cmd: "'< / '>", desc: "跳转到上次可视选择的开始 / 结束位置。" }
            ]
        },
        {
            id: "registers",
            title: "寄存器",
            items: [
                { cmd: "\"寄存器名", desc: "指定寄存器（如 \"ayy 复制到寄存器 a）。" },
                { cmd: ":reg / :registers", desc: "显示所有寄存器内容。" },
                { cmd: "\"* / \"+", desc: "系统剪贴板寄存器（X11 主选择区/剪贴板）。" },
                { cmd: "\"_", desc: "黑洞寄存器（删除但不保存到寄存器）。" },
                { cmd: "\"/", desc: "最后搜索的字符串寄存器。" },
                { cmd: "\":", desc: "最后执行的命令行寄存器。" },
                { cmd: "\"0", desc: "最近一次 yank（复制）的内容。" },
                { cmd: "\".", desc: "最近插入的文本。" },
                { cmd: "\"=", desc: "表达式寄存器（可执行表达式并插入结果）。" }
            ]
        },
        {
            id: "insert-mode",
            title: "插入模式快捷键",
            items: [
                { cmd: "Ctrl + h", desc: "删除前一个字符（同 Backspace）。" },
                { cmd: "Ctrl + w", desc: "删除前一个单词。" },
                { cmd: "Ctrl + u", desc: "删除到行首。" },
                { cmd: "Ctrl + [ / Esc", desc: "退出插入模式。" },
                { cmd: "Ctrl + o", desc: "临时执行一个普通模式命令，然后回到插入模式。" },
                { cmd: "Ctrl + r 寄存器", desc: "插入寄存器内容（如 Ctrl + r \" 插入系统剪贴板）。" },
                { cmd: "Ctrl + r =", desc: "插入表达式计算结果。" },
                { cmd: "Ctrl + a", desc: "插入上次插入的文本。" },
                { cmd: "Ctrl + @", desc: "插入上次插入的文本并退出插入模式。" },
                { cmd: "Ctrl + t / Ctrl + d", desc: "在当前行增加/减少缩进（需设置 indent）。" },
                { cmd: "Ctrl + n / Ctrl + p", desc: "自动补全：下一个/上一个匹配项。" },
                { cmd: "Ctrl + x", desc: "开始补全（后跟 f=文件名, i=包含文件, l=整行, k=字典等）。" }
            ]
        },
        {
            id: "misc",
            title: "其他实用命令",
            note: "<strong>💡 组合命令提示：</strong> Vim 命令可以组合使用： [数字] + [操作] + [移动]。<br>例如：<span class=\"command\" data-copy=\"3dd\">3dd</span> (删除 3 行)，<span class=\"command\" data-copy=\"y2w\">y2w</span> (复制 2 个单词)，<span class=\"command\" data-copy=\"dG\">dG</span> (删除到文件末尾)。",
            items: [
                { cmd: ":e 文件名", desc: "打开文件进行编辑。" },
                { cmd: ":r 文件名", desc: "将文件内容插入到当前光标下方。" },
                { cmd: ":r !命令", desc: "将命令输出插入到当前光标下方。" },
                { cmd: ":!命令", desc: "执行外部命令（如 :!ls）。" },
                { cmd: ":%!命令", desc: "用命令处理整个文件（如 :%!sort 排序）。" },
                { cmd: ":sh", desc: "启动 shell（输入 exit 返回）。" },
                { cmd: ":set 选项", desc: "设置选项（如 :set number 显示行号）。" },
                { cmd: ":help 命令", desc: "查看帮助（如 :help w）。" },
                { cmd: "K", desc: "查看光标下单词的帮助（man 页面）。" },
                { cmd: ":history", desc: "显示命令历史（/ 或 :）。" },
                { cmd: "q: / q/", desc: "打开命令行窗口（可编辑和重用历史命令）。" },
                { cmd: ":cd 路径", desc: "更改当前工作目录。" },
                { cmd: ":pwd", desc: "显示当前工作目录。" },
                { cmd: "zz / zt / zb", desc: "将当前行滚动到屏幕中间/顶部/底部。" }
            ]
        }
    ]
};
