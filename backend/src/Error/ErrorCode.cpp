#include "Error/ErrorCode.h"
#include <iostream>
#include <string>
#include <fstream>

using namespace std;

void printError(ErrorCode code, string info) {
    static ofstream logFile("logs/errors.log", ios::trunc);
    if (!logFile.is_open()) {
        cerr << "[ERROR] Не удалось открыть лог-файл!\n";
        return;
    }
    
    switch (code) {
        case ErrorCode::NotUniqueEdge:
            logFile << "[ERROR] Ребро " << info << " уже существует!\n";
            break; 
        case ErrorCode::NotUniqueVertex:
            logFile << "[ERROR] Вершина " << info << " уже существует!\n";
            break;
        case ErrorCode::NotFindEdge:
            logFile << "[ERROR] Ребро " << info << " не существует!\n";
            break;
        case ErrorCode::NotFindVertex:
            logFile << "[ERROR] Вершина " << info << " не существует!\n";
            break;
        case ErrorCode::FileNotFound:
            logFile << "[ERROR] Файл " << info << " не был найден!\n";
            break;
        case ErrorCode::FileNotOpened:
            logFile << "[ERROR] Не удалось открыть файл " << info << "!\n";
            break;
        case ErrorCode::FileErrorGraphType:
            logFile << "[ERROR] Неверный тип графа в файле " << info << "!\n";
            break;
        case ErrorCode::NotOutdegree:
            logFile << "[ERROR] У неориентированного графа нет полустепени исхода!\n";
            break;
        case ErrorCode::NotIndegree:
            logFile << "[ERROR] У неориентированного графа нет полустепени захода!\n";
            break;
        case ErrorCode::NotReverseOperation:
            logFile << "[ERROR] У ориентированного графа нет операции обращения!\n";
            break;
        case ErrorCode::UnexpectedError:
            logFile << "[ERROR] Непредвиденная ошибка: " << info << '\n';
            break;
    }
    
    logFile.flush();
}