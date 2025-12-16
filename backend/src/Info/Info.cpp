#include "Info/Info.h"
#include <iostream>

using namespace std;

void printInfo(Info code, string info, string parameter) {
    switch (code) {
        case Info::VertexAdded:
            cout << "\n[INFO]: Вершина " << info << " успешно добавлена.\n";
            break;
        case Info::EdgeAdded:
            cout << "\n[INFO]: Ребро " << info << " успешно добавлено.\n";
            break;
        case Info::VertexDeleted:
            cout << "\n[INFO]: Вершина " << info << " успешно удалена.\n";
            break;
        case Info::EdgeDeleted:
            cout << "\n[INFO]: Ребро " << info << " успешно удалено.\n";
            break;
        case Info::Outdegree:
            cout << "\n[INFO]: Полустепень исхода вершины " << info << " равна " << parameter << '\n';
            break;
        case Info::Indegree:
            cout << "\n[INFO]: Полустепень захода вершины " << info << " равна " << parameter << '\n';
            break;
        case Info::Degree:
            cout << "\n[INFO]: Степень вершины " << info << " равна " << parameter << '\n';
            break;
        case Info::NonCycled:
            cout << "\n[INFO]: Граф " << info << " ацикличным" << '\n';
            break;
        case Info::Unreachable:
            cout << "\n[INFO]: Вершины, недостижимые из " << info << " это " << parameter << '\n';
            break;
        case Info::NoUnreachable:
            cout << "\n[INFO]: Нет вершин, недостижимых из  " << info << '\n';
            break;
        case Info::GraphSaved:
            cout << "\n[INFO] Граф успешно сохранен в файле data/" << info << '\n';
            break;
        case Info::GraphLoaded:
            cout << "\n[INFO] Граф успешно загружен из файла data/" << info << '\n';
            break;
        case Info::GraphReversed:
            cout << "\n[INFO] Граф успешно обращен и загружен в файл data/" << info << '\n';
            break;
        case Info::NotLoadedOrEmpty:
            cout << "\n[INFO] Граф не был загружен успешно или файл data/" << info << " пуст\n";
            break;
        case Info::Error:
            cout << "\n[INFO] Что-то пошло не так. Проверьте файл logs/errors.log\n";
            break;
    }
}
