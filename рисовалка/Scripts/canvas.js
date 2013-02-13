var Canva = {};

// ������������� �������
Canva.init = function (id, width, height, left, top) {
    var canv = document.getElementById(id);
    canv.width = width;
    canv.height = height;

    this.canvasId = id;

    this.ctx = canv.getContext("2d");
    // ��������
    this.selectedColor = '#000000';
    this.selectedFillColor = '#FFFFFF';
    this.selectedWidth = 1;
    this.tool = Pencil; // ��������� ����������
    this.drawing = false; // true - ���� ������ ������ ����

    // ������ ���� ������, ������
    canv.onmousedown = function (e) {
        var evnt = ie_event(e);
        Canva.tool.start(evnt, left, top);
    };

    // ������ ���� ��������, ��������� ����������
    canv.onmouseup = function (e) {
        if (Canva.drawing) {
            var evnt = ie_event(e);
            Canva.tool.finish(evnt, left, top);
        }
    };

    // ������� ���������
    canv.onmousemove = function (e) {
        if (Canva.drawing) {
            var evnt = ie_event(e);
            Canva.tool.move(evnt, left, top);
        }
    };
};

Canva.setTool = function (t) // ������ ����������
{
    Canva.tool = t;
};

Canva.setWidth = function (width) // ������ ������� �����
{
    Canvas.selectedWidth = width;
};

Canva.setColor = function (color) // ������ ������� ����
{
    Canva.selectedColor = color;
};

Canva.clear = function () // �������� ���������
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

// �������� ���������
Pencil.start = function (evnt, left, top) {
    // ������� ��������� ���� - ��������� ����������
    Pencil.x = evnt.clientX - left;
    Pencil.y = evnt.clientY - top;
    Canva.ctx.beginPath();
    // �������� ���������
    Canva.ctx.strokeStyle = Canva.selectedColor;
    Canva.ctx.lineWidth = Canva.selectedWidth;
    Canva.ctx.moveTo(Pencil.x, Pencil.y); // ������ �� ��������� �������

    Canva.drawing = true; // ������ ���������
};

// ��������� ���������
Pencil.finish = function (evnt, left, top) {
    Pencil.x = evnt.clientX - left;
    Pencil.y = evnt.clientY - top;
    Canva.ctx.lineTo(Pencil.x, Pencil.y); // ������������ ��������� �����

    Canva.drawing = false;
};

// ��������� � �������
Pencil.move = function (evnt, left, top) {
    Pencil.x = evnt.clientX - left;
    Pencil.y = evnt.clientY - top;
    Canva.ctx.lineTo(Pencil.x, Pencil.y); // ������������ ������� �����
    Canva.ctx.stroke();
    // �������� ��������� ����� ����� �� ��� �� �����.
    Canva.ctx.moveTo(Pencil.x, Pencil.y);
};