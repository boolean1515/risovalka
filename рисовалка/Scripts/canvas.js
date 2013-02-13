var Canva = {};

// Инициализация объекта
Canva.init = function (id, width, height, left, top) {
    var canv = document.getElementById(id);
    canv.width = width;
    canv.height = height;

    this.canvasId = id;

    this.ctx = canv.getContext("2d");
    // Свойства
    this.selectedColor = '#000000';
    this.selectedFillColor = '#FFFFFF';
    this.selectedWidth = 1;
    this.tool = Pencil; // Выбранный инструмент
    this.drawing = false; // true - если зажата кнопка мыши

    // Кнопка мыши зажата, рисуем
    canv.onmousedown = function (e) {
        var evnt = ie_event(e);
        Canva.tool.start(evnt, left, top);
    };

    // Кнопка мыши отпущена, рисование прекращаем
    canv.onmouseup = function (e) {
        if (Canva.drawing) {
            var evnt = ie_event(e);
            Canva.tool.finish(evnt, left, top);
        }
    };

    // процесс рисования
    canv.onmousemove = function (e) {
        if (Canva.drawing) {
            var evnt = ie_event(e);
            Canva.tool.move(evnt, left, top);
        }
    };
};

Canva.setTool = function (t) // Задать инструмент
{
    Canva.tool = t;
};

Canva.setWidth = function (width) // Задать толщину линий
{
    Canvas.selectedWidth = width;
};

Canva.setColor = function (color) // Задать текущий цвет
{
    Canva.selectedColor = color;
};

Canva.clear = function () // Очистить рисовалку
{
    var canv = document.getElementById(Canva.canvasId);
    Canva.ctx.clearRect(0, 0, canvas.width, canvas.height);
};
function ie_event(e) {
    if (e === undefined)
    { return window.event; };
    return e;
}
var Pencil = {};

// Начинаем рисование
Pencil.start = function (evnt, left, top) {
    // Текущее положение мыши - начальные координаты
    Pencil.x = evnt.clientX - left;
    Pencil.y = evnt.clientY - top;
    Canva.ctx.beginPath();
    // Свойства рисования
    Canva.ctx.strokeStyle = Canva.selectedColor;
    Canva.ctx.lineWidth = Canva.selectedWidth;
    Canva.ctx.moveTo(Pencil.x, Pencil.y); // Курсор на начальную позицию

    Canva.drawing = true; // Начато рисование
};

// Рисование закончили
Pencil.finish = function (evnt, left, top) {
    Pencil.x = evnt.clientX - left;
    Pencil.y = evnt.clientY - top;
    Canva.ctx.lineTo(Pencil.x, Pencil.y); // Дорисовываем последнюю линию

    Canva.drawing = false;
};

// Рисование в разгаре
Pencil.move = function (evnt, left, top) {
    Pencil.x = evnt.clientX - left;
    Pencil.y = evnt.clientY - top;
    Canva.ctx.lineTo(Pencil.x, Pencil.y); // Дорисовываем начатую линию
    Canva.ctx.stroke();
    // Начинаем рисованть новую линию из той же точки.
    Canva.ctx.moveTo(Pencil.x, Pencil.y);
};