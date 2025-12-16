#include "Graph/GraphUI.h"
#include "Info/Info.h"
#include "Error/ErrorCode.h"
#include <iostream>
#include <string>
#include <limits>
#include <map>
#include <vector>

using namespace std;

template <typename T>
GraphUI<T>::GraphUI(string graphType) : isOwner(true){
    if (graphType == "directed") {
        graph = new DirectedGraph<T>();
    } else if (graphType == "undirected") {
        graph = new UndirectedGraph<T>();
    }
}

template<typename T>
void GraphUI<T>::run() {
    int command;
    do {
        this->printCommands();
        cin >> command;
        switchCommands(command);
    } while (command != EXIT);
}

template<typename T>
void GraphUI<T>::printCommands() {
    cout << "\n--- Команды ---\n";
    cout << "1. Добавить вершину\n";
    cout << "2. Добавить ребро\n";
    cout << "3. Удалить вершину\n";
    cout << "4. Удалить ребро\n";
    cout << "5. Полустепень исхода вершины\n";
    cout << "6. Полустепень захода вершины\n";
    cout << "7. Степень вершины\n";
    cout << "8. Обращение графа\n";
    cout << "9. Проверить на ацикличность\n";
    cout << "10. Вершины, недостижимые из данной\n";
    cout << "11. Показать граф\n";
    cout << "12. Загрузить граф в файл\n";
    cout << "13. Загрузить граф из файла\n";
    cout << "14. Алгоритм Краскала\n";
    cout << "15. Найти эксцентриситеты, радиус и центры\n";
    cout << "16. Найти кратчайшие пути до вершины u из всех остальных вершин\n";
    cout << "17. Проверить на цикл отрицательного веса\n";
    cout << "18. Найти максимальный поток\n";
    cout << "0. Выход\n";
    cout << "> ";
}

