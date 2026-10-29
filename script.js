const terminalLog = document.getElementById('terminalLog');
const cmdInput = document.getElementById('cmdInput');
const termLogo = document.getElementById('termLogo');

// Custom structured ASCII Art Banner
const asciiBanner = `
███████ ███████  █████  ███████  ██████  █████  ██████      ███    ███  █████  ████████ ██   ██
██      ██      ██   ██ ██      ██      ██   ██ ██   ██     ████  ████ ██   ██    ██    ██   ██
█████   █████   ███████ ███████ ██   ███ ███████ ██████     ██ ████ ██ ███████    ██    ███████
██      ██      ██   ██      ██ ██    ██ ██   ██ ██   ██    ██  ██  ██ ██   ██    ██    ██   ██
██      ███████ ██   ██ ███████  ██████  ██   ██ ██   ██    ██      ██ ██   ██    ██    ██   ██
`;

// File dictionary setup
const systemFiles = {
    'music': 'Opening channel /dev/audio/cassette_tapes...\n<span class="success">[TRACK DECK READY]</span>\n→ Status: Ambient tape loops and hardware synthesizer sessions incoming.',
    'photography': 'Mounting partition /mnt/media/35mm_reels...\n<span class="success">[REEL BUFFER OK]</span>\n→ Status: 35mm film logs, street essays, and high-contrast collections pending format.',
    'zines': 'Reading node /var/www/zines_print...\n<span class="success">[MANIFEST LOADED]</span>\n→ Status: Independent prints, downloadable layout templates, and DIY editorial content.',
    'video': 'Sourcing matrix /dev/video/crt_loops...\n<span class="success">[DECK SYNCHRONIZED]</span>\n→ Status: VHS glitch feeds, visual synth captures, and desktop structural edits compiling.',
    'web_design': 'Accessing folder /home/user/raw_html_dev...\n<span class="success">[ROOT ACCESS UNLOCKED]</span>\n→ Status: Vanilla stack setups, clean HTML frameworks, and experimental retro interfaces.'
};

const validCommands = ['help', 'ls', 'clear', 'sysinfo', 'contact', 'matrix', 'cat music', 'cat photography', 'cat zines', 'cat video', 'cat web_design'];
let commandHistory = [];
let historyIndex = -1;

function focusInput() {
    cmdInput.focus();
}

// Set up interface initializers
document.addEventListener('DOMContentLoaded', () => {
    cmdInput.addEventListener('keydown', handleKeyDown);
    
    // Set up splash screen layout on frame execution
    terminalLog.innerHTML = `Welcome to FEASGAR_MATH Mainframe OS v1.4.\n${asciiBanner}\nType <span class="info">help</span> to view available terminal directories and utilities.\n\nroot@feasgar_math:~# `;
    focusInput();
});

function handleKeyDown(event) {
    if (event.key === 'Enter') {
        const inputVal = cmdInput.value.trim();
        const command = inputVal.toLowerCase();
        
        terminalLog.innerHTML += inputVal + '\n';

        if (command !== '') {
            commandHistory.push(inputVal);
            if (commandHistory.length > 50) commandHistory.shift();
            processCommand(command);
        } else {
            terminalLog.innerHTML += 'root@feasgar_math:~# ';
        }

        historyIndex = -1;
        cmdInput.value = '';
        window.scrollTo(0, document.body.scrollHeight);
        event.preventDefault();
    }
    
    else if (event.key === 'ArrowUp') {
        if (commandHistory.length > 0) {
            if (historyIndex === -1) {
                historyIndex = commandHistory.length - 1;
            } else if (historyIndex > 0) {
                historyIndex--;
            }
            cmdInput.value = commandHistory[historyIndex];
        }
        event.preventDefault();
    }
    
    else if (event.key === 'ArrowDown') {
        if (historyIndex !== -1) {
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                cmdInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = -1;
                cmdInput.value = '';
            }
        }
        event.preventDefault();
    }
    
    else if (event.key === 'Tab') {
        event.preventDefault(); 
        const currentInput = cmdInput.value.trim().toLowerCase();
        if (!currentInput) return;

        const matches = validCommands.filter(cmd => cmd.startsWith(currentInput));
        
        if (matches.length === 1) {
            cmdInput.value = matches[0];
        } else if (matches.length > 1) {
            terminalLog.innerHTML += cmdInput.value + '\n' + matches.join('    ') + '\nroot@feasgar_math:~# ';
            window.scrollTo(0, document.body.scrollHeight);
        }
    }
}

function processCommand(cmd) {
    if (cmd === 'help') {
        terminalLog.innerHTML += `
Available Terminal Operations:
  <span class="info">ls</span>             - Output active directory tree structure
  <span class="info">cat [project]</span>  - Stream content data from a specific node path
                    (e.g., <span class="info">cat music</span>, <span class="info">cat photography</span>)
  <span class="info">clear</span>          - Flush screen buffer and clear logs
  <span class="info">sysinfo</span>        - Render active operational mainframe stats
  <span class="info">contact</span>        - Echo administrator link credentials
  <span class="info">matrix</span>         - [SYSTEM OVERRIDE] Initialize signal override matrix

`;
    } else if (cmd === 'ls') {
        terminalLog.innerHTML += `
drwxr-xr-x   2 root  sysadmin  4096 Oct 29 14:30 <span class="info">music</span>/
drwxr-xr-x   2 root  sysadmin  4096 Oct 29 14:30 <span class="info">photography</span>/
drwxr-xr-x   2 root  sysadmin  4096 Oct 29 14:30 <span class="info">zines</span>/
drwxr-xr-x   2 root  sysadmin  4096 Oct 29 14:30 <span class="info">video</span>/
drwxr-xr-x   2 root  sysadmin  4096 Oct 29 14:30 <span class="info">web_design</span>/

`;
    } else if (cmd === 'clear') {
        terminalLog.innerHTML = '';
    } else if (cmd === 'sysinfo') {
        terminalLog.innerHTML += `${asciiBanner}\nMainframe Infrastructure:
OS: FEASGAR_MATH OS Build 1.4
CPU: Virtualized Core (Pentium Architecture Simulation)
RAM: Allocated 128MB System Buffer
Display Mode: Cathode Ray Tube Terminal Grid Emulation
Status: Operational / Ready for Production Release\n\n`;
    } else if (cmd === 'contact') {
        terminalLog.innerHTML += 'Secure transmission line ready: root@feasgarmath.com\n\n';
    } else if (cmd === 'matrix') {
        document.body.classList.toggle('matrix-mode');
        const isMatrix = document.body.classList.contains('matrix-mode');
        termLogo.innerText = isMatrix ? "NEO_OS_LOADED" : "FEASGAR_MATH_V1.4";
        terminalLog.innerHTML += isMatrix ? 
            '<span class="matrix-green">Wake up, Neo... The matrix has you. Phosphor filter override active.</span>\n\n' : 
            'Returning to default terminal sub-routines.\n\n';
    } else if (cmd.startsWith('cat ')) {
        const target = cmd.substring(4).trim();
        if (systemFiles[target]) {
            terminalLog.innerHTML += systemFiles[target] + '\n\n';
        } else {
            terminalLog.innerHTML += `<span class="error">Error: Unable to locate target file or node path: "${target}"</span>\nUse ls to verify valid path definitions.\n\n`;
        }
    } else {
        terminalLog.innerHTML += `Command not recognized: "${cmd}". Type help for assistance.\n\n`;
    }

    terminalLog.innerHTML += 'root@feasgar_math:~# ';
}
