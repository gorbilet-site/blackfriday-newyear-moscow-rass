# Чёрная пятница в Москве — Горбилет

Лендинг с акциями на спектакли, концерты, стендап, семейный отдых и новогодние события в Москве.

Сайт: https://gorbilet-site.github.io/blackfriday-newyear-moscow-rass/

## Файлы

- `black-friday-moscow/dist/` — исходные HTML, CSS, JavaScript, фотографии, шрифты и маскот.
- `docs/index.html` — готовая автономная страница для GitHub Pages, со встроенными ресурсами.
- `black-friday-moscow/README.md` — описание оформления, контента и UTM-разметки.
- `black-friday-moscow/photo-sources.json` — источники фотографий.

## Локальный просмотр и обновление

Нужен Node.js; установка пакетов не требуется.

```sh
cd black-friday-moscow
npm run dev
```

Локальный адрес: http://127.0.0.1:4173/

После правок файлов в `black-friday-moscow/dist/` обновите автономную страницу:

```sh
node black-friday-moscow/export.mjs
```

Команда из корня репозитория также обновляет `docs/index.html`. После коммита и отправки изменений в `main` GitHub Pages автоматически публикует папку `/docs`.

Дизайн использует локальный Inter, красный, белый и чёрный цвета. Все четыре блока ТЗ сохранены; шесть ссылок на Горбилет содержат UTM, ссылка VK оставлена без разметки.