template <typename T>
void GraphUI<T>::switchCommands(int command) {
    switch (command) {
        case ADD_VERTEX: {
            T vertex;
            cout << "Введите вершину: ";
            cin >> vertex;
            bool result = this->graph->addVertex(vertex);
            string info = "(" + vertex + ")";
            if (result) printInfo(Info::VertexAdded, info);
            else printInfo(Info::Error, info);
            break;
        }
        case ADD_EDGE: {
            T value, vertex;
            int weight;
            string label;
            cout << "Введите первую вершину: ";
            cin >> value;
            cout << "Введите вторую вершину: ";
            cin >> vertex;
            cout << "Введите вес (если нет, то напишите 0): ";
            cin >> weight;
            cout << "Введите метку (если нет, то напишите -): ";
            cin >> label;
            if (label == "-") label = "";
            bool result = this->graph->addEdge(value, this->graph->toEdge(vertex, weight, label));
            string info = "(" + value + ", " + vertex + ")";
            if (result) printInfo(Info::EdgeAdded, info);
            else printInfo(Info::Error, info);
            break;
        }
        case DELETE_VERTEX: {
            T value;
            cout << "Введите вершину: ";
            cin >> value;
            bool result = this->graph->deleteVertex(value);
            string info = "(" + value + ")";
            if (result) printInfo(Info::VertexDeleted, info);
            else printInfo(Info::Error, info);
            break;
        }
        case DELETE_EDGE: {
            T value, vertex;
            cout << "Введите первую вершину: ";
            cin >> value;
            cout << "Введите вторую вершину: ";
            cin >> vertex;
            bool result = this->graph->deleteEdge(value, vertex);
            string info = "(" + value + ", " + vertex + ")";
            if (result) printInfo(Info::EdgeDeleted, info);
            else printInfo(Info::Error, info);
            break;
        }
        case GET_OUTDEGREE: {
            T vertex;
            cout << "Введите вершину: ";
            cin >> vertex;
            int outdegree = this->graph->getOutdegree(vertex);
            string info = "(" + vertex + ")";
            if (outdegree == -1) {
                printInfo(Info::Error, info);
                break;
            }
            printInfo(Info::Outdegree, info, to_string(outdegree));
            break;
        }
        case GET_INDEGREE: {
            T vertex;
            cout << "Введите вершину: ";
            cin >> vertex;
            int indegree = this->graph->getIndegree(vertex);
            string info = "(" + vertex + ")";
            if (indegree == -1) {
                printInfo(Info::Error, info);
                break;
            }
            printInfo(Info::Indegree, info, to_string(indegree));
            break;
        }
        case GET_DEGREE: {
            T vertex;
            cout << "Введите вершину: ";
            cin >> vertex;
            int degree = this->graph->getDegree(vertex);
            string info = "(" + vertex + ")";
            if (degree == -1) {
                printInfo(Info::Error, info);
                break;
            }
            printInfo(Info::Degree, info, to_string(degree));
            break;
        }
        case REVERSE_GRAPH: {
            // string filename;
            // cout << "Введите название файла для сохранения: ";
            // cin >> filename;
            // bool result = this->graph->reverse();
            // if (result) {
            //     printInfo(Info::GraphReversed, filename);
            // }
            // else {
            //     printInfo(Info::Error, filename);
            // }
            break;
        }
        case CHECK_CYCLED: {
            bool result = this->graph->hasCycles();
            if (result) printInfo(Info::NonCycled, "не является");
            else printInfo(Info::NonCycled, "является");
            break;
        }
        case FIND_UNREACHABLE: {
            T vertex;
            cout << "Введите вершину: ";
            cin >> vertex;
            vector<T> unreachable = this->graph->findUnreachableVertices(vertex);
            string info = "(" + vertex + ")";
            if (unreachable.size() == 0) {
                printInfo(Info::NoUnreachable, info);
                break;
            }
            else {
                string parameter = "";
                for (const auto& unreachableVertex : unreachable) {
                    parameter += unreachableVertex + ", ";
                }
                printInfo(Info::Unreachable, info, parameter);
                break;
            }
        }
        case PRINT_GRAPH: {
            cout << '\n';
            this->graph->printInConsole();
            break;
        }
        case SAVE_GRAPH: {
            cout << this->graph->toJSON();
            break;
        }
        case LOAD_GRAPH: {
            std::string fileContent = R"(directed
1: (2, 0, no label) (3, 0, no label)
2: (1, 0, no label) (3, 0, no label)
3: (1, 0, no label) (2, 0, no label) (3, 0, no label)
4: (5, 0, no label)
5: (4, 0, no label)
6: No edges
7: (1, 0, no label))";



            string graphType;
            graphType = Graph<T>::checkType(fileContent);

            if (this->isOwner) {
                delete this->graph;
                this->isOwner = true;
            } 
            else {
                this->isOwner = false;
            }

            if (graphType == "directed") {
                this->graph = new DirectedGraph<T>(fileContent);
            }
            else if (graphType == "undirected") {
                this->graph = new UndirectedGraph<T>(fileContent);
            }
            else {
                cout << "!!!";
                printInfo(Info::Error, "");
                return;
            }

            if (this->graph->getSize() > 0) {
                printInfo(Info::GraphLoaded, "");
            }
            else {
                printInfo(Info::NotLoadedOrEmpty, "");
            }
            break;
        }
        case KRASKAL: {
            // map<T, std::vector<Edge<T>>> res = this->graph->kruskal();
            // cout << '\n';
            // for (const auto& [vertex, edges] : res) {
            //     cout << vertex << ": ";
            //     for (const auto& edge : edges) {
            //         cout << "(" << edge.vertex << ", " << edge.weight << ", " << edge.label << ") ";
            //     }
            //     if (edges.empty()) {
            //         cout << "No edges";
            //     }
            //     cout << '\n';
            // }
            break;
        }
        case ECC_CENTER_RADUIS: {
            cout << '\n';
            this->graph->findGraphCenter();
            cout << '\n';
            break;
        }
        case SHORTEST_PATHS: {
            // cout << "\n";
            // T u;
            // cout << "Введите вершину u: ";
            // cin >> u;
            // auto dist = 
            // this->graph->shortestPaths(dist, u);
            break;
        }
        case IS_NEGCYCLE_HERE: {
            cout << '\n';
            T u;
            cout << "Введите вершину, с которой начнём обход: ";
            cin >> u;
            map<T, int> dist;
            map<T, T> parent;
            vector<T> negCycle;
            bool isNegCycleHere = this->graph->fordBellman(u, dist, parent, negCycle);
            if (!isNegCycleHere) cout << "Нет циклов отрицательного веса!\n";
            else {
                cout << "Цикл отрицательного веса найден!\n";
                for (auto& v : negCycle) cout << v << " ";
                cout << '\n';
            }
            break;
        }
        case MAX_FLOW: {
            T s, t;
            string filename;
            cout << "Введите источник > ";
            cin >> s;
            cout << "Введите сток > ";
            cin >> t;
            cout << this->graph->maxFlow(s, t);
            break;
        }
        case EXIT: {
            cout << "Завершаем выполнение...\n";
            break;
        }
        default: {
            cout << "Неверная команда!\n";
            break;
        }
    }
}