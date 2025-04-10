
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

var MyComponent = function (template) {
    return {
        template: template,
        data() {
            return {
                title: "Hello, Vue3!",
                message: "這是第 1 個元件的訊息"
            };
        },
        methods: {
            changeMessage() {
                this.message = "訊息已變更！";
            }
        }
    };
};

var AnotherComponent = function (template) {
    return {
        template: template,
        data() {
            return {
                title: "Hello, Vue3!",
                message: "這是第 2 個元件的訊息"
            };
        },
        methods: {
            changeMessage() {
                this.message = "訊息已變更！";
            }
        }
    };
};

// 定義要載入的 HTML 檔案
const templates = {
    'my-component': {
        url: '../Home/GetHTML?File=_MyComponent',
        function: MyComponent
    },
    'another-component': {
        url: '../Home/GetHTML?File=_AnotherComponent',
        function: AnotherComponent
    }
};

// 使用 Promise.all() 來批次載入所有模板
Promise.all(
    Object.entries(templates).map(([name, setting]) =>
        fetch(setting.url)
            .then(response => response.text())
            .then(template => ({ name, template }))
    )
).then(components => {
    // 創建 Vue 應用程式
    const app = createApp({});

    // 迴圈註冊所有元件
    components.forEach(({ name, template }) => {
        console.log(templates[name]);
        app.component(name, templates[name].function(template));
    });

    // 掛載 Vue
    app.mount('#app');
});