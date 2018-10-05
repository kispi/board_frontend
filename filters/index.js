import Vue from 'vue'
import json from '@/assets/translations.json';

export const translate = (key, temporaryLocale) => {
    let locale = "kr";
    if (temporaryLocale) {
        locale = temporaryLocale;
    }
    return (json[key] || {})[locale] || key;
}

export const textToHTML = (text) => {
    if (text) {
        return text.replace(/\n/g, "<br>");
    }
}

export const toCamel = (snake) => {
    if (snake) {
        snake = snake.toLowerCase();
        var result = "";
        var underbarPassed = false;
        snake.split("").forEach(c => {
            if (c !== "_") {
                result += (underbarPassed ? c.toUpperCase() : c);
            }
            underbarPassed = c === "_"
        })
        return result;
    }
}

export const toSnake = (camel) => {
    let uppers = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    if (camel) {
        var result = "";
        camel.split("").forEach(c => {
            result += (uppers.indexOf(c) >= 0 ? "_" + c.toLowerCase() : c);
        })
        return result;
    }
}

export const formatDate = (value, format) => {
    if (value) {
        return Vue.prototype.$moment(String(value)).format(format || "YYYY-MM-DD hh:mm:ss");
    }
}

Vue.filter('translate', translate)
Vue.filter('textToHTML', textToHTML)
Vue.filter('toCamel', toCamel)
Vue.filter('toSnake', toSnake)
Vue.filter('formatDate', formatDate)