const {app, BrowserWindow, Tray, Menu} = require('electron');
const url = require('url');
const path = require('path');
let tray = null;

const createWindow = () => {
    const win = new BrowserWindow({
        width: 400,
        height: 300,
        // width: 1200,
        // height: 800,
        frame: false,
        alwaysOnTop: true,
        skipTaskbar: true,
        minimizable: false,
        maximizable: false,
        closable: true,
        resizable: false,
        movable: true,
        transparent: true,
        hasShadow: false,
        // x: 2100,
        // y: 1000,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    });

    const {screen} = require('electron');
    const {width, height} = screen.getPrimaryDisplay().workAreaSize;

    win.setPosition(width - win.getSize()[0], height - win.getSize()[1] - 50);
    // win.webContents.openDevTools();

    if (app.isPackaged) {
        win.loadURL(url.format({
            pathname: path.join(__dirname, './build/index.html'),
            protocol: 'file:',
            slashes: true
        })).then(r => {
        })
    } else {
        win.loadURL('http://localhost:3000').then(r => {
        });
    }


    // 创建任务栏图标
    tray = new Tray(path.join(__dirname, './icon.ico'))

    // 自定义托盘图标的内容菜单
    const contextMenu = Menu.buildFromTemplate([
        {
            // 点击退出菜单退出程序
            label: '退出', click: function () {
                console.log(123);
                win.destroy()
                app.quit()

            }
        }
    ])

    tray.setToolTip('demo')  // 设置鼠标指针在托盘图标上悬停时显示的文本
    tray.setContextMenu(contextMenu)  // 设置图标的内容菜单
    // 点击托盘图标，显示主窗口
    tray.on("click", () => {
        win.show();
    })
}


app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    })

})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
})
